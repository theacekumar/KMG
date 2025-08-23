import { Line, Station, Fare, lines, stations, fares } from './data';
import type { Translations } from './translations';

export type StationNode = Station & { line: 'Blue' | 'Green' | 'Purple' | 'Orange' };

// Adjacency list representation of the metro graph
const adjacencyList = new Map<string, string[]>();

function buildAdjacencyList() {
  if (adjacencyList.size > 0) return;

  // Add all stations to the list
  stations.forEach(station => {
    if (!adjacencyList.has(station.id)) {
      adjacencyList.set(station.id, []);
    }
  });

  // Populate connections from lines
  lines.forEach(line => {
    for (let i = 0; i < line.stations.length; i++) {
      const currentStationId = line.stations[i];
      if (i > 0) {
        const prevStationId = line.stations[i - 1];
        adjacencyList.get(currentStationId)?.push(prevStationId);
      }
      if (i < line.stations.length - 1) {
        const nextStationId = line.stations[i + 1];
        adjacencyList.get(currentStationId)?.push(nextStationId);
      }
    }
  });

  // Manual interchange connections
  const interchanges = stations.filter(s => s.lines.length > 1);
  interchanges.forEach(station => {
      const connectedStations = stations.filter(s => s.name === station.name && s.id !== station.id);
      connectedStations.forEach(connected => {
          adjacencyList.get(station.id)?.push(connected.id);
          adjacencyList.get(connected.id)?.push(station.id);
      })
  })

}

// Ensure the graph is built on module load
buildAdjacencyList();

// BFS algorithm to find the shortest path
export function findShortestPath(startId: string, endId: string): Station[] | null {
  if (!adjacencyList.has(startId) || !adjacencyList.has(endId)) {
    return null; // Invalid station IDs
  }

  const queue: string[][] = [[startId]];
  const visited = new Set<string>([startId]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const stationId = path[path.length - 1];

    if (stationId === endId) {
      return path.map(id => stations.find(s => s.id === id)!);
    }

    const neighbors = adjacencyList.get(stationId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }

  return null; // Path not found
}

// Function to determine the line color
export function getLineColor(lineName: 'Blue' | 'Green' | 'Purple' | 'Orange'): string {
    switch(lineName) {
        case 'Blue': return 'bg-blue-500';
        case 'Green': return 'bg-green-500';
        case 'Purple': return 'bg-purple-500';
        case 'Orange': return 'bg-orange-500';
        default: return 'bg-gray-500';
    }
}

export function getStationById(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function calculateFare(fromId: string, toId: string): number {
    // This is a simplified fare calculation. A real app would have a more complex matrix.
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) return directFare.fare;

    // Fallback fare based on distance if not explicitly defined
    const path = findShortestPath(fromId, toId);
    if (!path) return 0;
    const distance = path.length - 1;
    if (distance <= 2) return 5;
    if (distance <= 5) return 10;
    if (distance <= 10) return 20;
    if (distance <= 15) return 25;
    return 30;
}

const getLineForPathSegment = (stationA: Station, stationB: Station): 'Blue' | 'Green' | 'Purple' | 'Orange' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));
    if (commonLines.length > 0) {
        return commonLines[0];
    }
    // Default to the first line of the starting station of the segment if no common line is found.
    return stationA.lines[0];
}


export function getRouteDetails(fromId: string, toId: string, t: (typeof Translations)['en']) {
    const path = findShortestPath(fromId, toId);

    if (!path) {
        return { error: t.route.noRouteFound };
    }

    const fare = calculateFare(fromId, toId);
    const stops = path.length - 1;
    const time = stops * 3; // Estimated 3 minutes per station (including wait)
    
    let interchanges = 0;
    const routeWithLines = path.map((station, index) => {
        let line: 'Blue' | 'Green' | 'Purple' | 'Orange';
        
        if (index > 0) {
            const prevStation = path[index - 1];
            const currentLine = getLineForPathSegment(prevStation, station);
            const prevLine = getLineForPathSegment(path[Math.max(0, index - 2)], prevStation);
            if (currentLine !== prevLine) {
                interchanges++;
            }
            line = currentLine;
        } else {
             const nextStation = path[index + 1];
             if(nextStation){
                line = getLineForPathSegment(station, nextStation);
             } else {
                line = station.lines[0];
             }
        }
        return { ...station, line };
    });

    return {
        path: routeWithLines,
        fare,
        stops,
        time,
        interchanges: Math.max(0, interchanges), // Ensure interchanges are not negative
    };
}
