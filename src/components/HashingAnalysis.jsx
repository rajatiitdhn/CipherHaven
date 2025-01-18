import React, { useState } from "react";

const HashingAnalysis = () => {
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [feedback, setFeedback] = useState("");
  const [text, setText] = useState("");

  const evaluateSetup = () => {
    let risks = [];

    // Check vulnerabilities based on the selected SHA algorithm
    switch (algorithm) {
      case "SHA-1":
        risks.push(
          "SHA-1 is considered insecure due to successful collision attacks. Avoid using it."
        );
        break;
      case "MD5":
        risks.push(
          "MD5 is insecure due to collision and pre-image attacks. It should never be used for security purposes."
        );
        break;
      case "MD2":
        risks.push(
          "MD2 is insecure due to collision and pre-image attacks. It should never be used for security purposes."
        );
        break;
      case "SHA-224":
        risks.push(
          "SHA-224 is relatively secure but has limited use cases due to its smaller output size."
        );
        break;
      case "SHA-256":
        risks.push("SHA-256 is secure and widely recommended for general use.");
        break;
      case "SHA-384":
      case "SHA-512":
        risks.push(
          "SHA-384 and SHA-512 are secure and suitable for high-security environments."
        );
        break;
      default:
        risks.push(
          "Unknown algorithm. Ensure you're using a secure and recognized hashing standard."
        );
    }
    // Check algorithm
    if (algorithm === "MD2" || algorithm === "SHA-1") {
      risks.push(
        `${algorithm} is deprecated and highly vulnerable to brute force attacks.`
      );
    }

    // Set feedback
    setFeedback(risks.join(" "));
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">
          SHA Vulnerability Analysis
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
          Hashing Algorithm:
          </label>
          <select
            className="w-full mt-1 p-2 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
           <option value="SHA-1">SHA-1</option>
            <option value="MD2">MD2</option>
            <option value="MD5">MD5</option>
            <option value="SHA-224">SHA-224</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Encrypted Text</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter encrypted text"
          />
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
              feedback.includes("insecure") || feedback.includes("collision")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {feedback}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HashingAnalysis;
