import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Freq from './Freq';
const Home = () => {
  const [cipherText, setCipherText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [selectedTab, setSelectedTab] = useState('caesar');
  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState("Analyze it!");
    const HandleBlur=()=>{
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
      <div className="w-64 bg-gray-800 p-5">
        <h2 className="text-2xl text-center font-bold text-green-400">Cryptography Tests</h2>
        <div className="mt-6">
          <button
            className={`w-full py-2 text-left px-4 rounded-lg ${selectedTab === 'caesar' ? 'bg-green-700' : 'bg-gray-700'}`}
            onClick={() => setSelectedTab('caesar')}
          >
            Caesar Cipher
          </button>
          <button
            className={`w-full py-2 text-left px-4 rounded-lg mt-2 ${selectedTab === 'vigenere' ? 'bg-green-700' : 'bg-gray-700'}`}
            onClick={() => setSelectedTab('vigenere')}
          >
            Vigenère Cipher
          </button>
          <Button name={'aes'} setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-green-400">Cryptography Analysis</h1>
          <p className="text-xl mt-4 text-gray-400">Decrypt, Encrypt, and Analyze Ciphers</p>
        </header>

        <main className="mt-10">
          {/* Blur screen and typing text effect */}
          

          {isLoaded && (
            <div>
              {selectedTab === 'caesar' && (
                <div>
                  <h2 className="text-3xl text-center text-gray-300">Caesar Cipher Test</h2>
                  <div className="mt-6">
                    <label htmlFor="cipherInput" className="block text-lg text-gray-400">Enter Cipher Text:</label>
                    <textarea
                      id="cipherInput"
                      className="w-full bg-gray-800 text-green-500 p-3 mt-2 rounded-lg"
                      rows="4"
                      value={cipherText}
                      onChange={(e) => setCipherText(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleAnalysis}
                      className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg"
                    >
                      Analyze
                    </button>
                  </div>
                  {analysisResult && (
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg text-gray-300">
                      <h3 className="text-xl">Analysis Result:</h3>
                      <p>{analysisResult}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'vigenere' && (
                <div>
                  <h2 className="text-3xl text-center text-gray-300">Vigenère Cipher Test</h2>
                  <div className="mt-6">
                    <label htmlFor="cipherInput" className="block text-lg text-gray-400">Enter Cipher Text:</label>
                    <textarea
                      id="cipherInput"
                      className="w-full bg-gray-800 text-green-500 p-3 mt-2 rounded-lg"
                      rows="4"
                      value={cipherText}
                      onChange={(e) => setCipherText(e.target.value)}
                    ></textarea>
                    <button
                      onClick={handleAnalysis}
                      className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg"
                    >
                      Analyze
                    </button>
                  </div>
                  {analysisResult && (
                    <div className="mt-6 bg-gray-800 p-4 rounded-lg text-gray-300">
                      <h3 className="text-xl">Analysis Result:</h3>
                      <p>{analysisResult}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'aes' && (
                <Freq/>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
    <div className='absolute top-1/2 left-1/2 z-10'>
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
