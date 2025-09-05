
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

function calculateSegmentFare(segment: StationNode[]): number {
    if (segment.length < 2) return 0;

    const fromId = segment[0].id;
    const toId = segment[segment.length - 1].id;
    const line = segment[0].line;

    // Check for specific predefined fares first
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) return directFare.fare;

    const km = (segment.length - 1) * 2; // Approximation of 2km per station

    if (line === 'Blue') {
        if (km <= 2) return 5;
        if (km <= 5) return 10;
        if (km <= 10) return 15;
        if (km <= 20) return 20;
        return 25;
    }

    if (line === 'Green') {
        if (km <= 2) return 5;
        if (km <= 5) return 10;
        if (km <= 10) return 20;
        if (km <= 16.5) return 30;
        return 30;
    }

    // Default fare structure for other lines (Purple, Orange, Yellow)
    if (km <= 2) return 5;
    if (km <= 5) return 10;
    if (km <= 15) return 20;
    return 25;
}


export function calculateFare(pathWithLines: StationNode[]): number {
    if (pathWithLines.length < 2) return 0;

    const segments: StationNode[][] = [];
    if (pathWithLines.length > 0) {
        let currentSegment: StationNode[] = [pathWithLines[0]];
        for (let i = 1; i < pathWithLines.length; i++) {
            if (pathWithLines[i].line !== pathWithLines[i - 1].line) {
                segments.push(currentSegment);
                currentSegment = [pathWithLines[i-1], pathWithLines[i]];
            } else {
                currentSegment.push(pathWithLines[i]);
            }
        }
        segments.push(currentSegment);
    }
    
    // For journeys with interchanges, we MUST sum the segments.
    if (segments.length > 1) {
        return segments.reduce((total, segment) => {
            return total + calculateSegmentFare(segment);
        }, 0);
    }

    // For direct journeys (no interchanges), check for a direct fare first.
    const fromId = pathWithLines[0].id;
    const toId = pathWithLines[pathWithLines.length - 1].id;
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) {
        return directFare.fare;
    }

    // If no direct fare, calculate based on segment logic.
    return calculateSegmentFare(pathWithLines);
}


const getLineForPathSegment = (stationA: Station, stationB: Station, preferredLine?: string): 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));

    if (preferredLine && commonLines.includes(preferredLine as any)) {
      return preferredLine as 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
    }
    
    if (commonLines.length > 0) {
        return commonLines[0];
    }
    
    // Handle interchange stations like Esplanade where the next station in path might not share a direct line
    if(stationA.name === stationB.name){
        return stationB.lines[0];
    }

    return stationA.lines[0];
}


export function getRouteDetails(fromId: string, toId: string, t: (typeof Translations)['en']) {
    const path = findShortestPath(fromId, toId);

    if (!path) {
        return { error: t.route.noRouteFound };
    }
    
    const stops = path.length - 1;
    const time = stops * 3; // Estimated 3 minutes per station (including wait)
    
    const routeWithLines: StationNode[] = [];
    let currentLine: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' | undefined = undefined;

    for (let i = 0; i < path.length; i++) {
        const currentStation = path[i];
        if (i === 0) {
            // First station
            const nextStation = path[i + 1];
            currentLine = nextStation ? getLineForPathSegment(currentStation, nextStation) : currentStation.lines[0];
            routeWithLines.push({ ...currentStation, line: currentLine });
        } else {
            const prevStation = path[i - 1];
            const prevStationNode = routeWithLines[i - 1];

            // This logic handles the line change. If the current station doesn't share a line with the previous station's ASSIGNED line, we need to find a new line.
            if (!currentStation.lines.includes(prevStationNode.line)) {
                // This indicates an interchange. Find the new line based on the connection to the next station.
                 const nextStation = path[i + 1];
                 currentLine = nextStation ? getLineForPathSegment(currentStation, nextStation, currentLine) : currentStation.lines.find(l => l !== prevStationNode.line) || currentStation.lines[0];
            } else {
                currentLine = prevStationNode.line;
            }
             routeWithLines.push({ ...currentStation, line: currentLine! });
        }
    }

    const finalPath = routeWithLines;

    const fare = calculateFare(finalPath);

    let interchanges = 0;
    for (let i = 1; i < finalPath.length; i++) {
        if (finalPath[i].line !== finalPath[i - 1].line) {
            interchanges++;
        }
    }


    return {
        path: finalPath,
        fare,
        stops,
        time,
        interchanges: interchanges,
    };
}

    