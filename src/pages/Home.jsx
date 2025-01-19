import React, { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  PuzzleIcon,
  TerminalIcon,
  CheckCircleIcon,
  StarIcon,
  ScaleIcon,
} from "@heroicons/react/outline"; // Updated import with StarIcon
import Scanner from "../components/Scanner";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [cipherText, setCipherText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [selectedTab, setSelectedTab] = useState("caesar");
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState("Analyze it!");

  const HandleBlur = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const words = ["Analyze it!", "Decrypt it!", "Crack it!", "Test it!"];
    let wordIndex = 0;
    let charIndex = 0;

    const typingEffect = setInterval(() => {
      setText(words[wordIndex].substring(0, charIndex));
      charIndex += 1;
      if (charIndex > words[wordIndex].length) {
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
      }
    }, 100); // Type one character every 100ms

    return () => clearInterval(typingEffect); // Cleanup interval on component unmount
  }, []);

  const handleAnalysis = () => {
    setAnalysisResult(`Analyzing Cipher Text: ${cipherText}`);
  };

  return (
    <>
      <div
        onClick={HandleBlur}
        className={`flex bg-gray-900 text-green-500 min-h-screen font-mono ${
          isLoaded ? "blur-none" : "blur-[8px]"
        }`}
      >
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-800 p-5 shadow-xl rounded-xl">
          <h2 className="text-2xl text-center font-bold text-teal-400 glow-text">
            Cryptography Tests
          </h2>
          <div className="mt-6 space-y-5">
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-red-300 text-lg ${
                selectedTab === "RSA" ? "bg-red-700" : "bg-gray-700"
              } border-2 border-red-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("Interactive Cryptographic Visualizations")}
            >
              <ShieldCheckIcon className="w-5 h-5 inline-block mr-2" />
              <NavLink to="/visualize">Interactive Cryptographic Visualizations</NavLink>
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-blue-300 text-lg ${
                selectedTab === "SHA-256" ? "bg-blue-700" : "bg-gray-700"
              } border-2 border-blue-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("Vulnerability Scanner")}
            >
              <PuzzleIcon className="w-5 h-5 inline-block mr-2" />
              <NavLink to="/scanner">Vulnerability Scanner</NavLink>
              
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-yellow-300 text-lg ${
                selectedTab === "Attack Simulation Lab"
                  ? "bg-yellow-700"
                  : "bg-gray-700"
              } border-2 border-yellow-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
            >
              <TerminalIcon className="w-5 h-5 inline-block mr-2" />
              <NavLink to="/mitm"> Attack Simulation Lab</NavLink>
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-red-300 text-lg ${
                selectedTab === "Best Practices Checker"
                  ? "bg-red-700"
                  : "bg-gray-700"
              } border-2 border-red-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("Best Practices Checker")}
            >
              <CheckCircleIcon className="w-5 h-5 inline-block mr-2" />
              <NavLink to="/checker"> Best Practices Checker</NavLink>
            </button>

            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-blue-300 text-lg ${
                selectedTab === "Gamified Challenge"
                  ? "bg-blue-700"
                  : "bg-gray-700"
              } border-2 border-blue-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab("Gamified Challenge")}
            >
              <StarIcon className="w-5 h-5 inline-block mr-2" />
              <NavLink to="/game">Gamified Challenge</NavLink>
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

          <div className="flex-1 flex items-center justify-center">
  <h1 className="text-6xl font-extrabold text-teal-400 text-center ">
    Welcome to Crypto Haven
  </h1>
</div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 z-10">
        {!isLoaded && (
          <div className="absolute w-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-mono text-gray-300">
            <p className="text-1xl text-center">{text}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
