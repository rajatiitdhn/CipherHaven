import React, { useState } from "react";

const SHA256Constants = () => {
    // SHA-256 Constants
    const hConstants = [
        "0x6a09e667", "0xbb67ae85", "0x3c6ef372", "0xa54ff53a",
        "0x510e527f", "0x9b05688c", "0x1f83d9ab", "0x5be0cd19",
    ];

    const kConstants = [
        "0x428a2f98", "0x71374491", "0xb5c0fbcf", "0xe9b5dba5",
        "0x3956c25b", "0x59f111f1", "0x923f82a4", "0xab1c5ed5",
        "0xd807aa98", "0x12835b01", "0x243185be", "0x550c7dc3",
        "0x72be5d74", "0x80deb1fe", "0x9bdc06a7", "0xc19bf174",
        "0xe49b69c1", "0xefbe4786", "0x0fc19dc6", "0x240ca1cc",
        "0x2de92c6f", "0x4a7484aa", "0x5cb0a9dc", "0x76f988da",
        "0x983e5152", "0xa831c66d", "0xb00327c8", "0xbf597fc7",
        "0xc6e00bf3", "0xd5a79147", "0x06ca6351", "0x14292967",
        "0x27b70a85", "0x2e1b2138", "0x4d2c6dfc", "0x53380d13",
        "0x650a7354", "0x766a0abb", "0x81c2c92e", "0x92722c85",
        "0xa2bfe8a1", "0xa81a664b", "0xc24b8b70", "0xc76c51a3",
        "0xd192e819", "0xd6990624", "0xf40e3585", "0x106aa070",
        "0x19a4c116", "0x1e376c08", "0x2748774c", "0x34b0bcb5",
        "0x391c0cb3", "0x4ed8aa4a", "0x5b9cca4f", "0x682e6ff3",
        "0x748f82ee", "0x78a5636f", "0x84c87814", "0x8cc70208",
        "0x90befffa", "0xa4506ceb", "0xbef9a3f7", "0xc67178f2",
    ];

    const [hIndex, setHIndex] = useState(0);
    const [kIndex, setKIndex] = useState(0);

    // Handlers for navigation
    const navigateH = (direction) => {
        setHIndex((prev) => (direction === "next" ? (prev + 1) % hConstants.length : (prev - 1 + hConstants.length) % hConstants.length));
    };

    const navigateK = (direction) => {
        setKIndex((prev) => (direction === "next" ? (prev + 1) % kConstants.length : (prev - 1 + kConstants.length) % kConstants.length));
    };

    return (
        <div className="p-8  from-gray-900  font-['Roboto_Mono']">
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">
                    SHA-256 Constants
                </h1>

                {/* Horizontal Boxes */}
                <div className="grid grid-cols-2 gap-6">
                    {/* H Constants */}
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-teal-400 text-center mb-4">
                            H Constants
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigateH("prev")}
                                className="text-white bg-gray-700 p-1 rounded hover:bg-gray-600"
                            >
                                ◀
                            </button>
                            <p className="text-2xl text-white font-mono">
                                {hConstants[hIndex]}
                            </p>
                            <button
                                onClick={() => navigateH("next")}
                                className="text-white bg-gray-700 p-1 rounded hover:bg-gray-600"
                            >
                                ▶
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 text-center mt-2">
                            Index: {hIndex}
                        </p>
                    </div>

                    {/* K Constants */}
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-teal-400 text-center mb-4">
                            K Constants
                        </h2>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => navigateK("prev")}
                                className="text-white bg-gray-700 p-1 rounded hover:bg-gray-600"
                            >
                                ◀
                            </button>
                            <p className="text-2xl text-white font-mono">
                                {kConstants[kIndex]}
                            </p>
                            <button
                                onClick={() => navigateK("next")}
                                className="text-white bg-gray-700 p-1 rounded hover:bg-gray-600"
                            >
                                ▶
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 text-center mt-2">
                            Index: {kIndex}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SHA256Constants;
