
export interface Station {
  id: string;
  name: string;
  code: string;
  lines: ('Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow')[];
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
  name: 'Blue' | 'Green' | 'Purple' | 'Orange' | 'Yellow';
  stations: string[];
}

export const stations: Station[] = [
    // Blue Line (North-South)
    { id: 'dakshineswar', name: 'Dakshineswar', code: 'DKS', lines: ['Blue'], gates: 4, facilities: ["Elevator", "Escalator", "Toilets"], firstTrain: "06:45", lastTrain: "21:30", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Terminating" },
    { id: 'baranagar', name: 'Baranagar', code: 'BRN', lines: ['Blue'], gates: 2, facilities: ["Elevator", "Toilets"], firstTrain: "06:48", lastTrain: "21:33", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
    { id: 'noapara', name: 'Noapara', code: 'NOA', lines: ['Blue', 'Yellow'], gates: 3, facilities: ["Elevator", "Escalator", "Parking", "Interchange"], firstTrain: "06:50", lastTrain: "21:35", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar" },
    { id: 'dum-dum', name: 'Dum Dum', code: 'DDM', lines: ['Blue'], gates: 5, facilities: ["Elevator", "Escalator", "Food Court", "Parking", "Toilets"], firstTrain: "06:45", lastTrain: "22:00", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dakshineswar | Platform 3 & 4: Indian Railways" },
    { id: 'belgachia', name: 'Belgachia', code: 'BGA', lines: ['Blue'], gates: 2, facilities: ["Escalator", "Toilets"], firstTrain: "06:48", lastTrain: "21:57", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'shyambazar', name: 'Shyambazar', code: 'SMB', lines: ['Blue'], gates: 3, facilities: ["Elevator"], firstTrain: "06:51", lastTrain: "21:54", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'shobhabazar-sutanuti', name: 'Shobhabazar Sutanuti', code: 'SST', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "06:53", lastTrain: "21:52", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'girish-park', name: 'Girish Park', code: 'GIR', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "06:55", lastTrain: "21:50", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'mahatma-gandhi-road', name: 'Mahatma Gandhi Road', code: 'MGR', lines: ['Blue'], gates: 4, facilities: ["Escalator"], firstTrain: "06:57", lastTrain: "21:48", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'central', name: 'Central', code: 'CEN', lines: ['Blue'], gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "06:59", lastTrain: "21:46", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'chandni-chowk', name: 'Chandni Chowk', code: 'CHC', lines: ['Blue'], gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "07:01", lastTrain: "21:44", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'esplanade', name: 'Esplanade', code: 'ESP', lines: ['Blue', 'Green'], gates: 6, facilities: ["Elevator", "Escalator", "Interchange", "Toilets"], firstTrain: "07:00", lastTrain: "21:45", platformInfo: "Blue Line: P1 Kavi Subhash, P2 Dum Dum | Green Line: P1 Howrah Maidan, P2 Sealdah" },
    { id: 'park-street', name: 'Park Street', code: 'PST', lines: ['Blue', 'Purple'], gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "07:03", lastTrain: "21:42", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'maidan', name: 'Maidan', code: 'MDN', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "07:05", lastTrain: "21:40", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'rabindra-sadan', name: 'Rabindra Sadan', code: 'RSD', lines: ['Blue'], gates: 2, facilities: ["Escalator"], firstTrain: "07:07", lastTrain: "21:38", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'netaji-bhavan', name: 'Netaji Bhavan', code: 'NBH', lines: ['Blue'], gates: 2, facilities: ["Escalator"], firstTrain: "07:09", lastTrain: "21:36", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'jatindas-park', name: 'Jatindas Park', code: 'JDP', lines: ['Blue'], gates: 3, facilities: [], firstTrain: "07:11", lastTrain: "21:34", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'kalighat', name: 'Kalighat', code: 'KGT', lines: ['Blue'], gates: 4, facilities: ["Elevator", "Escalator"], firstTrain: "07:13", lastTrain: "21:32", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'rabindra-sarobar', name: 'Rabindra Sarobar', code: 'RBS', lines: ['Blue'], gates: 3, facilities: ["Parking"], firstTrain: "07:15", lastTrain: "21:30", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'mahanayak-uttam-kumar', name: 'Mahanayak Uttam Kumar', code: 'MUK', lines: ['Blue'], gates: 4, facilities: ["Elevator", "Escalator", "Parking"], firstTrain: "06:45", lastTrain: "21:55", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'netaji', name: 'Netaji', code: 'NTJ', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "06:51", lastTrain: "21:51", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'masterda-surya-sen', name: 'Masterda Surya Sen', code: 'MSS', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "06:54", lastTrain: "21:48", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'gitanjali', name: 'Gitanjali', code: 'GTN', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "06:56", lastTrain: "21:46", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'kavi-nazrul', name: 'Kavi Nazrul', code: 'KZN', lines: ['Blue'], gates: 3, facilities: ["Elevator", "Escalator"], firstTrain: "06:58", lastTrain: "21:44", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'shahid-khudiram', name: 'Shahid Khudiram', code: 'SKD', lines: ['Blue'], gates: 2, facilities: [], firstTrain: "07:01", lastTrain: "21:41", platformInfo: "Platform 1: Kavi Subhash | Platform 2: Dum Dum" },
    { id: 'kavi-subhash', name: 'Kavi Subhash', code: 'KVS', lines: ['Blue', 'Orange'], gates: 4, facilities: ["Elevator", "Escalator", "Parking", "Toilets", "Interchange"], firstTrain: "06:45", lastTrain: "21:45", platformInfo: "Blue Line: P1 Terminating, P2 Dakshineswar | Orange Line: Interchange" },

    // Green Line (East-West)
    { id: 'salt-lake-sector-v', name: 'Salt Lake Sector V', code: 'SLV', lines: ['Green'], gates: 3, facilities: ["Elevator", "Toilets", "Wifi"], firstTrain: "06:55", lastTrain: "22:00", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Terminating" },
    { id: 'karunamoyee', name: 'Karunamoyee', code: 'KRM', lines: ['Green'], gates: 2, facilities: ["Escalator", "Toilets"], firstTrain: "06:58", lastTrain: "21:57", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'central-park', name: 'Central Park', code: 'CPK', lines: ['Green'], gates: 2, facilities: ["Parking"], firstTrain: "07:00", lastTrain: "21:55", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'city-center', name: 'City Center', code: 'CIT', lines: ['Green'], gates: 2, facilities: [], firstTrain: "07:02", lastTrain: "21:53", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'bengal-chemical', name: 'Bengal Chemical', code: 'BNC', lines: ['Green'], gates: 2, facilities: [], firstTrain: "07:04", lastTrain: "21:51", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'salt-lake-stadium', name: 'Salt Lake Stadium', code: 'SLS', lines: ['Green'], gates: 3, facilities: ["Elevator", "Escalator"], firstTrain: "07:07", lastTrain: "21:48", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'phoolbagan', name: 'Phoolbagan', code: 'PHB', lines: ['Green'], gates: 2, facilities: ["Elevator", "Escalator"], firstTrain: "07:10", lastTrain: "21:45", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'sealdah', name: 'Sealdah', code: 'SDH', lines: ['Green'], gates: 4, facilities: ["Elevator", "Escalator", "Interchange", "Toilets"], firstTrain: "07:00", lastTrain: "21:40", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V | Indian Railways Interchange" },
    { id: 'mahakaran', name: 'Mahakaran', code: 'MHK', lines: ['Green'], gates: 4, facilities: ["Elevator", "Escalator", "Toilets"], firstTrain: "07:00", lastTrain: "21:40", platformInfo: "Platform 1: Howrah Maidan | Platform 2: Salt Lake Sector V" },
    { id: 'howrah', name: 'Howrah', code: 'HWH', lines: ['Green'], gates: 5, facilities: ["Elevator", "Escalator", "Toilets"], firstTrain: "07:00", lastTrain: "21:30", platformInfo: "Platform 1: Salt Lake Sector V | Platform 2: Terminating" },
    { id: 'howrah-maidan', name: 'Howrah Maidan', code: 'HWM', lines: ['Green'], gates: 3, facilities: ["Elevator", "Escalator"], firstTrain: "07:00", lastTrain: "21:30", platformInfo: "Platform 1: Salt Lake Sector V | Platform 2: Terminating" },

    // Purple Line (Joka-Esplanade)
    { id: 'joka', name: 'Joka', code: 'JOK', lines: ['Purple'], gates: 2, facilities: ["Parking"], firstTrain: "08:55", lastTrain: "16:00", platformInfo: "Platform 1: Majherhat | Platform 2: Terminating" },
    { id: 'thakurpukur-cancer-hospital', name: 'Thakurpukur Cancer Hospital', code: 'TCP', lines: ['Purple'], gates: 2, facilities: [], firstTrain: "09:00", lastTrain: "16:05", platformInfo: "Platform 1: Majherhat | Platform 2: Joka" },
    { id: 'sakherbazar', name: 'Sakherbazar', code: 'SKB', lines: ['Purple'], gates: 2, facilities: [], firstTrain: "09:03", lastTrain: "16:08", platformInfo: "Platform 1: Majherhat | Platform 2: Joka" },
    { id: 'behala-chowrasta', name: 'Behala Chowrasta', code: 'BHC', lines: ['Purple'], gates: 2, facilities: ["Escalator"], firstTrain: "09:05", lastTrain: "16:10", platformInfo: "Platform 1: Majherhat | Platform 2: Joka" },
    { id: 'behala-bazar', name: 'Behala Bazar', code: 'BHB', lines: ['Purple'], gates: 2, facilities: [], firstTrain: "09:08", lastTrain: "16:13", platformInfo: "Platform 1: Majherhat | Platform 2: Joka" },
    { id: 'taratala', name: 'Taratala', code: 'TAR', lines: ['Purple'], gates: 2, facilities: ["Elevator"], firstTrain: "09:12", lastTrain: "16:17", platformInfo: "Platform 1: Majherhat | Platform 2: Joka" },
    { id: 'majherhat', name: 'Majherhat', code: 'MAJ', lines: ['Purple'], gates: 3, facilities: ["Elevator", "Escalator", "Interchange"], firstTrain: "09:15", lastTrain: "16:20", platformInfo: "Platform 1: Terminating | Platform 2: Joka | Indian Railways Interchange" },

    // Orange Line (Kavi Subhash-Jai Hind)
    { id: 'satyajit-ray', name: 'Satyajit Ray', code: 'SJR', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:03", lastTrain: "16:43", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'jyotirindra-nandi', name: 'Jyotirindra Nandi', code: 'JYN', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:05", lastTrain: "16:45", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'kavi-sukanta', name: 'Kavi Sukanta', code: 'KSK', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:08", lastTrain: "16:48", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'hemanta-mukhopadhyay', name: 'Hemanta Mukhopadhyay', code: 'HMK', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:10", lastTrain: "16:50", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'vip-bazar', name: 'VIP Bazar', code: 'VIP', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:13", lastTrain: "16:53", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'ritwik-ghatak', name: 'Ritwik Ghatak', code: 'RTG', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:15", lastTrain: "16:55", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'barun-sengupta', name: 'Barun Sengupta', code: 'BSG', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:18", lastTrain: "16:58", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'beleghata', name: 'Beleghata', code: 'BLG', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:21", lastTrain: "17:01", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },
    { id: 'subhas-sarobar', name: 'Subhas Sarobar', code: 'SSR', lines: ['Orange'], gates: 2, facilities: [], firstTrain: "09:24", lastTrain: "17:04", platformInfo: "Platform 1: Jai Hind | Platform 2: Kavi Subhash" },

    // Yellow Line
    { id: 'dumdum-cantonment', name: 'Dumdum Cantonment', code: 'DDC', lines: ['Yellow'], gates: 2, facilities: ["Toilets"], firstTrain: "07:00", lastTrain: "21:00", platformInfo: "Platform 1: Jai Hind | Platform 2: Noapara" },
    { id: 'jessore-road', name: 'Jessore Road', code: 'JSR', lines: ['Yellow'], gates: 2, facilities: ["Toilets"], firstTrain: "07:05", lastTrain: "20:55", platformInfo: "Platform 1: Jai Hind | Platform 2: Noapara" },
    { id: 'jai-hind', name: 'Jai Hind (Airport)', code: 'JHD', lines: ['Yellow'], gates: 3, facilities: ["Elevator", "Escalator", "Interchange with Airport"], firstTrain: "07:10", lastTrain: "20:50", platformInfo: "Platform 1: Terminating | Platform 2: Noapara" }
];

export const lines: Line[] = [
  {
    name: 'Blue',
    stations: [
      'dakshineswar', 'baranagar', 'noapara', 'dum-dum', 'belgachia', 'shyambazar',
      'shobhabazar-sutanuti', 'girish-park', 'mahatma-gandhi-road', 'central',
      'chandni-chowk', 'esplanade', 'park-street', 'maidan', 'rabindra-sadan', 'netaji-bhavan', 'jatindas-park', 'kalighat', 'rabindra-sarobar', 'mahanayak-uttam-kumar',
      'netaji', 'masterda-surya-sen', 'gitanjali', 'kavi-nazrul',
      'shahid-khudiram', 'kavi-subhash'
    ],
  },
  {
    name: 'Green',
    stations: [
      'howrah-maidan', 'howrah', 'mahakaran', 'esplanade', 'sealdah', 'phoolbagan', 'salt-lake-stadium',
      'bengal-chemical', 'city-center', 'central-park', 'karunamoyee', 'salt-lake-sector-v'
    ],
  },
  {
      name: 'Purple',
      stations: [
          'joka', 'thakurpukur-cancer-hospital', 'sakherbazar', 'behala-chowrasta', 'behala-bazar', 'taratala', 'majherhat', 'park-street'
      ]
  },
  {
      name: 'Orange',
      stations: [
        'kavi-subhash', 'satyajit-ray', 'jyotirindra-nandi', 'kavi-sukanta',
        'hemanta-mukhopadhyay', 'vip-bazar', 'ritwik-ghatak', 'barun-sengupta', 'beleghata', 'subhas-sarobar'
      ]
  },
  {
      name: 'Yellow',
      stations: [
          'noapara', 'dumdum-cantonment', 'jessore-road', 'jai-hind'
      ]
  }
];

export const fares: Fare[] = [
  // Green Line
  { from: 'howrah-maidan', to: 'howrah', fare: 5 },
  { from: 'howrah-maidan', to: 'esplanade', fare: 10 },
  { from: 'howrah-maidan', to: 'sealdah', fare: 10 },
  { from: 'howrah-maidan', to: 'salt-lake-sector-v', fare: 20 },
  { from: 'howrah', to: 'mahakaran', fare: 10 },
  // Blue Line
  { from: 'dakshineswar', to: 'dum-dum', fare: 10 },
  { from: 'dakshineswar', to: 'esplanade', fare: 20 },
  { from: 'dakshineswar', to: 'kavi-subhash', fare: 25 },
  // Yellow Line
  { from: 'jai-hind', to: 'jessore-road', fare: 5 },
  { from: 'jai-hind', to: 'dumdum-cantonment', fare: 10 },
  { from: 'jai-hind', to: 'noapara', fare: 20 },
  // Orange Line
  { from: 'kavi-subhash', to: 'hemanta-mukhopadhyay', fare: 10 },
  { from: 'kavi-subhash', to: 'beleghata', fare: 20 },

  // --- From Jai Hind (Airport) ---
  // To Blue Line
  { from: 'jai-hind', to: 'shyambazar', fare: 35 },
  { from: 'jai-hind', to: 'central', fare: 35 },
  { from: 'jai-hind', to: 'girish-park', fare: 35 },
  { from: 'jai-hind', to: 'esplanade', fare: 40 },
  { from: 'jai-hind', to: 'park-street', fare: 40 },
  { from: 'jai-hind', to: 'rabindra-sarobar', fare: 40 },
  { from: 'jai-hind', to: 'netaji', fare: 45 },
  { from: 'jai-hind', to: 'kavi-subhash', fare: 45 },
  // To Green Line
  { from: 'jai-hind', to: 'phoolbagan', fare: 50 },
  { from: 'jai-hind', to: 'sealdah', fare: 50 },
  { from: 'jai-hind', to: 'howrah', fare: 50 },
  { from: 'jai-hind', to: 'howrah-maidan', fare: 50 },
  { from: 'jai-hind', to: 'salt-lake-sector-v', fare: 70 },
  // To Orange Line
  { from: 'jai-hind', to: 'hemanta-mukhopadhyay', fare: 65 },
  { from: 'jai-hind', to: 'beleghata', fare: 65 },
  
  // --- From Hemanta Mukhopadhyay (Ruby) ---
  // To Blue Line
  { from: 'hemanta-mukhopadhyay', to: 'dakshineswar', fare: 45 },
  { from: 'hemanta-mukhopadhyay', to: 'dum-dum', fare: 45 },
  { from: 'hemanta-mukhopadhyay', to: 'girish-park', fare: 40 },
  { from: 'hemanta-mukhopadhyay', to: 'esplanade', fare: 40 },
  { from: 'hemanta-mukhopadhyay', to: 'park-street', fare: 40 },
  { from: 'hemanta-mukhopadhyay', to: 'mahanayak-uttam-kumar', fare: 35 },
  // To Green Line
  { from: 'hemanta-mukhopadhyay', to: 'howrah-maidan', fare: 50 },
  { from: 'hemanta-mukhopadhyay', to: 'sealdah', fare: 50 },

  // --- From Jessore Road ---
  { from: 'jessore-road', to: 'shyambazar', fare: 35 },
  { from: 'jessore-road', to: 'central', fare: 35 },
  { from: 'jessore-road', to: 'girish-park', fare: 35 },
  { from: 'jessore-road', to: 'chandni-chowk', fare: 40 },
  { from: 'jessore-road', to: 'esplanade', fare: 40 },
  { from: 'jessore-road', to: 'park-street', fare: 40 },
  { from: 'jessore-road', to: 'rabindra-sarobar', fare: 40 },
  { from: 'jessore-road', to: 'mahanayak-uttam-kumar', fare: 40 },
  { from: 'jessore-road', to: 'kavi-subhash', fare: 45 },
  { from: 'jessore-road', to: 'howrah-maidan', fare: 50 },
  { from: 'jessore-road', to: 'howrah', fare: 50 },
  { from: 'jessore-road', to: 'salt-lake-sector-v', fare: 70 },
  { from: 'jessore-road', to: 'hemanta-mukhopadhyay', fare: 65 },
  { from: 'jessore-road', to: 'beleghata', fare: 65 },
  
  // -- From Dum Dum Cantonment --
  { from: 'dumdum-cantonment', to: 'shyambazar', fare: 25 },
  { from: 'dumdum-cantonment', to: 'central', fare: 25 },
  { from: 'dumdum-cantonment', to: 'girish-park', fare: 25 },
  { from: 'dumdum-cantonment', to: 'chandni-chowk', fare: 30 },
  { from: 'dumdum-cantonment', to: 'esplanade', fare: 30 },
  { from: 'dumdum-cantonment', to: 'park-street', fare: 30 },
  { from: 'dumdum-cantonment', to: 'rabindra-sarobar', fare: 30 },
  { from: 'dumdum-cantonment', to: 'mahanayak-uttam-kumar', fare: 30 },
  { from: 'dumdum-cantonment', to: 'kavi-subhash', fare: 35 },
  { from: 'dumdum-cantonment', to: 'howrah-maidan', fare: 40 },
  { from: 'dumdum-cantonment', to: 'howrah', fare: 40 },
  { from: 'dumdum-cantonment', to: 'sealdah', fare: 40 },
  { from: 'dumdum-cantonment', to: 'salt-lake-sector-v', fare: 60 },
  { from: 'dumdum-cantonment', to: 'hemanta-mukhopadhyay', fare: 55 },
  { from: 'dumdum-cantonment', to: 'beleghata', fare: 55 },
];

    

