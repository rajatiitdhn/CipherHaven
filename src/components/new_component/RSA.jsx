import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';

const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const gcd = (a, b) => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const modInverse = (e, phi) => {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    if (phi === 1) return 0;

    while (e > 1) {
        q = Math.floor(e / phi);
        t = phi;

        phi = e % phi;
        e = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0) x1 += m0;

    return x1;
};

const RSAVizualizer = () => {
    const [plaintext, setPlaintext] = useState('');
    const [p, setP] = useState('');
    const [q, setQ] = useState('');
    const [e, setE] = useState('');
    const [errors, setErrors] = useState({ p: '', q: '', e: '' });
    const [results, setResults] = useState(null);
    const [showStep, setShowStep] = useState(0);

    const validateInputs = () => {
        const newErrors = { p: '', q: '', e: '' };

        if (!isPrime(Number(p))) newErrors.p = 'P must be a prime number.';
        if (!isPrime(Number(q))) newErrors.q = 'Q must be a prime number.';
        const phi = (Number(p) - 1) * (Number(q) - 1);
        if (Number(e) <= 1 || Number(e) >= phi || gcd(Number(e), phi) !== 1) {
            newErrors.e = 'E must be greater than 1, less than (P-1)*(Q-1), and coprime with it.';
        }

        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleSubmit = () => {
        if (validateInputs()) {
            const n = Number(p) * Number(q);
            const phiN = (Number(p) - 1) * (Number(q) - 1);
            const plaintextHex = plaintext.split('').map((char) => char.charCodeAt(0).toString(16)).join('');
            const plaintextNum = BigInt(`0x${plaintextHex}`);
            const encrypted = BigInt(plaintextNum) ** BigInt(e) % BigInt(n);
            const d = modInverse(Number(e), phiN);

            const steps = [
                { label: 'Step 1: Calculate N', value: `N = ${n}` },
                { label: 'Step 2: Calculate Phi(N)', value: `Phi(N) = ${phiN}` },
                { label: 'Step 3: Convert Plaintext to Hex', value: `Hex = ${plaintextHex}` },
                { label: 'Step 4: Convert Hex to Number', value: `Number = ${plaintextNum}` },
                { label: 'Step 5: Encrypt Message', value: `Encrypted = ${encrypted}` },
                { label: 'Step 6: Calculate Decryption Key', value: `D = ${d}` }
            ];

            setResults(steps);
            setShowStep(1);
        }
    };

    const nextStep = () => {
        if (showStep < results.length) setShowStep(showStep + 1);
    };

    // Nodes and edges for flowchart (Vertically aligned)
    const nodes = results
        ? results.slice(0, showStep).map((step, index) => ({
              id: `${index}`,
              data: { label: `${step.label}: ${step.value}` },
              position: { x: 300, y: 100 * index },  // Vertically aligned
              style: { 
                  background: '#2f4f4f', 
                  color: 'white', 
                  padding: 20, 
                  borderRadius: 10,
                  width: 400,  // Fixed width
                  fontSize: '18px',
                  fontWeight: 'bold',
                  textAlign: 'center',
              },
          }))
        : [];

    const edges = results
        ? results.slice(0, showStep - 1).map((_, index) => ({
              id: `e${index}`,
              source: `${index}`,
              target: `${index + 1}`,
              animated: true,
              style: { stroke: '#ff8c00', strokeWidth: 2 },
          }))
        : [];

    return (
        <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
            <div className="max-w-3xl mx-auto bg-gray-800 shadow-2xl rounded-lg p-6">
                <h1 className="text-4xl font-bold text-teal-400 mb-6 text-center glow-text">RSA Visualizer</h1>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">Plaintext:</label>
                    <input
                        type="text"
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">P (Prime):</label>
                    <input
                        type="number"
                        value={p}
                        onChange={(e) => setP(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out"
                        placeholder="Enter a prime number"
                    />
                    {errors.p && <div className="text-red-500 mt-2">{errors.p}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">Q (Prime):</label>
                    <input
                        type="number"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out"
                        placeholder="Enter a prime number"
                    />
                    {errors.q && <div className="text-red-500 mt-2">{errors.q}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-300">E:</label>
                    <input
                        type="number"
                        value={e}
                        onChange={(e) => setE(e.target.value)}
                        className="w-full mt-1 p-3 border border-gray-600 rounded-md shadow-sm focus:ring-teal-400 focus:border-teal-400 text-gray-300 bg-gray-700 hover:bg-gray-600 transition duration-300 ease-in-out"
                    />
                    {errors.e && <div className="text-red-500 mt-2">{errors.e}</div>}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-teal-500 text-white py-3 px-4 rounded hover:bg-teal-600 transition-all ease-in-out duration-200"
                >
                    Submit
                </button>

                {results && (
                    <div className="mt-6 p-4 bg-gray-700 rounded-md border border-gray-600">
                        <h2 className="text-3xl font-bold text-gray-300 text-center mb-6">Steps Flowchart</h2>
                        <div style={{ height: 500 }}>
                            <ReactFlow nodes={nodes} edges={edges} />
                        </div>

                        {showStep < results.length && (
                            <button
                                onClick={nextStep}
                                className="mt-4 w-full bg-teal-500 text-white py-3 px-4 rounded hover:bg-teal-600 transition-all ease-in-out duration-200"
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RSAVizualizer;
