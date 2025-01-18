import React, { useState } from "react";
import Toggle from "./Button";

const MITMLab = () => {
  const [isIntercepted, setIsIntercepted] = useState(false);
  const [certificateValidation, setCertificateValidation] = useState(true);
  const [keyExchangeSecurity, setKeyExchangeSecurity] = useState(true);
  const [log, setLog] = useState([]);

  const simulateAttack = () => {
    let attackLog = [];
    if (!certificateValidation) {
      attackLog.push(
        "🔓 Certificate validation is disabled. The attacker intercepted the communication!"
      );
    }
    if (!keyExchangeSecurity) {
      attackLog.push(
        "🔓 Key exchange is flawed. The attacker derived the session key and decrypted the communication!"
      );
    }
    if (certificateValidation && keyExchangeSecurity) {
      attackLog.push("✅ Communication is secure. No attack was successful.");
    }

    setLog(attackLog);
    setIsIntercepted(!certificateValidation || !keyExchangeSecurity);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-4xl font-bold text-teal-400 mb-6 text-center">
        Man-in-the-Middle Attack Lab
      </h1>
      <p className="text-gray-300 mb-4">
        Experiment with cryptographic vulnerabilities and see how they can be
        exploited.
      </p>

      {/* Configurations */}
      <div className="mb-8">
        <h2 className="text-2xl text-yellow-400 mb-4">Lab Configurations</h2>
        <div className="space-y-4">
          <div>
            <label className="mr-4">
              <input
                type="checkbox"
                checked={certificateValidation}
                onChange={() =>
                  setCertificateValidation(!certificateValidation)
                }
              />
              Enable Certificate Validation
            </label>
          </div>
          <div>
            <label className="mr-4">
              <input
                type="checkbox"
                checked={keyExchangeSecurity}
                onChange={() => setKeyExchangeSecurity(!keyExchangeSecurity)}
              />
              Secure Key Exchange (e.g., Diffie-Hellman with authentication)
            </label>
          </div>
        </div>
      </div>

      <Toggle />

      {/* Simulate Attack Button */}
      <button
        onClick={simulateAttack}
        className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Simulate Attack
      </button>

      {/* Attack Log */}
      <div className="mt-8">
        <div className="bg-gray-800 flex flex-col gap-32  p-4 rounded-lg shadow-md">
          <div className="flex  justify-between">
            <div>
              <img
                className="client ml-8"
                src="https://cdn-icons-png.flaticon.com/128/251/251992.png"
                loading="lazy"
                alt="Tv monitor "
                title="Tv monitor "
                width="64"
                height="64"
              ></img>
            </div>
            <div className="flex-1 mx-5 flex">
              <div className="flex justify-center items-center flex-col flex-1 gap-0 border-none">
                <div className="w-full flex items-center justify-center">
                  <hr className="w-full border-none bg-green-600 h-1 mb-0" />
                  <span className="material-symbols-outlined text-green-500">
                    arrow_forward_ios
                  </span>
                </div>

                <div className="w-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-500">
                    arrow_back_ios
                  </span>
                  <hr className="w-full border-none bg-green-600 h-1 mb-0" />
                </div>
                {/* <hr className="w-full border-none bg-green-600 h-1 mb-0" /> */}

              </div>
            </div>
            <div>
              <img
                className="server mr-8"
                src="https://cdn-icons-png.flaticon.com/128/1383/1383395.png"
                loading="lazy"
                alt="Server "
                title="Server "
                width="64"
                height="64"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              className="hacker"
              src="https://cdn-icons-png.flaticon.com/128/924/924915.png"
              loading="lazy"
              alt="Hacker "
              title="Hacker "
              width="64"
              height="64"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MITMLab;
