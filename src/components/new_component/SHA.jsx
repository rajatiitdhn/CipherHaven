import React, { useState } from "react";
import AESConstants from "./AESconstants";
import CryptoRound from "./CryptoRound";

const SHA = () => {
    const [algorithm, setAlgorithm] = useState("SHA-256");
    const [feedback, setFeedback] = useState("");
    const [text, setText] = useState("");
    const [paddedMessage1, setPaddedMessage] = useState("");

    const evaluateSetup = async () => {
        try {
            // Convert the input text to a Uint8Array
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
    
            // Use SubtleCrypto to compute the hash
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    
            // Convert the hash buffer to a hexadecimal string
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    
            // Set the computed hash as feedback
            setFeedback(hashHex);
        } catch (error) {
            setFeedback("Error computing hash.");
        }
    };
    

    const normalizeMessage = () => {
        // Convert each character to its hexadecimal representation
        const messageHex = text
            .split("")
            .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
    
        const messageLength = messageHex.length * 4; // Each hex digit represents 4 bits
    
        // Step 1: Add a single '80' (hex equivalent of binary '10000000')
        let paddedMessage = messageHex + "80";
    
        // Step 2: Add zeros to make the length a multiple of 512 bits (128 hex digits)
        while ((paddedMessage.length * 4 + 64) % 512 !== 0) {
            paddedMessage += "00";
        }
        console.log(messageLength)
    
        // Step 3: Append the original message length as a 64-bit integer in hex
        const lengthHex = messageLength.toString(16).padStart(16, "0");
        paddedMessage += lengthHex;
    
        setPaddedMessage(paddedMessage);
    };
    
    

    const SplitMessage = ({ message, lengthBits }) => {
    const toHex = (str) =>
        str
            .split("")
            .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");

    const hexMessage = toHex(message);
    const splitMessage = hexMessage.match(/.{1,2}/g) || [];

    return (
        <div className="mb-8 m-16">
            <p className="text-lg text-gray-300 text-center mb-2">
                Your message in Hex
            </p>
            <div className="grid grid-cols-8 gap-2">
                {splitMessage.map((chunk, index) => (
                    <span
                        key={index}
                        className={`text-xl font-mono ${
                            index >= splitMessage.length - lengthBits / 8
                                ? "text-red-500"
                                : "text-white"
                        }`}
                    >
                        {chunk}
                    </span>
                ))}
            </div>
        </div>
    );
};


const SplitMessage2 = ({ message, lengthBits }) => {
   
    const hexMessage = (message);
    lengthBits = 64
    const splitMessage = hexMessage.match(/.{1,2}/g) || [];

    return (
        <div className="mb-8 m-16">
            <p className="text-lg text-gray-300 text-center mb-2">
                Your message in Hex
            </p>
            <div className="grid grid-cols-8 gap-2">
                {splitMessage.map((chunk, index) => (
                    <span
                        key={index}
                        className={`text-xl font-mono ${
                            index >= splitMessage.length - lengthBits / 8
                                ? "text-red-500"
                                : "text-white"
                        }`}
                    >
                        {chunk}
                    </span>
                ))}
            </div>
        </div>
    );
};
    return (
        <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
            <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6 transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl font-bold text-teal-400 mb-6 text-center glow-text">
                    SHA Visualization
                </h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                        Enter Text
                    </label>
                    <textarea
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            normalizeMessage();
                        }}
                        placeholder="Enter text to hash"
                    />
                </div>

                <button
                    className="w-full bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-all ease-in-out duration-200 transform hover:scale-105"
                    onClick={evaluateSetup}
                >
                    HASH IT!
                </button>

                <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600">
                    <strong className="text-gray-300">HASH Feedback:</strong>
                    <p className="text-white">{feedback}</p>
                </div>

                <div className="mt-8 bg-gray-900 p-6  rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-teal-400 mb-4 text-center">
                        SHA Normalization Visualization
                    </h2>

                    {/* Input Message in Hex */}
                    <SplitMessage message={text} />

                    {/* Arrow */}
                    <div className="flex justify-center mb-8">
                        <span className="text-gray-400 text-xl">↓</span>
                    </div>

                    {/* Normalized Message */}
                    <SplitMessage2 message={paddedMessage1}  lengthBits={64} />
                    <div>
                        <AESConstants/>
                        <div className="mt-8 p-6 bg-gray-900 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-teal-400 mb-4">
                        Calculation Process
                    </h2>
                    <p className="text-gray-300 mb-4">
                        After preparing all constants, words, and initial hash values, we begin the main calculation process.
                    </p>
                    <p className="text-gray-300 mb-4">
                        During the computation, we work with 8 variables: <span className="text-teal-400">A, B, C, D, E, F, G, H</span>. These variables are initialized with the hash values <span className="text-teal-400">h0</span> through <span className="text-teal-400">h7</span>. In each of the 64 rounds, we calculate 6 additional variables:
                        <span className="text-teal-400"> S1, ch, t1, S0, maj</span>, and <span className="text-teal-400">t2</span>.
                    </p>

                    <div className="mt-4 p-4 bg-gray-800 rounded-md">
                        <h3 className="text-lg font-bold text-teal-400 mb-4">Round Calculations</h3>
                        <div className="flex flex-col gap-5">
                        <pre className="bg-gray-900 p-4 overflow-hidden rounded-md text-teal-400">
                            <div>
                                S1  = (Ei-1 ⋙ 6) ⊕ (Ei-1 ⋙ 11) ⊕ (Ei-1 ⋙ 25) <br/>
                                ch  = (Ei-1 & Fi-1) ⊕ ((¬Ei-1) & Gi-1) <br />
                                t1  = Hi-1 + S1 + ch + ki + wi <br />
                                S0  = (Ai-1 ⋙ 2) ⊕ (Ai-1 ⋙ 13) ⊕ (Ai-1 ⋙ 22) <br />
                                maj = (Ai-1 & Bi-1) ⊕ (Ai-1 & Ci-1) ⊕ (Bi-1 & Ci-1) <br />
                                t2  = S0 + maj <br />
                            </div>

                            
                        </pre>
                        <pre className="bg-gray-900 p-4 rounded-md  text-teal-400">
                            
                            <div>
                                Hi  = Gi-1 <br />
                                Gi  = Fi-1 <br />
                                Fi  = Ei-1 <br />
                                Ei  = Di-1 + t1 <br />
                                Di  = Ci-1 <br />
                                Ci  = Bi-1 <br />
                                Bi  = Ai-1 <br />
                                Ai  = t1 + t2
                            </div>
                        </pre>
                        </div>
                        <p className="text-gray-300 mt-4">
                            Here:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 mb-4">
                            <li><span className="text-teal-400">⋙</span>: Right rotation (circular shift of bits)</li>
                            <li><span className="text-teal-400">⊕</span>: XOR operation</li>
                            <li><span className="text-teal-400">&</span>: Bitwise AND</li>
                            <li><span className="text-teal-400">¬</span>: Bitwise NOT</li>
                        </ul>
                    </div>

                    <p className="text-gray-300 mb-4">
                        All variables remain 32-bit long, so all summations are calculated modulo <span className="text-teal-400">2<sup>32</sup></span>.
                    </p>

                    <h3 className="text-lg font-bold text-teal-400 mb-4">Final Steps</h3>
                    <p className="text-gray-300 mb-4">
                        After completing 64 rounds, the resulting values of <span className="text-teal-400">A, B, C, D, E, F, G,</span> and <span className="text-teal-400">H</span> are added to the initial hash variables <span className="text-teal-400">h0</span> through <span className="text-teal-400">h7</span>. This process repeats for all chunks of the input data. Finally, the hash variables are concatenated to produce the final hash.
                    </p>
                        <CryptoRound/>
                </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SHA;
