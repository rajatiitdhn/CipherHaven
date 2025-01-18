import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Natural frequency of letters in English (approximate)
const naturalFrequency = {
  'a': 8.167, 'b': 1.492, 'c': 2.782, 'd': 4.253, 'e': 12.702,
  'f': 2.228, 'g': 2.015, 'h': 6.094, 'i': 6.966, 'j': 0.153,
  'k': 0.772, 'l': 4.025, 'm': 2.406, 'n': 6.749, 'o': 7.507,
  'p': 1.929, 'q': 0.095, 'r': 5.987, 's': 6.327, 't': 9.056,
  'u': 2.758, 'v': 0.978, 'w': 2.360, 'x': 0.150, 'y': 1.974,
  'z': 0.074
};

const Freq = () => {
  const [cipherText, setCipherText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [chartData, setChartData] = useState({});

  const calculateFrequency = (text) => {
    const frequency = {};
    
    for (let char of text.toLowerCase()) {
      if (char.match(/[a-z]/)) { // Only consider alphabetic characters for frequency calculation
        frequency[char] = (frequency[char] || 0) + 1;
      }
    }
    return frequency;
  };

  const decodeText = (frequency) => {
    const sortedCipher = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    const sortedNatural = Object.entries(naturalFrequency).sort((a, b) => b[1] - a[1]);

    let mapping = {};
    for (let i = 0; i < sortedCipher.length; i++) {
      const cipherChar = sortedCipher[i][0];
      const naturalChar = sortedNatural[i][0];
      mapping[cipherChar] = naturalChar;
    }

    const decodedText = cipherText.toLowerCase().replace(/[^a-z]/g, '').split('').map(char => mapping[char] || char).join('');
    return decodedText;
  };

  const calculateSimilarity = (cipherFreq) => {
    let similarity = 0;
    const cipherTotal = Object.values(cipherFreq).reduce((sum, freq) => sum + freq, 0);

    for (let letter in cipherFreq) {
      const cipherPercent = (cipherFreq[letter] / cipherTotal) * 100;
      similarity += Math.abs(cipherPercent - naturalFrequency[letter]);
    }

    return 100 - similarity / 26; // Approximate percentage similarity
  };

  const handleAnalysis = () => {
    const frequency = calculateFrequency(cipherText);
    const decodedMessage = decodeText(frequency);
    const similarity = calculateSimilarity(frequency);

    setAnalysisResult(`Decoded Message: ${decodedMessage}\nSimilarity: ${similarity.toFixed(2)}%`);

    // Create chart data for the frequency distribution
    const chartLabels = Object.keys(frequency).sort();
    const chartValues = chartLabels.map(label => frequency[label]);

    setChartData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Cipher Text Frequency',
          data: chartValues,
          backgroundColor: 'rgba(75, 192, 192, 0.7)', // Vibrant color
          borderColor: 'rgba(75, 192, 192, 1)', // Vibrant border
          borderWidth: 2,
        },
        {
          label: 'Natural Frequency',
          data: chartLabels.map(label => naturalFrequency[label] || 0),
          backgroundColor: 'rgba(153, 102, 255, 0.7)', // Vibrant color
          borderColor: 'rgba(153, 102, 255, 1)', // Vibrant border
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <div className='flex flex-col  justify-center'>
      <h2 className="text-3xl text-center text-gray-300">Frequency Analysis</h2>
      <div className="mt-6 ">
        <label htmlFor="cipherInput" className="block text-lg text-gray-400">Enter Encrypted Text:</label>
        <textarea
          id="cipherInput"
          className="w-full bg-gray-800 text-green-500 p-3 mt-2 rounded-lg overflow-auto overflow-x-auto"
          rows="4"
          value={cipherText}
          onChange={(e) => setCipherText(e.target.value)}
        ></textarea>
        <div className='flex justify-center '>
        <button
          onClick={handleAnalysis}
          className="w-24 py-3  mt-4 bg-green-600 text-white rounded-lg"
        >
          Analyze
        </button>
        </div>
      </div>
      {analysisResult && (
        
        <div className="mt-6 ">
        <label htmlFor="cipherInput" className="block text-lg text-gray-400">Enter Decrypted Text:</label>
        <textarea
          id="cipherInput"
          className="w-full bg-gray-800 text-green-500 p-3 mt-2 rounded-lg overflow-auto overflow-x-auto"
          rows="4"
          value={analysisResult}
          onChange={(e) => setCipherText(e.target.value)}
        ></textarea>
        
      </div>


      )}
      {chartData.labels && (
        <div className="mt-6 w-96 mx-auto">
          <div className="bg-gray-800 p-4 rounded-full border-4 border-blue-500">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Frequency Comparison',
                    font: {
                      size: 16,
                    },
                  },
                },
                layout: {
                  padding: 10,
                },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Freq;
