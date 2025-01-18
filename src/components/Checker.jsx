import React, { useState } from 'react';
import axios from 'axios';

function Checker() {
  const [config, setConfig] = useState({
    rsaKeySize: 2048,
    aesKeySize: 256,
    tlsVersion: 'TLS 1.2',
    hashFunction: 'SHA256',
    cipherSuite: 'AES256-GCM',
  });

  const [status, setStatus] = useState('');
  const [issues, setIssues] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const validateConfig = async () => {
    try {
      const response = await axios.post('http://localhost:5000/validate', { config });
      setStatus(response.data.status);
      setIssues([]);
    } catch (error) {
      setStatus(error.response.data.status);
      setIssues(error.response.data.issues);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-4xl font-bold text-teal-400 mb-6 text-center">
        Cryptographic Best Practices Checker
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl text-yellow-400 mb-4">Configure Your Cryptographic Settings:</h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-300">RSA Key Size (bits):</label>
            <input
              type="number"
              name="rsaKeySize"
              value={config.rsaKeySize}
              onChange={handleChange}
              className="mt-2 p-2 bg-gray-800 text-white rounded-md w-1/2"
            />
          </div>
          <div>
            <label className="text-gray-300">AES Key Size (bits):</label>
            <input
              type="number"
              name="aesKeySize"
              value={config.aesKeySize}
              onChange={handleChange}
              className="mt-2 p-2 bg-gray-800 text-white rounded-md w-1/2"
            />
          </div>
          <div>
            <label className="text-gray-300">TLS Version:</label>
            <select
              name="tlsVersion"
              value={config.tlsVersion}
              onChange={handleChange}
              className="mt-2 p-2 bg-gray-800 text-white rounded-md w-1/2"
            >
              <option value="TLS 1.0">TLS 1.0</option>
              <option value="TLS 1.1">TLS 1.1</option>
              <option value="TLS 1.2">TLS 1.2</option>
              <option value="TLS 1.3">TLS 1.3</option>
            </select>
          </div>
          <div>
            <label className="text-gray-300">Hash Function:</label>
            <select
              name="hashFunction"
              value={config.hashFunction}
              onChange={handleChange}
              className="mt-2 p-2 bg-gray-800 text-white rounded-md w-1/2"
            >
              <option value="SHA1">SHA1</option>
              <option value="SHA256">SHA256</option>
              <option value="SHA512">SHA512</option>
            </select>
          </div>
          <div>
            <label className="text-gray-300">Cipher Suite:</label>
            <select
              name="cipherSuite"
              value={config.cipherSuite}
              onChange={handleChange}
              className="mt-2 p-2 bg-gray-800 text-white rounded-md w-1/2"
            >
              <option value="RC4-SHA">RC4-SHA</option>
              <option value="AES128-GCM">AES128-GCM</option>
              <option value="AES256-GCM">AES256-GCM</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={validateConfig}
        className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Validate Configuration
      </button>

      <div className="mt-8">
        {status && (
          <h3 className={`text-xl ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {status === 'error' ? 'Issues Found' : 'Secure Configuration'}
          </h3>
        )}

        {issues.length > 0 && (
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            {issues.map((issue, index) => (
              <li key={index} className="text-red-500">{issue}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Checker;
