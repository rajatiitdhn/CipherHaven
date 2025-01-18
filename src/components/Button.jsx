import React, { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Toggle Switch */}
      <div
        className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-red-600"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-6" : ""
          }`}
        />
      </div>

      {/* Text Label */}
      <p className="text-lg font-medium">{isOn ? "Secure" : "Intercepted"}</p>
    </div>
  );
};

export default Toggle;
