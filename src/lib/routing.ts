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
  const interchanges = {
    'esplanade': ['esplanade'], // Interchange between Blue and Green
    'kavi-subhash': ['kavi-subhash-orange'], // Interchange between Blue and Orange
  };

  for (const stationAId in interchanges) {
      const stationBIds = interchanges[stationAId as keyof typeof interchanges];
      stationBIds.forEach(stationBId => {
          adjacencyList.get(stationAId)?.push(stationBId);
          adjacencyList.get(stationBId)?.push(stationAId);
      });
  }

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
        let line = station.line;
        if (index > 0) {
            const prevStation = path[index - 1];
            if (station.line !== prevStation.line) {
                 // Check if it's a valid interchange point
                if ((station.id === 'esplanade' && prevStation.line === 'Green') ||
                    (station.id === 'esplanade' && prevStation.line === 'Blue') ||
                    (station.id === 'kavi-subhash-orange' && prevStation.line === 'Blue') ||
                    (station.id === 'kavi-subhash' && prevStation.line === 'Orange')) {
                    interchanges++;
                }
            }
        }
        return { ...station, line };
    });

    return {
        path: routeWithLines,
        fare,
        stops,
        time,
        interchanges,
    };
}
