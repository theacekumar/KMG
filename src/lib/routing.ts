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
        if (!adjacencyList.get(currentStationId)?.includes(prevStationId)) {
            adjacencyList.get(currentStationId)?.push(prevStationId);
        }
      }
      if (i < line.stations.length - 1) {
        const nextStationId = line.stations[i + 1];
        if (!adjacencyList.get(currentStationId)?.includes(nextStationId)) {
            adjacencyList.get(currentStationId)?.push(nextStationId);
        }
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
        case 'Blue': return 'bg-blue-600';
        case 'Green': return 'bg-green-600';
        case 'Purple': return 'bg-purple-600';
        case 'Orange': return 'bg-orange-600';
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

export function calculateFare(path: Station[]): number {
    if (path.length < 2) return 0;
    
    const fromId = path[0].id;
    const toId = path[path.length - 1].id;
    
    // Check direct fare table first
    const directFare = fares.find(f => (f.from === fromId && f.to === toId) || (f.from === toId && f.to === fromId));
    if (directFare) {
        return directFare.fare;
    }

    // Fallback fare calculation logic
    const pathWithLines = getPathWithLines(path);
    if (!pathWithLines) return 0;

    const stops = path.length - 1;
    
    // Blue line specific logic if the whole path is Blue
    const isBlueOnly = pathWithLines.every(s => s.line === 'Blue');
    if (isBlueOnly) {
        if (stops <= 2) return 5;
        if (stops <= 5) return 10;
        if (stops <= 10) return 15;
        if (stops <= 15) return 20;
        return 25;
    }

    // General interchange fare logic
    let totalFare = 0;
    let currentLine = pathWithLines[0].line;
    let segmentStops = 0;

    for (let i = 1; i < pathWithLines.length; i++) {
        segmentStops++;
        if (pathWithLines[i].line !== currentLine) {
            // Calculate for segment
            totalFare += Math.min(25, 5 + Math.floor(segmentStops / 3) * 5);
            segmentStops = 0;
            currentLine = pathWithLines[i].line;
        }
    }
    totalFare += Math.min(25, 5 + Math.floor(segmentStops / 3) * 5);

    return Math.min(60, totalFare); // Cap total fare
}

const getLineForPathSegment = (stationA: Station, stationB: Station, preferredLine?: string): 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' => {
    const commonLines = stationA.lines.filter(line => stationB.lines.includes(line));

    if (preferredLine && commonLines.includes(preferredLine as any)) {
      return preferredLine as 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
    }
    
    if (commonLines.length > 0) {
        return commonLines[0];
    }
    
    return stationA.lines[0];
}

const getPathWithLines = (path: Station[]): StationNode[] | null => {
    if (!path || path.length === 0) {
        return null;
    }
    
    const pathWithLines: StationNode[] = [];
    let currentLine: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow' | undefined;
    
    for (let i = 0; i < path.length; i++) {
        const currentStation = path[i];
        
        if (i === 0) {
            const nextStation = path[i + 1];
            currentLine = nextStation ? getLineForPathSegment(currentStation, nextStation) : currentStation.lines[0];
        } else {
            const nextStation = path[i + 1];
            if (nextStation) {
                const availableLines = currentStation.lines.filter(l => nextStation.lines.includes(l));
                if (currentLine && !availableLines.includes(currentLine)) {
                    // Interchange
                    currentLine = availableLines[0] || currentStation.lines[0];
                }
            } else {
                // Last station
                if (currentLine && !currentStation.lines.includes(currentLine)) {
                    currentLine = currentStation.lines[0];
                }
            }
        }
        pathWithLines.push({ ...currentStation, line: currentLine as any });
    }

    return pathWithLines;
}

export function getRouteDetails(fromId: string, toId: string, t: (typeof Translations)['en']) {
    const path = findShortestPath(fromId, toId);

    if (!path) {
        return { error: t.route.noRouteFound };
    }
    
    const stops = path.length - 1;
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

    // Estimate time: 2 mins per station + 5 mins per interchange
    const estimatedTime = (stops * 2) + (interchanges * 5);

    return {
        path: pathWithLines,
        fare,
        stops,
        time: estimatedTime,
        interchanges,
    };
}
