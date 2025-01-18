import React, { useState } from "react";

const Game = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [flagInput, setFlagInput] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const colorStyles = {
    red: `text-red-300 bg-gray-700 border-red-300 hover:bg-red-600 hover:text-white focus:ring-red-400`,
    yellow: `text-yellow-300 bg-gray-700 border-yellow-300 hover:bg-yellow-600 hover:text-white focus:ring-yellow-400`,
    green: `text-green-300 bg-gray-700 border-green-300 hover:bg-green-600 hover:text-white focus:ring-green-400`,
  };

  const challenges = [
    { id: "cpp", name: "Baby RSA", difficulty: "Easy", color: "yellow", description: "I've encrypted a secret number for your eyes only using your public key parameters: N = 882564595536224140639625987659416029426239230804614613279163 e = 65537 Use the private key that you found for these parameters in the previous challenge to decrypt this ciphertext: c = 77578995801157823671636298847186723593814843845525223303932", flag: "crypto_base64" },
    { id: "AdSpam", name: "Hexagon", difficulty: "Medium", color: "green", description: "For the next few challenges, you'll use what you've just learned to solve some more XOR puzzles. I've hidden some data using XOR with a single byte, but that byte is a secret. Don't forget to decode from hex first.Encrypted text: 73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d", flag: "crypto_flag64" },
    { id: "Hexagon", name: "Baby Base", difficulty: "Hard", color: "red", description: "Encrypted text: Y3J5cHRve2Jhc2VfNjRfaXNfd2F5X3Rvb19jb21tb259", flag: "crypto{base_64_is_way_too_common}" },
  ];

  const openDialog = (challenge) => {
    setCurrentChallenge(challenge);
    setIsDialogOpen(true);
    setFlagInput("");
    setResultMessage("");
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentChallenge(null);
  };

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    if (flagInput === currentChallenge.flag) {
      setResultMessage("✅ Correct flag! Well done.");
    } else {
      setResultMessage("❌ Incorrect flag. Try again!");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <header className="bg-gray-900 text-white py-5">
        <h1 className="font-bold text-4xl text-center text-white neon-text">Crypto Haven</h1>
      </header>

      <div className="min-h-screen text-white px-5 py-10">
        <main>
          <section className="category mb-10">
            <h2 className="text-2xl mb-4">Basic Cryptography</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`w-full py-2 text-left px-4 rounded-lg border-2 transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md hover:shadow-xl ${colorStyles[challenge.color]}`}
                >
                  <h3 className="text-xl mb-2">{challenge.name}</h3>
                  <p>{challenge.difficulty}</p>
                  <button
                    onClick={() => openDialog(challenge)}
                    className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className=" bg-gray-900 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-md overflow-auto">
            <h2 className="text-2xl font-bold mb-4">{currentChallenge.name}</h2>
            <p className="mb-4 overflow-auto">{currentChallenge.description}</p>
            <form onSubmit={handleFlagSubmit}>
              <label htmlFor="flag" className="block mb-2 text-lg font-medium">
                Submit Flag:
              </label>
              <input
                type="text"
                id="flag"
                value={flagInput}
                onChange={(e) => setFlagInput(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4 text-black"
                placeholder="Enter flag here"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                Submit
              </button>
            </form>
            {resultMessage && (
              <p className="mt-4 text-lg font-medium">{resultMessage}</p>
            )}
            <button
              onClick={closeDialog}
              className="mt-4 text-red-500 underline hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
