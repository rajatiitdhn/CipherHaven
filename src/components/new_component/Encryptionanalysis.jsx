import React, { useState } from 'react';

const Encryptionanalysis = () => {
  const [algorithm, setAlgorithm] = useState('AES');
  const [keyLength, setKeyLength] = useState(128);
  const [padding, setPadding] = useState('PKCS7');
  const [mode, setMode] = useState('CBC');
  const [feedback, setFeedback] = useState('');

  const evaluateSetup = () => {
    let risks = [];

    if (keyLength < 128) {
      risks.push("Key length is too short. Keys less than 128 bits are vulnerable to brute force attacks.");
    } else if (keyLength === 128) {
      risks.push("128-bit keys are secure but could become vulnerable to future computational advances.");
    } else if (keyLength > 256) {
      risks.push("Key lengths greater than 256 bits are often unnecessary and may reduce performance.");
    }

    if (algorithm === 'DES') {
      risks.push("DES is deprecated and highly vulnerable to brute force attacks.");
    } 
     if (algorithm === '3DES') {
      risks.push("3DES is no longer considered secure due to meet-in-the-middle attacks. It is also deprecated and highly vulnerable to brute force attacks.");
    }

    if (padding === 'None' && mode !== 'CTR' && mode !== 'CFB') {
      risks.push("No padding can lead to data truncation or other errors with block ciphers.");
    }

    if (mode === 'ECB') {
      risks.push("ECB mode is insecure because it reveals patterns in the plaintext.");
    }

    setFeedback(risks.length ? risks.join(' ') : 'Your configuration looks secure.');
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">Cryptographic Setup Simulator</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Encryption Algorithm:
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="AES">AES</option>
            <option value="RSA">RSA</option>
            <option value="3DES">3DES</option>
            <option value="DES">DES</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Key Length (bits):
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            value={keyLength}
            onChange={(e) => setKeyLength(parseInt(e.target.value))}
          >
            <option value={64}>64</option>
            <option value={128}>128</option>
            <option value={192}>192</option>
            <option value={256}>256</option>
            <option value={512}>512</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Padding Scheme:
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            value={padding}
            onChange={(e) => setPadding(e.target.value)}
          >
            <option value="PKCS7">PKCS7</option>
            <option value="ANSI X.923">ANSI X.923</option>
            <option value="ISO 10126">ISO 10126</option>
            <option value="None">None</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Mode of Operation:
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="CBC">CBC</option>
            <option value="ECB">ECB</option>
            <option value="CTR">CTR</option>
            <option value="CFB">CFB</option>
            <option value="GCM">GCM</option>
          </select>
        </div>

        <button
          className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-all ease-in-out duration-200 transform hover:scale-105"
          onClick={evaluateSetup}
        >
          Evaluate Configuration
        </button>

        <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600">
          <strong className="text-gray-300">Feedback:</strong>
          <p
            className={`mt-2 ${
              feedback.includes('vulnerable') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Encryptionanalysis;
