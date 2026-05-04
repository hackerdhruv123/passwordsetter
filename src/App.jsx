import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-center items-start ">
      
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-6 bg-gray-800 text-white ">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          Password Generator
        </h1>

        {/* input + button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="outline-none w-full py-2 px-3 text-black"
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white"
          >
            Copy
          </button>
        </div>

        {/* length slider */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer w-full"
            onChange={(e) => setLength(e.target.value)}
          />
          <span>{length}</span>
        </div>

        {/* checkboxes */}
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
            />
            Characters
          </label>
        </div>

      </div>
    </div>
  );
}

export default App;