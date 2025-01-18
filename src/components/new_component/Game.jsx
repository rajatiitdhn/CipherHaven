import React from "react";
import { NavLink } from "react-router-dom";

const Game = () => {
  const baseStyle = `w-full py-2 text-left px-4 rounded-lg border-2 transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-md hover:shadow-xl`;
  const colorStyles = {
    red: `text-red-300 bg-gray-700 border-red-300 hover:bg-red-600 hover:text-white focus:ring-red-400`,
    blue: `text-blue-300 bg-gray-700 border-blue-300 hover:bg-blue-600 hover:text-white focus:ring-blue-400`,
    yellow: `text-yellow-300 bg-gray-700 border-yellow-300 hover:bg-yellow-600 hover:text-white focus:ring-yellow-400`,
    green: `text-green-300 bg-gray-700 border-green-300 hover:bg-green-600 hover:text-white focus:ring-green-400`,
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen">
      <header className="bg-gray-900 text-white py-5">
        <h1 className="font-bold text-4xl text-center text-white neon-text">
          Crypto Hack
        </h1>
      </header>

      <div className="min-h-screen text-white px-5 py-10">
        <main>
          {/* Web Exploitation Section */}
          <section id="web-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">Web Exploitation</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.yellow}`}>
                <h3 className="text-xl mb-2">Empty LS</h3>
                <p>Beginner</p>
                <NavLink
                  to="/solution/EmptyLS"
                  className="mt-3 inline-block bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-yellow-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>

          {/* Reversing Section */}
          <section id="reversing-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">Reversing</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.blue}`}>
                <h3 className="text-xl mb-2">Polymorph</h3>
                <p>Intermediate</p>
                <NavLink
                  to="/solution/Polymorph"
                  className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>

          {/* Forensics Section */}
          <section id="forensics-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">Forensics</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.yellow}`}>
                <h3 className="text-xl mb-2">cpp</h3>
                <p>Beginner</p>
                <NavLink
                  to="/solution/cpp"
                  className="mt-3 inline-block bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-yellow-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
              <div className={`${baseStyle} ${colorStyles.green}`}>
                <h3 className="text-xl mb-2">AdSpam</h3>
                <p>Easy</p>
                <NavLink
                  to="/solution/AdSpam"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
              <div className={`${baseStyle} ${colorStyles.red}`}>
                <h3 className="text-xl mb-2">Hexagon</h3>
                <p>Hard</p>
                <NavLink
                  to="/solution/Hexagon"
                  className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>

          {/* Pentesting Section */}
          <section id="pentesting-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">Pentesting</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.red}`}>
                <h3 className="text-xl mb-2">Compression</h3>
                <p>Hard</p>
                <NavLink
                  to="/solution/Compression"
                  className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>

          {/* OSINT Section */}
          <section id="osint-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">OSINT</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.yellow}`}>
                <h3 className="text-xl mb-2">FileStore</h3>
                <p>Beginner</p>
                <NavLink
                  to="/solution/FileStore"
                  className="mt-3 inline-block bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-yellow-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
              <div className={`${baseStyle} ${colorStyles.red}`}>
                <h3 className="text-xl mb-2">Graiders Of Corruption</h3>
                <p>Hard</p>
                <NavLink
                  to="/solution/GraidersOfCorruption"
                  className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>

          {/* Cryptography Section */}
          <section id="crypto-challenges" className="category mb-10">
            <h2 className="text-2xl mb-4">Cryptography</h2>
            <div className="challenges grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className={`${baseStyle} ${colorStyles.green}`}>
                <h3 className="text-xl mb-2">Pythia</h3>
                <p>Easy</p>
                <NavLink
                  to="/solution/Pythia"
                  className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-700 hover:scale-105"
                >
                  Read
                </NavLink>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Game;
