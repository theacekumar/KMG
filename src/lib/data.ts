export interface Station {
  id: string;
  name: string;
  code: string;
  line: 'Blue' | 'Green';
  gates: number;
  facilities: string[];
  firstTrain: string;
  lastTrain:string;
  platformInfo: string;
}

export interface Fare {
  from: string;
  to: string;
  fare: number;
}

export interface Line {
  name: 'Blue' | 'Green';
  stations: string[];
}

export const stations: Station[] = [
  // Blue Line
  { id: 'dakshineswar', name: 'Dakshineswar', code: 'DKS', line: 'Blue', gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "06:00", lastTrain: "21:30", platformInfo: "Platform 1: Dum Dum | Platform 2: Terminating" },
  { id: 'dum-dum', name: 'Dum Dum', code: 'DDM', line: 'Blue', gates: 5, facilities: ["Elevator", "Parking", "Food Court"], firstTrain: "05:45", lastTrain: "22:00", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar | Platform 3 & 4: Indian Railways" },
  { id: 'belgachia', name: 'Belgachia', code: 'BGA', line: 'Blue', gates: 2, facilities: ["Escalator"], firstTrain: "05:48", lastTrain: "21:57", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
  { id: 'shyambazar', name: 'Shyambazar', code: 'SMB', line: 'Blue', gates: 3, facilities: ["Elevator"], firstTrain: "05:51", lastTrain: "21:54", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
  { id: 'esplanade', name: 'Esplanade', code: 'ESP', line: 'Blue', gates: 6, facilities: ["Elevator", "Escalator", " Interchange"], firstTrain: "06:00", lastTrain: "21:45", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar | Interchange for Green Line" },
  { id: 'park-street', name: 'Park Street', code: 'PST', line: 'Blue', gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "06:03", lastTrain: "21:42", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
  { id: 'kalighat', name: 'Kalighat', code: 'KGT', line: 'Blue', gates: 3, facilities: ["Elevator", "Parking"], firstTrain: "06:08", lastTrain: "21:37", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
  { id: 'kavi-subhash', name: 'Kavi Subhash', code: 'KVS', line: 'Blue', gates: 4, facilities: ["Elevator", "Escalator", "Parking"], firstTrain: "05:45", lastTrain: "21:45", platformInfo: "Platform 1: Terminating | Platform 2: Dakshineswar" },

  // Green Line
  { id: 'salt-lake-sector-v', name: 'Salt Lake Sector V', code: 'SLV', line: 'Green', gates: 3, facilities: ["Elevator", "Wifi"], firstTrain: "06:30", lastTrain: "22:00", platformInfo: "Platform 1: Sealdah | Platform 2: Terminating" },
  { id: 'karunamoyee', name: 'Karunamoyee', code: 'KRM', line: 'Green', gates: 2, facilities: ["Escalator"], firstTrain: "06:33", lastTrain: "21:57", platformInfo: "Platform 1: Sealdah | Platform 2: Salt Lake Sector V" },
  { id: 'central-park', name: 'Central Park', code: 'CPK', line: 'Green', gates: 2, facilities: ["Parking"], firstTrain: "06:35", lastTrain: "21:55", platformInfo: "Platform 1: Sealdah | Platform 2: Salt Lake Sector V" },
  { id: 'sealdah', name: 'Sealdah', code: 'SDH', line: 'Green', gates: 4, facilities: ["Elevator", "Escalator", "Interchange"], firstTrain: "06:30", lastTrain: "22:00", platformInfo: "Platform 1: Terminating | Platform 2: Salt Lake Sector V" },
  { id: 'howrah-maidan', name: 'Howrah Maidan', code: 'HWM', line: 'Green', gates: 3, facilities: ["Elevator", "Escalator"], firstTrain: "07:00", lastTrain: "21:30", platformInfo: "Platform 1: Esplanade | Platform 2: Terminating" },
];

export const lines: Line[] = [
  {
    name: 'Blue',
    stations: ['dakshineswar', 'dum-dum', 'belgachia', 'shyambazar', 'esplanade', 'park-street', 'kalighat', 'kavi-subhash'],
  },
  {
    name: 'Green',
    stations: ['howrah-maidan', 'esplanade', 'sealdah', 'central-park', 'karunamoyee', 'salt-lake-sector-v'],
  }
];

export const fares: Fare[] = [
  { from: 'dum-dum', to: 'esplanade', fare: 10 },
  { from: 'dum-dum', to: 'kavi-subhash', fare: 25 },
  { from: 'kalighat', to: 'dum-dum', fare: 15 },
  { from: 'salt-lake-sector-v', to: 'sealdah', fare: 10 },
  { from: 'howrah-maidan', to: 'esplanade', fare: 5 },
  { from: 'esplanade', to: 'salt-lake-sector-v', fare: 20 },
  { from: 'dakshineswar', to: 'kavi-subhash', fare: 30 },
];
