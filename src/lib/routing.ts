import { Line, Station, Fare, lines, stations, fares } from './data';
import type { Translations } from './translations';

export type StationNode = Station & { line: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' };

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
export function getLineColor(lineName: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow'): string {
    switch(lineName) {
        case 'Blue': return 'bg-blue-500';
        case 'Green': return 'bg-green-500';
        case 'Purple': return 'bg-purple-500';
        case 'Orange': return 'bg-orange-500';
        case 'Yellow': return 'bg-yellow-500';
        default: return 'bg-gray-500';
    }
}

export function getStationById(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function calculateFare(fromId: string, toId: string): number {
    // Check for specific predefined fares first, this handles Orange and Yellow line logic
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) return directFare.fare;

    const path = findShortestPath(fromId, toId);
    if (!path || path.length < 2) return 0;
    
    // Using an approximation of 2km per station
    const km = (path.length - 1) * 2; 
    
    // Determine the primary line for fare calculation
    const firstStation = path[0];
    const secondStation = path[1];
    const primaryLine = getLineForPathSegment(firstStation, secondStation);

    if (primaryLine === 'Blue') {
        if (km <= 2) return 5;
        if (km <= 5) return 10;
        if (km <= 10) return 15;
        if (km <= 20) return 20;
        return 25;
    }

    if (primaryLine === 'Green') {
        if (km <= 2) return 5;
        if (km <= 5) return 10;
        if (km <= 10) return 20;
        if (km <= 16.5) return 30;
        return 30; // Max fare for green line
    }

    // Default fare structure if not Blue or Green
    if (km <= 2) return 5;
    if (km <= 5) return 10;
    return 15;
}


const getLineForPathSegment = (stationA: Station, stationB: Station): 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));
    if (commonLines.length > 0) {
        // This logic can be enhanced if more complex line priority is needed
        return commonLines[0];
    }
    // Default to the first line of the starting station if no common line.
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
        let line: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
        
        if (index > 0) {
            const prevStation = path[index - 1];
            const currentLine = getLineForPathSegment(prevStation, station);

            const prevPathSegmentA = path[Math.max(0, index - 2)];
            const prevPathSegmentB = prevStation;
            const prevLine = getLineForPathSegment(prevPathSegmentA, prevPathSegmentB);

            if (currentLine !== prevLine && station.lines.length > 1) {
                 if(path[index-1].name === station.name) {
                    // This is an interchange happening at the same station name but different line ids
                    interchanges++;
                 } else if (station.lines.includes(prevLine)) {
                    // We are at a station that is part of the previous line, but we are changing.
                 } else {
                    interchanges++;
                 }
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

    const finalInterchanges = routeWithLines.reduce((acc, station, index, arr) => {
        if (index > 0 && station.line !== arr[index-1].line) {
            // Check if the station name is the same as previous, which indicates a line change within the same physical interchange
            if (arr[index-1].name !== station.name) {
                 acc++;
            }
        }
        return acc;
    }, 0);


    return {
        path: routeWithLines,
        fare,
        stops,
        time,
        interchanges: finalInterchanges,
    };
}
