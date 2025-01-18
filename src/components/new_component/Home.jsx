import React, { useState, useEffect } from 'react';
import { ShieldCheckIcon, PuzzleIcon, TerminalIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/outline'; // Updated import with StarIcon

const Home = () => {
  const [cipherText, setCipherText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [selectedTab, setSelectedTab] = useState('caesar');
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState("Analyze it!");

  const HandleBlur = () => {
    setIsLoaded(true);
  }

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
    }, 200); // Type one character every 200ms

    return () => clearInterval(typingEffect); // Cleanup interval on component unmount
  }, []);

  const handleAnalysis = () => {
    setAnalysisResult(`Analyzing Cipher Text: ${cipherText}`);
  };

  return (
    <>
      <div onClick={HandleBlur} className={`flex bg-gray-900 text-green-500 min-h-screen font-mono ${isLoaded ? 'blur-none' : 'blur-[8px] '}`}>
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-800 p-5 shadow-xl rounded-xl">
          <h2 className="text-2xl text-center font-bold text-teal-400 glow-text">Cryptography Tests</h2>
          <div className="mt-6 space-y-4">
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 ${selectedTab === 'RSA' ? 'bg-teal-700' : 'bg-gray-700'} border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab('RSA')}
            >
              <ShieldCheckIcon className="w-5 h-5 inline-block mr-2" />
              Interactive Cryptographic Visualizations
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 ${selectedTab === 'SHA-256' ? 'bg-teal-700' : 'bg-gray-700'} border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab('SHA-256')}
            >
              <PuzzleIcon className="w-5 h-5 inline-block mr-2" />
              Vulnerability Scanner
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 ${selectedTab === 'Attack Simulation Lab' ? 'bg-teal-700' : 'bg-gray-700'} border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab('Attack Simulation Lab')}
            >
              <TerminalIcon className="w-5 h-5 inline-block mr-2" />
              Attack Simulation Lab
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 ${selectedTab === 'Best Practices Checker' ? 'bg-teal-700' : 'bg-gray-700'} border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab('Best Practices Checker')}
            >
              <CheckCircleIcon className="w-5 h-5 inline-block mr-2" />
              Best Practices Checker
            </button>
            <button
              className={`w-full py-2 text-left px-4 rounded-lg text-teal-300 ${selectedTab === 'Gamified Challenge' ? 'bg-teal-700' : 'bg-gray-700'} border-2 border-teal-300 transition-all duration-300 ease-out transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50 shadow-md hover:shadow-xl`}
              onClick={() => setSelectedTab('Gamified Challenge')}
            >
              <StarIcon className="w-5 h-5 inline-block mr-2" />
              Gamified Challenge
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-teal-400">Cryptography Analysis</h1>
            <p className="text-xl mt-4 text-gray-400">Decrypt, Encrypt, and Analyze Ciphers</p>
          </header>

          <main className="mt-10">
            {/* Blur screen and typing text effect */}
            {isLoaded && (
              <div>
                {selectedTab === 'SHA-256' && (
                  <p className="text-teal-300 text-xl">SHA-256 Analysis</p>
                )}

                {selectedTab === 'RSA' && (
                  <p className="text-teal-300 text-xl">RSA Analysis</p>
                )}

                {selectedTab === 'Attack Simulation Lab' && (
                  <p className="text-teal-300 text-xl">Attack Simulation Lab</p>
                )}
                
                {selectedTab === 'Gamified Challenge' && (
                  <p className="text-teal-300 text-xl">Gamified Challenge</p>
                )}
              </div>
            )}
          </main>
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
