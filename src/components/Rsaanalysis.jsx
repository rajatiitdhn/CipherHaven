import React, { useState } from "react";

const Rsaanalysis = () => {
  const [n, setN] = useState("");
  const [e, setE] = useState("");
  const [c, setC] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const evaluateVulnerabilities = async () => {
    if (!n || !e || !c) {
      setError("All fields (n, e, c) are required.");
      return;
    }

    setLoading(true);
    setError("");
    setFeedback("");

    try {
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ n, e, c }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();

      setFeedback(data.feedback || "Analysis complete. Check the response for details.");
    } catch (err) {
      setError(err.message || "An error occurred while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">RSA Vulnerability Analysis</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Modulus (n):</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="Enter modulus n"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Public Exponent (e):</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={e}
            onChange={(e) => setE(e.target.value)}
            placeholder="Enter public exponent e"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Ciphertext (c):</label>
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
            <div className="mt-2 text-teal-500">Analyzing the RSA configuration...</div>
          ) : (
            <p
              className={`mt-2 ${
                feedback.includes("feasible") || feedback.includes("vulnerable")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rsaanalysis;
