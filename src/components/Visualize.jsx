import React, { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  PuzzleIcon,
  TerminalIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/outline"; // Updated import with StarIcon
import HashingAnalysis from "./HashingAnalysis";
import Encryptionanalysis from "./new_component/Encryptionanalysis";
import RSAVizualizer from "./new_component/RSA";

const Visualize = () => {
  const [cipherText, setCipherText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [selectedTab, setSelectedTab] = useState("caesar");
 

  const handleAnalysis = () => {
    setAnalysisResult(`Analyzing Cipher Text: ${cipherText}`);
  };

  return (
    <>
      <div className={`flex bg-gray-900 text-green-500 min-h-screen font-mono`}>
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-800 p-5 shadow-xl rounded-xl">
          <h2 className="text-2xl text-center font-bold text-teal-400 glow-text">
            Cryptography Visualization
          </h2>
          <div className="mt-6 space-y-5">
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 text-lg ${
                selectedTab === "RSA" ? "bg-teal-700" : "bg-gray-700"
              } border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("RSA")}
            >
              <ShieldCheckIcon className="w-5 h-5 inline-block mr-2" />
              RSA Visualization
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 text-lg ${
                selectedTab === "SHA-256" ? "bg-teal-700" : "bg-gray-700"
              } border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("SHA-256")}
            >
              <PuzzleIcon className="w-5 h-5 inline-block mr-2" />
              HashingAnalysis
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-teal-400">
              Cryptography Analysis
            </h1>
            <p className="text-xl mt-4 text-gray-400">
              Decrypt, Encrypt, and Analyze Ciphers
            </p>
          </header> 

          <main className="mt-10">
            <div>
              {selectedTab === "SHA-256" && <HashingAnalysis />}

              {selectedTab === "RSA" && <RSAVizualizer />}

              {selectedTab === "AES" && <Encryptionanalysis />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Visualize;
