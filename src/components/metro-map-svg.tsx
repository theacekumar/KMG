
'use client';

import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function MetroMapSvg() {
  const { toast } = useToast();
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const handleStationClick = (name: string, line: string) => {
    setSelectedStation(name);
    toast({
      title: name,
      description: `Line: ${line} | Operational Station Selected`,
    });
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-xl shadow-lg border p-2 md:p-4 flex justify-center items-center">
      <svg
        viewBox="0 0 950 1280"
        className="w-full max-w-4xl h-auto select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad-noapara" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="#0055A4" />
            <stop offset="50%" stopColor="#FFD200" />
          </linearGradient>
          <linearGradient id="grad-esplanade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="#0055A4" />
            <stop offset="50%" stopColor="#00A651" />
          </linearGradient>
          <linearGradient id="grad-kavi-subhash" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor="#0055A4" />
            <stop offset="50%" stopColor="#F26522" />
          </linearGradient>
        </defs>
        {/* Background Styling */}
        <rect width="950" height="1280" fill="#ffffff" />

        {/* River Hooghly Graphic */}
        <g id="background-river">
          <path
            d="M 270 0 
               C 260 150, 240 250, 250 350 
               C 260 450, 210 520, 190 580 
               C 170 640, 140 700, 110 760 
               C 70 840, 40 920, 30 1000 
               L 0 1050 L 0 0 Z"
            fill="#d4f3ff"
            opacity="0.8"
          />
        </g>

        {/* Boundary/Dashed Lines */}
        <g id="boundary-lines" stroke="#333333" strokeWidth="1.5" strokeDasharray="5,5" fill="none">
          <path d="M 85 0 L 85 530 L 150 630 L 220 630" />
          <path d="M 400 0 L 400 330 L 350 370" />
          <path d="M 150 910 L 420 910 L 520 1010 L 680 1200" />
        </g>

        {/* Metro Lines Tracks */}
        <g id="metro-lines" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Yellow Line - Operational (Noapara to Jai Hind) */}
          <path d="M 350 370 L 410 330 L 490 280 L 550 280" stroke="#FFD200" strokeWidth="6" id="line-yellow" />

          {/* Blue Line */}
          <path d="M 300 300 L 350 370 L 350 540 L 290 610 L 260 660 L 260 1010 L 310 1080 L 380 1120 L 510 1120 L 570 1070" stroke="#0055A4" strokeWidth="7" id="line-blue" />

          {/* Purple Line - Operational (Joka to Majerhat) */}
          <path d="M 70 1180 L 85 1150 L 110 1110 L 120 1110 L 140 1060 L 160 1030 L 160 1010 L 160 970 L 160 930" stroke="#8C318C" strokeWidth="6" id="line-purple" />

          {/* Green Line */}
          <path d="M 100 620 L 150 620 L 220 650 L 260 710 L 350 710 L 410 660 L 450 635 L 480 620 L 520 620 L 560 620 L 590 620 L 640 650" stroke="#00A651" strokeWidth="6" id="line-green" />

          {/* Orange Line (Line 6) - Operational (Kavi Subhash to Beleghata) */}
          <path d="M 570 1070 L 605 1025 L 640 980 L 640 940 L 640 910 L 640 860 L 640 810 L 640 760 L 640 710" stroke="#F26522" strokeWidth="6" id="line-orange" />
        </g>

        {/* Station Markers & Interactive Groups */}
        <g id="all-stations" cursor="pointer" fontFamily="sans-serif">
          
          {/* BLUE LINE STATIONS */}
          <g onClick={() => handleStationClick('Dakshineswar', 'Blue Line')}>
            <circle cx="300" cy="300" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="290" y="290" fontSize="13" fontWeight="bold" fill="#0055A4" transform="rotate(-30, 290, 290)">Dakshineswar</text>
          </g>
          <g onClick={() => handleStationClick('Baranagar', 'Blue Line')}>
            <circle cx="325" cy="335" r="5" fill="#0055A4" />
            <text x="320" y="355" fontSize="12" fill="#0055A4">Baranagar</text>
          </g>
          <g onClick={() => handleStationClick('Noapara', 'Interchange')}>
            <circle cx="350" cy="370" r="9" fill="url(#grad-noapara)" stroke="#000000" strokeWidth="2.5" />
            <text x="330" y="375" textAnchor="end" fontSize="13" fontWeight="bold" fill="#0055A4">Noapara</text>
          </g>
          <g onClick={() => handleStationClick('Dum Dum', 'Blue Line')}>
            <circle cx="350" cy="410" r="5" fill="#0055A4" />
            <text x="335" y="415" textAnchor="end" fontSize="12" fill="#0055A4">Dum Dum</text>
          </g>
          <g onClick={() => handleStationClick('Belgachia', 'Blue Line')}>
            <circle cx="350" cy="440" r="5" fill="#0055A4" />
            <text x="335" y="445" textAnchor="end" fontSize="12" fill="#0055A4">Belgachia</text>
          </g>
          <g onClick={() => handleStationClick('Shyambazar', 'Blue Line')}>
            <circle cx="350" cy="470" r="5" fill="#0055A4" />
            <text x="362" y="475" fontSize="12" fill="#0055A4">Shyambazar</text>
          </g>
          <g onClick={() => handleStationClick('Shobhabazar Sutanuti', 'Blue Line')}>
            <circle cx="350" cy="500" r="5" fill="#0055A4" />
            <text x="335" y="505" textAnchor="end" fontSize="12" fill="#0055A4">Shobhabazar Sutanuti</text>
          </g>
          <g onClick={() => handleStationClick('Girish Park', 'Blue Line')}>
            <circle cx="320" cy="570" r="5" fill="#0055A4" />
            <text x="305" y="565" textAnchor="end" fontSize="12" fill="#0055A4">Girish Park</text>
          </g>
          <g onClick={() => handleStationClick('Mahatma Gandhi Road', 'Blue Line')}>
            <circle cx="290" cy="610" r="5" fill="#0055A4" />
            <text x="305" y="615" fontSize="12" fill="#0055A4">M G Road</text>
          </g>
          <g onClick={() => handleStationClick('Central', 'Blue Line')}>
            <circle cx="275" cy="635" r="5" fill="#0055A4" />
            <text x="290" y="640" fontSize="12" fill="#0055A4">Central</text>
          </g>
          <g onClick={() => handleStationClick('Chandni Chowk', 'Blue Line')}>
            <circle cx="265" cy="660" r="5" fill="#0055A4" />
            <text x="250" y="655" textAnchor="end" fontSize="12" fill="#0055A4">Chandni Chowk</text>
          </g>
          <g onClick={() => handleStationClick('Esplanade', 'Interchange')}>
            <circle cx="260" cy="710" r="9" fill="url(#grad-esplanade)" stroke="#000000" strokeWidth="3" />
            <text x="275" y="715" fontSize="13" fontWeight="bold" fill="#000000">Esplanade</text>
          </g>
          <g onClick={() => handleStationClick('Park Street', 'Blue Line')}>
            <circle cx="260" cy="735" r="4" fill="#0055A4" />
            <text x="275" y="740" fontSize="11" fill="#666666">Park Street</text>
          </g>
          <g onClick={() => handleStationClick('Maidan', 'Blue Line')}>
            <circle cx="260" cy="770" r="5" fill="#0055A4" />
            <text x="245" y="775" textAnchor="end" fontSize="12" fill="#0055A4">Maidan</text>
          </g>
          <g onClick={() => handleStationClick('Rabindra Sadan', 'Blue Line')}>
            <circle cx="260" cy="810" r="5" fill="#0055A4" />
            <text x="245" y="810" textAnchor="end" fontSize="12" fill="#0055A4">Rabindra Sadan</text>
          </g>
          <g onClick={() => handleStationClick('Netaji Bhavan', 'Blue Line')}>
            <circle cx="260" cy="860" r="5" fill="#0055A4" />
            <text x="275" y="865" fontSize="12" fill="#0055A4">Netaji Bhavan</text>
          </g>
          <g onClick={() => handleStationClick('Jatindas Park', 'Blue Line')}>
            <circle cx="260" cy="900" r="5" fill="#0055A4" />
            <text x="275" y="905" fontSize="12" fill="#0055A4">Jatindas Park</text>
          </g>
          <g onClick={() => handleStationClick('Kalighat', 'Blue Line')}>
            <circle cx="260" cy="940" r="5" fill="#0055A4" />
            <text x="275" y="945" fontSize="12" fill="#0055A4">Kalighat</text>
          </g>
          <g onClick={() => handleStationClick('Rabindra Sarobar', 'Blue Line')}>
            <circle cx="260" cy="980" r="5" fill="#0055A4" />
            <text x="245" y="980" textAnchor="end" fontSize="11" fill="#0055A4">Rabindra Sarobar</text>
          </g>
          <g onClick={() => handleStationClick('Mahanayak Uttam Kumar', 'Blue Line')}>
            <circle cx="260" cy="1010" r="5" fill="#0055A4" />
            <text x="275" y="1015" fontSize="12" fill="#0055A4">Uttam Kumar</text>
          </g>
          <g onClick={() => handleStationClick('Netaji', 'Blue Line')}>
            <circle cx="290" cy="1070" r="5" fill="#0055A4" />
            <text x="250" y="1090" fontSize="12" fill="#0055A4">Netaji</text>
          </g>
          <g onClick={() => handleStationClick('Masterda Surya Sen', 'Blue Line')}>
            <circle cx="330" cy="1100" r="5" fill="#0055A4" />
            <text x="300" y="1135" fontSize="12" fill="#0055A4">Surya Sen</text>
          </g>
          <g onClick={() => handleStationClick('Kavi Nazrul', 'Blue Line')}>
            <circle cx="380" cy="1120" r="5" fill="#0055A4" />
            <text x="360" y="1155" fontSize="12" fill="#0055A4">Kavi Nazrul</text>
          </g>
          <g onClick={() => handleStationClick('Gitanjali', 'Blue Line')}>
            <circle cx="440" cy="1120" r="5" fill="#0055A4" />
            <text x="430" y="1155" fontSize="12" fill="#0055A4">Gitanjali</text>
          </g>
          <g onClick={() => handleStationClick('Shahid Khudiram', 'Blue Line')}>
            <circle cx="510" cy="1120" r="5" fill="#0055A4" />
            <text x="490" y="1155" fontSize="11" fill="#0055A4">Shahid Khudiram</text>
          </g>
          <g onClick={() => handleStationClick('Kavi Subhash', 'Interchange')}>
            <circle cx="570" cy="1070" r="9" fill="url(#grad-kavi-subhash)" stroke="#000000" strokeWidth="2.5" />
            <text x="590" y="1075" fontSize="13" fontWeight="bold" fill="#0055A4">Kavi Subhash</text>
          </g>

          {/* GREEN LINE STATIONS */}
          <g onClick={() => handleStationClick('Howrah Maidan', 'Green Line')}>
            <circle cx="100" cy="620" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="90" y="600" fontSize="14" fontWeight="bold" fill="#00A651">Howrah Maidan</text>
          </g>
          <g onClick={() => handleStationClick('Howrah', 'Green Line')}>
            <circle cx="150" cy="620" r="5" fill="#00A651" />
            <text x="140" y="605" fontSize="12" fill="#00A651">Howrah</text>
          </g>
          <g onClick={() => handleStationClick('Mahakaran', 'Green Line')}>
            <circle cx="220" cy="650" r="5" fill="#00A651" />
            <text x="210" y="635" fontSize="12" fill="#00A651">Mahakaran</text>
          </g>
          <g onClick={() => handleStationClick('Sealdah', 'Green Line')}>
            <circle cx="350" cy="710" r="5" fill="#00A651" />
            <text x="360" y="700" fontSize="12" fill="#00A651">Sealdah</text>
          </g>
          <g onClick={() => handleStationClick('Phoolbagan', 'Green Line')}>
            <circle cx="410" cy="660" r="5" fill="#00A651" />
            <text x="370" y="650" fontSize="11" fill="#00A651">Phoolbagan</text>
          </g>
          <g onClick={() => handleStationClick('Salt Lake Stadium', 'Green Line')}>
            <circle cx="450" cy="635" r="5" fill="#00A651" />
            <text x="420" y="620" fontSize="11" fill="#00A651">Salt Lake Stadium</text>
          </g>
          <g onClick={() => handleStationClick('Bengal Chemical', 'Green Line')}>
            <circle cx="480" cy="620" r="5" fill="#00A651" />
            <text x="480" y="590" fontSize="11" fill="#00A651">Bengal Chemical</text>
          </g>
          <g onClick={() => handleStationClick('City Center', 'Green Line')}>
            <circle cx="520" cy="620" r="5" fill="#00A651" />
            <text x="520" y="580" fontSize="11" fill="#00A651">City Center</text>
          </g>
          <g onClick={() => handleStationClick('Central Park', 'Green Line')}>
            <circle cx="560" cy="620" r="5" fill="#00A651" />
            <text x="560" y="605" fontSize="11" fill="#00A651">Central Park</text>
          </g>
          <g onClick={() => handleStationClick('Karunamoyee', 'Green Line')}>
            <circle cx="590" cy="620" r="5" fill="#00A651" />
            <text x="570" y="645" fontSize="11" fill="#00A651">Karunamoyee</text>
          </g>
          <g onClick={() => handleStationClick('Salt Lake Sector V', 'Interchange')}>
            <circle cx="640" cy="650" r="8" fill="#f7b70c" stroke="#000000" strokeWidth="2.5" />
            <text x="655" y="650" fontSize="12" fontWeight="bold" fill="#00A651">Salt Lake Sector V</text>
          </g>

          {/* YELLOW LINE STATIONS - Operational (Noapara to Jai Hind) */}
          <g onClick={() => handleStationClick('Jai Hind (Airport)', 'Yellow Line')}>
            <circle cx="550" cy="280" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="565" y="295" fontSize="13" fontWeight="bold" fill="#000000">Jai Hind (Airport)</text>
          </g>
          <g onClick={() => handleStationClick('Jessore Road', 'Yellow Line')}>
            <circle cx="490" cy="280" r="5" fill="#FFD200" />
            <text x="480" y="265" fontSize="12" fill="#FFD200">Jessore Road</text>
          </g>
          <g onClick={() => handleStationClick('Dumdum Cantonment', 'Yellow Line')}>
            <circle cx="410" cy="330" r="5" fill="#FFD200" />
            <text x="410" y="315" fontSize="11" fill="#FFD200">Dumdum Cantonment</text>
          </g>

          {/* ORANGE LINE STATIONS - Operational (Kavi Subhash to Beleghata) */}
          <g onClick={() => handleStationClick('Satyajit Ray', 'Orange Line')}>
            <circle cx="605" cy="1025" r="5" fill="#F26522" />
            <text x="620" y="1030" fontSize="12" fill="#333333">Satyajit Ray</text>
          </g>
          <g onClick={() => handleStationClick('Jyotirindra Nandi', 'Orange Line')}>
            <circle cx="640" cy="980" r="5" fill="#F26522" />
            <text x="655" y="985" fontSize="12" fill="#333333">Jyotirindra Nandi</text>
          </g>
          <g onClick={() => handleStationClick('Kavi Sukanta', 'Orange Line')}>
            <circle cx="640" cy="940" r="5" fill="#F26522" />
            <text x="655" y="945" fontSize="12" fill="#333333">Kavi Sukanta</text>
          </g>
          <g onClick={() => handleStationClick('Hemanta Mukhopadhyay', 'Orange Line')}>
            <circle cx="640" cy="910" r="5" fill="#F26522" />
            <text x="655" y="915" fontSize="12" fill="#333333">Hemanta Mukhopadhyay</text>
          </g>
          <g onClick={() => handleStationClick('VIP Bazar', 'Orange Line')}>
            <circle cx="640" cy="860" r="5" fill="#F26522" />
            <text x="655" y="865" fontSize="12" fill="#333333">VIP Bazar</text>
          </g>
          <g onClick={() => handleStationClick('Ritwik Ghatak', 'Orange Line')}>
            <circle cx="640" cy="810" r="5" fill="#F26522" />
            <text x="655" y="815" fontSize="12" fill="#333333">Ritwik Ghatak</text>
          </g>
          <g onClick={() => handleStationClick('Barun Sengupta', 'Orange Line')}>
            <circle cx="640" cy="760" r="5" fill="#F26522" />
            <text x="655" y="765" fontSize="12" fill="#333333">Barun Sengupta</text>
          </g>
          <g onClick={() => handleStationClick('Beleghata', 'Orange Line')}>
            <circle cx="640" cy="710" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="655" y="715" fontSize="13" fontWeight="bold" fill="#F26522">Beleghata</text>
          </g>

          {/* PURPLE LINE STATIONS - Operational (Joka to Majerhat) */}
          <g onClick={() => handleStationClick('Joka', 'Purple Line')}>
            <circle cx="70" cy="1180" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="55" y="1185" textAnchor="end" fontSize="12" fill="#8C318C">Joka</text>
          </g>
          <g onClick={() => handleStationClick('Thakurpukur', 'Purple Line')}>
            <circle cx="85" cy="1150" r="5" fill="#8C318C" />
            <text x="70" y="1155" textAnchor="end" fontSize="11" fill="#8C318C">Thakurpukur</text>
          </g>
          <g onClick={() => handleStationClick('Sakher Bazar', 'Purple Line')}>
            <circle cx="110" cy="1110" r="5" fill="#8C318C" />
            <text x="95" y="1115" textAnchor="end" fontSize="12" fill="#8C318C">Sakher Bazar</text>
          </g>
          <g onClick={() => handleStationClick('Behala Chowrasta', 'Purple Line')}>
            <circle cx="140" cy="1060" r="5" fill="#8C318C" />
            <text x="125" y="1065" textAnchor="end" fontSize="11" fill="#8C318C">Behala Chowrasta</text>
          </g>
          <g onClick={() => handleStationClick('Behala Bazar', 'Purple Line')}>
            <circle cx="160" cy="1010" r="5" fill="#8C318C" />
            <text x="145" y="1015" textAnchor="end" fontSize="12" fill="#8C318C">Behala Bazar</text>
          </g>
          <g onClick={() => handleStationClick('Taratala', 'Purple Line')}>
            <circle cx="160" cy="970" r="5" fill="#8C318C" />
            <text x="145" y="975" textAnchor="end" fontSize="12" fill="#8C318C">Taratala</text>
          </g>
          <g onClick={() => handleStationClick('Majerhat', 'Purple Line')}>
            <circle cx="160" cy="930" r="7" fill="#ffffff" stroke="#000000" strokeWidth="3" />
            <text x="145" y="935" textAnchor="end" fontSize="12" fill="#8C318C">Majerhat</text>
          </g>

        </g>

        {/* Legend Panel Box */}
        <g id="map-legend" transform="translate(730, 800)">
          {/* Border Box */}
          <rect width="200" height="280" fill="#ffffff" stroke="#00A651" strokeWidth="3" rx="4" />
          
          {/* Legend Title */}
          <text x="100" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0055A4" fontFamily="sans-serif">Legend</text>
          <line x1="20" y1="38" x2="180" y2="38" stroke="#0055A4" strokeWidth="1.5" />

          {/* Blue Line sample */}
          <line x1="25" y1="65" x2="55" y2="65" stroke="#0055A4" strokeWidth="5" />
          <text x="65" y="70" fontSize="13" fontFamily="sans-serif" fontWeight="600">Blue Line</text>

          {/* Green Line sample */}
          <line x1="25" y1="95" x2="55" y2="95" stroke="#00A651" strokeWidth="5" />
          <text x="65" y="100" fontSize="13" fontFamily="sans-serif" fontWeight="600">Green Line</text>

          {/* Purple Line sample */}
          <line x1="25" y1="125" x2="55" y2="125" stroke="#8C318C" strokeWidth="5" />
          <text x="65" y="130" fontSize="13" fontFamily="sans-serif" fontWeight="600">Purple Line</text>

          {/* Orange Line sample */}
          <line x1="25" y1="155" x2="55" y2="155" stroke="#F26522" strokeWidth="5" />
          <text x="65" y="160" fontSize="13" fontFamily="sans-serif" fontWeight="600">Orange Line</text>

          {/* Yellow Line sample */}
          <line x1="25" y1="185" x2="55" y2="185" stroke="#FFD200" strokeWidth="5" />
          <text x="65" y="190" fontSize="13" fontFamily="sans-serif" fontWeight="600">Yellow Line</text>

          {/* Generic Symbols */}
          <circle cx="40" cy="245" r="5" fill="#777777" />
          <text x="65" y="250" fontSize="13" fontFamily="sans-serif">Station</text>

          <circle cx="40" cy="265" r="5" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          <text x="65" y="270" fontSize="13" fontFamily="sans-serif">Terminal</text>
        </g>
      </svg>
    </div>
  );
}
