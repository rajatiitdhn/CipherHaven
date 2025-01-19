import React, { useState } from "react";

const Rsaanalysis = () => {
  const [n, setN] = useState("");
  const [e, setE] = useState("");
  const [c, setC] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFactorable = (n) => {
    const num = parseInt(n, 10);
    if (isNaN(num) || num <= 1) return false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return true; // Found a factor
    }
    return false; // No factors found
  };
  function smalle(c) {
    let i = 100;

    while (i < 2000) {
      // Set precision
      let cubeRoot = Math.round(Math.cbrt(c));

      // Convert to hex and remove 0x
      let hexStr = cubeRoot.toString(16);

      try {
        // Decode hex to string
        let dehex = Buffer.from(hexStr, "hex").toString();
        let flag = Buffer.from(dehex, "utf8").toString();

        if (/^[a-zA-Z0-9]+$/.test(flag)) {
          return flag;
          break;
        }
      } catch (e) {
        // Handle errors silently
      }

      i++;
    }
  }

  const isSmallEAttackPossible = (e) => {
    const smallEValues = [
      3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
    ]; // Extended common small e values
    return smallEValues.includes(parseInt(e, 10));
  };

  const validateInputs = () => {
    const nInt = parseInt(n, 10);
    const eInt = parseInt(e, 10);

    if (isNaN(nInt) || nInt <= 1) {
      return "Invalid modulus (n). It must be a positive integer greater than 1.";
    }
    if (isNaN(eInt) || eInt <= 1) {
      return "Invalid public exponent (e). It must be a positive integer greater than 1.";
    }
    if (
      !c
        .split(",")
        .every(
          (cipher) =>
            !isNaN(parseInt(cipher.trim(), 10)) &&
            parseInt(cipher.trim(), 10) > 0
        )
    ) {
      return "Invalid ciphertext (c). It must be a comma-separated list of positive integers.";
    }

    return null;
  };

  const evaluateVulnerabilities = () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setFeedback("");

    setTimeout(() => {
      const isNFactorable = isFactorable(n);
      const isSmallE = isSmallEAttackPossible(e);

      let result = "RSA Analysis Results:\n";
      result += `Modulus (n): ${
        isNFactorable ? "Factorable (Weak)" : "Not easily factorable"
      }\n`;
      result += `Public Exponent (e): ${
        isSmallE
          ? "Vulnerable to small e attack"
          : "Not vulnerable to small e attack"
      }\n`;
      result += `Ciphertext (c): ${
        c.trim().length > 0
          ? "Ciphertext provided for analysis"
          : "No ciphertext provided"
      }`;

      setFeedback(result);
      setLoading(false);
    }, 500); // Simulate processing delay
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">
          RSA Vulnerability Analysis
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Modulus (n):
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="Enter modulus n"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Public Exponent (e):
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={e}
            onChange={(e) => setE(e.target.value)}
            placeholder="Enter public exponent e"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Ciphertext (c):
          </label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="Enter ciphertext(s) c, separated by commas if multiple"
          />
        </div>

        <button
          className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-all ease-in-out duration-200 transform hover:scale-105"
          onClick={evaluateVulnerabilities}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Evaluate Vulnerabilities"}
        </button>

        <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600">
          <strong className="text-gray-300">Feedback:</strong>
          {loading ? (
            <div className="mt-2 text-teal-500">
              Analyzing the RSA configuration...
            </div>
          ) : (
            <pre className="mt-2 text-green-400 whitespace-pre-wrap">
              {feedback}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rsaanalysis;
