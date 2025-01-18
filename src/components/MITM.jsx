import React, { useState } from "react";
import Toggle from "./Button";

const MITMLab = () => {
  const [connectionStarted, setConnectionStarted] = useState(false);
  const [connectionAccepted, setConnectionAccepted] = useState(false);
  const [showClientMessage, setShowClientMessage] = useState(false);
  const [showServerMessage, setShowServerMessge] = useState(false);

  const handleStartConnection = () => {
    setConnectionStarted(true);
  };

  const handleAcceptConnection = () => {
    setConnectionAccepted(true);
  };
  const sendMessage=()=>{
    setShowClientMessage(true)
    setTimeout(()=>{
        setShowServerMessge(true)
    },300)

  }
  const recieveMessage=()=>{
    setShowServerMessgae(true)
  }

  const simulateAttack = () => {};

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 font-mono">
      <h1 className="text-4xl font-bold text-teal-400 mb-6 text-center">
        Man-in-the-Middle Attack Lab
      </h1>
      <Toggle />

      {/* Simulate Attack Button */}
     

      {/* Attack Log */}
      <div className="mt-8">
        <div className="bg-gray-800 flex flex-col   p-4 rounded-lg shadow-md">
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
              <div>
                <button
                  onClick={handleStartConnection}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Start Connection
                </button>
              </div>
            </div>
            <div className="flex-1 mx-5 flex ">
              <div className="flex justify-center items-center flex-col flex-1 gap-0 border-none">
                {connectionStarted && (
                  <div className="w-full flex items-center justify-center">
                    <hr className="w-full border-none bg-green-600 h-1 mb-0" />
                    <span className="material-symbols-outlined text-green-500">
                      arrow_forward_ios
                    </span>
                  </div>
                )}
                {connectionAccepted && (
                  <div className="w-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-500">
                      arrow_back_ios
                    </span>
                    <hr className="w-full border-none bg-green-600 h-1 mb-0" />
                  </div>
                )}
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
              {connectionStarted && (
                <div>
                  <button
                    onClick={handleAcceptConnection}
                    className="mt-4 px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    Accept Connection
                  </button>
                </div>
              )}
            </div>
          </div>

          {connectionAccepted&&(
            <div className="flex-1 flex justify-between my-5">
            <div className="flex flex-col ">
              <div className="min-h-20 w-40 bg-gray-900 rounded-md">
                
                  
              <button
                onClick={sendMessage}
                className=" mx-6 my-2 px-3 text-sm bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-800 transition"
              >
                say Hello!
              </button>
              {showClientMessage&&(
                <div className="flex text-sm justify-center">
                    c2F5IEhlbGxvIQ==
                </div>

              )}
              </div>
              
            </div>

            {  showServerMessage&&(
                    <div className="flex flex-col ">
              <div className="min-h-20 w-40 bg-gray-900 rounded-md">
                
                  
              <button
                onClick={sendMessage}
                className=" mx-6 my-2 px-3 text-sm bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-800 transition"
              >
                recieved
              </button>
              {showClientMessage&&(
                <div className="flex text-sm justify-center">
                    c2F5IEhlbGxvIQ==
                </div>

              )}
              </div>
            </div>
                )

            }
            
              
          </div>
          )}

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
