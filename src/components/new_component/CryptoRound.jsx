import React from "react";

const CryptoRound = () => {
  return (
    <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
      {/* Round i-1 */}
      <text x="50" y="40"  fontSize="16" fontWeight="bold" fill="#0077cc">
        Result of round i-1
      </text>
      {["A", "B", "C", "D", "E", "F", "G", "H"].map((label, index) => (
        <rect
          key={label}
          x={100 + index * 80}
          y={60}
          width="40"
          height="40"
          fill="#82c3f7"
          stroke="#0077cc"
          rx="5"
        />
      ))}
      {["A", "B", "C", "D", "E", "F", "G", "H"].map((label, index) => (
        <text
          key={label}
          x={120 + index * 80}
          y={85}
          fontSize="16"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}

      {/* Operation Boxes */}
      <rect x="500" y="120" width="60" height="40" fill="#b3b3b3" rx="5" />
      <text x="530" y="145" fontSize="14" fontWeight="bold" fill="white">
        Ch
      </text>
      <rect x="500" y="180" width="60" height="40" fill="#b3b3b3" rx="5" />
      <text x="530" y="205" fontSize="14" fontWeight="bold" fill="white">
        S₁
      </text>
      <rect x="500" y="240" width="60" height="40" fill="#b3b3b3" rx="5" />
      <text x="530" y="265" fontSize="14" fontWeight="bold" fill="white">
        Maj
      </text>
      <rect x="500" y="300" width="60" height="40" fill="#b3b3b3" rx="5" />
      <text x="530" y="325" fontSize="14" fontWeight="bold" fill="white">
        S₀
      </text>

      {/* Adders */}
      <circle cx="580" cy="140" r="20" fill="#f4c542" />
      <text x="580" y="145" fontSize="16" fontWeight="bold" fill="black" textAnchor="middle">
        +
      </text>
      <circle cx="640" cy="200" r="20" fill="#f4c542" />
      <text x="640" y="205" fontSize="16" fontWeight="bold" fill="black" textAnchor="middle">
        +
      </text>

      {/* Result of round i */}
      <text x="50" y="440" fontSize="16" fontWeight="bold" fill="#d65a5a">
        Result of round i
      </text>
      {["B", "C", "D", "E", "F", "G", "H", "A"].map((label, index) => (
        <rect
          key={label}
          x={100 + index * 80}
          y={400}
          width="40"
          height="40"
          fill="#f78c82"
          stroke="#d65a5a"
          rx="5"
        />
      ))}
      {["B", "C", "D", "E", "F", "G", "H", "A"].map((label, index) => (
        <text
          key={label}
          x={120 + index * 80}
          y={425}
          fontSize="16"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}

      {/* Connecting Lines */}
      <line x1="120" y1="100" x2="120" y2="400" stroke="#000" strokeWidth="2" />
      {/* Repeat for all connections */}
    </svg>
  );
};

export default CryptoRound;
