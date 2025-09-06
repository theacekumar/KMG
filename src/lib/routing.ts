
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
      return path.map(id => getStationById(id)!);
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

const stationCache = new Map<string, Station>();
export function getStationById(id: string): Station | undefined {
  if (stationCache.has(id)) {
    return stationCache.get(id);
  }
  const station = stations.find(s => s.id === id);
  if (station) {
    stationCache.set(id, station);
  }
  return station;
}

function calculateSegmentFare(segment: StationNode[]): number {
    if (segment.length < 2) return 0;

    const fromId = segment[0].id;
    const toId = segment[segment.length - 1].id;
    
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.from === fromId));
    if (directFare) return directFare.fare;

    const blueLineStations = lines.find(l => l.name === 'Blue')?.stations || [];
    const fromIndex = blueLineStations.indexOf(fromId);
    const toIndex = blueLineStations.indexOf(toId);

    if (fromIndex !== -1 && toIndex !== -1) {
        const distance = Math.abs(toIndex - fromIndex);
        if (distance <= 2) return 10;
        if (distance <= 5) return 15;
        if (distance <= 10) return 20;
        return 25;
    }

    const km = (segment.length - 1) * 2; // Approximation of 2km per station
    const line = segment[0].line;

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


export function calculateFare(path: Station[]): number {
    if (path.length < 2) return 0;
    
    const fromId = path[0].id;
    const toId = path[path.length - 1].id;
    
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) {
        return directFare.fare;
    }

    const pathWithLines = getPathWithLines(path);
    if (!pathWithLines) return 0;

    let totalFare = 0;
    let currentSegment: StationNode[] = [pathWithLines[0]];

    for (let i = 1; i < pathWithLines.length; i++) {
        if (pathWithLines[i].line !== pathWithLines[i - 1].line) {
            totalFare += calculateSegmentFare(currentSegment);
            currentSegment = [pathWithLines[i - 1], pathWithLines[i]];
        } else {
            currentSegment.push(pathWithLines[i]);
        }
    }
    totalFare += calculateSegmentFare(currentSegment);
    
    // If the entire journey is on the blue line, use the specific blue line logic
    const isBlueLineOnly = pathWithLines.every(station => station.line === 'Blue');
    if (isBlueLineOnly) {
      return calculateSegmentFare(pathWithLines);
    }
    
    return totalFare;
}


const getLineForPathSegment = (stationA: Station, stationB: Station, preferredLine?: string): 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));

    if (preferredLine && commonLines.includes(preferredLine as any)) {
      return preferredLine as 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
    }
    
    if (commonLines.length > 0) {
        return commonLines[0];
    }
    
    // Handle interchange stations where the next station in path might not share a direct line
    if(stationA.name === stationB.name){
        return stationB.lines[0];
    }

    return stationA.lines[0];
}

const getPathWithLines = (path: Station[]): StationNode[] | null => {
    if (!path || path.length === 0) {
        return null;
    }
    
    const pathWithLines: StationNode[] = [];
    
    for (let i = 0; i < path.length; i++) {
        const currentStation = path[i];
        let line: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
        
        if (i === 0) {
            const nextStation = path[i + 1];
            line = nextStation ? getLineForPathSegment(currentStation, nextStation) : currentStation.lines[0];
        } else {
            const prevStationNode = pathWithLines[i - 1];
            const prevStation = getStationById(prevStationNode.id)!;
            
            // If the current station is on the same line as the previous one, keep the line
            if (currentStation.lines.includes(prevStationNode.line)) {
                line = prevStationNode.line;
            } else {
                // Otherwise, it's an interchange. Find the new line.
                // This logic assumes the new line is the first one listed that is not the previous line.
                const newLine = currentStation.lines.find(l => l !== prevStationNode.line);
                line = newLine || currentStation.lines[0];
            }
        }
        pathWithLines.push({ ...currentStation, line: line });
    }

    // Refine interchanges
     for (let i = 1; i < pathWithLines.length; i++) {
        if (pathWithLines[i].id === pathWithLines[i-1].id) continue;

        const prevLines = pathWithLines[i-1].lines;
        const currLines = pathWithLines[i].lines;
        const commonLines = currLines.filter(l => prevLines.includes(l));
        
        if(!commonLines.includes(pathWithLines[i-1].line)) {
             pathWithLines[i-1].line = commonLines[0] || prevLines[0];
        }

        if (!commonLines.includes(pathWithLines[i].line)) {
            pathWithLines[i].line = commonLines[0] || currLines[0];
        }
    }


    return pathWithLines;
}


export function getRouteDetails(fromId: string, toId: string, t: (typeof Translations)['en']) {
    const path = findShortestPath(fromId, toId);

    if (!path) {
        return { error: t.route.noRouteFound };
    }
    
    const stops = path.length - 1;
    const time = stops * 3; // Estimated 3 minutes per station (including wait)
    
    const pathWithLines = getPathWithLines(path);
    if(!pathWithLines) {
        return { error: t.route.noRouteFound };
    }

    const fare = calculateFare(path);

    let interchanges = 0;
    for (let i = 1; i < pathWithLines.length; i++) {
        if (pathWithLines[i].line !== pathWithLines[i - 1].line) {
            interchanges++;
        }
    }

    return {
        path: pathWithLines,
        fare,
        stops,
        time,
        interchanges,
    };
}
