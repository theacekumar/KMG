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
    
    let interchanges = 0;
    for (let i = 1; i < pathWithLines.length; i++) {
        if (pathWithLines[i].line !== pathWithLines[i-1].line) {
            interchanges++;
        }
    }

    if (interchanges === 0) {
        const fromId = pathWithLines[0].id;
        const toId = pathWithLines[pathWithLines.length - 1].id;
        const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.from === fromId));
        if (directFare) {
            return directFare.fare;
        }
        return calculateSegmentFare(pathWithLines);
    }
    
    const segments: StationNode[][] = [];
    let currentSegment: StationNode[] = [pathWithLines[0]];

    for (let i = 1; i < pathWithLines.length; i++) {
        if (pathWithLines[i].line !== pathWithLines[i-1].line) {
            segments.push(currentSegment);
            currentSegment = [pathWithLines[i-1]]; 
        }
        currentSegment.push(pathWithLines[i]);
    }
    segments.push(currentSegment);
    
    let totalFare = 0;
    for (const segment of segments) {
        if(segment.length > 1) {
            const fromId = segment[0].id;
            const toId = segment[segment.length-1].id;
            const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
            if (directFare) {
                 totalFare += directFare.fare;
            } else {
                 totalFare += calculateSegmentFare(segment);
            }
        }
    }

    return totalFare;
}


const getLineForPathSegment = (stationA: Station, stationB: Station): 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));
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

    if (path.length > 0) {
        let firstLine: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
        if (path.length > 1) {
            firstLine = getLineForPathSegment(path[0], path[1]);
        } else {
            firstLine = path[0].lines[0];
        }
        routeWithLines.push({ ...path[0], line: firstLine });
    }

    for (let i = 1; i < path.length; i++) {
        const prevStationNode = routeWithLines[i - 1];
        const currentStation = path[i];
        let currentLine: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
        
        const commonLines = currentStation.lines.filter(l => prevStationNode.lines.includes(l));
        
        if (currentStation.name === prevStationNode.name) { // Interchange at the same station
            const nextStation = path[i + 1];
            if (nextStation) {
                const nextCommonLines = currentStation.lines.filter(l => nextStation.lines.includes(l));
                if (nextCommonLines.length > 0) {
                    currentLine = nextCommonLines[0];
                } else {
                    currentLine = currentStation.lines.filter(l => l !== prevStationNode.line)[0] || currentStation.lines[0];
                }
            } else {
                currentLine = prevStationNode.line;
            }
        } else if (commonLines.length > 0) {
            currentLine = prevStationNode.line;
             if (!commonLines.includes(currentLine)) {
                currentLine = commonLines[0];
            }
        } else {
            currentLine = prevStationNode.line; 
        }

        routeWithLines.push({ ...currentStation, line: currentLine });
    }

     // Second pass to correct line assignments after interchanges
    for (let i = 1; i < routeWithLines.length - 1; i++) {
        const prev = routeWithLines[i - 1];
        const curr = routeWithLines[i];
        const next = routeWithLines[i + 1];
        if (curr.name === prev.name) { // We are at an interchange
           const commonWithNext = curr.lines.filter(l => next.lines.includes(l));
           if(commonWithNext.length > 0){
             routeWithLines[i-1].line = commonWithNext[0];
             routeWithLines[i].line = commonWithNext[0];
           }
        }
    }


    const finalPath = routeWithLines;

    const fare = calculateFare(finalPath);

    const finalInterchanges = finalPath.reduce((acc, station, index, arr) => {
        if (index > 0 && station.line !== arr[index-1].line) {
            // This is a more accurate way to count interchanges
            acc++;
        }
        return acc;
    }, 0);


    return {
        path: finalPath,
        fare,
        stops,
        time,
        interchanges: finalInterchanges,
    };
}
