import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useReff Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, number, char]);

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
     window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() =>{
    passwordGenerator()
  }, [length, number, char, passwordGenerator])

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 px-4">

    <div className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20">

      <h1 className="text-white text-center text-3xl font-bold mb-6">
        🔐 Password Generator
      </h1>

      {/* Input + Copy */}
      <div className="flex items-center bg-white/10 rounded-lg overflow-hidden mb-5 border border-white/20">
        <input
          type="text"
          value={password}
          className="w-full px-3 py-2 bg-transparent text-white outline-none"
          placeholder="Generated password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 text-white font-medium"
        >
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-4">

        {/* Length */}
        <div>
          <div className="flex justify-between text-white text-sm mb-1">
            <span>Length</span>
            <span>{length}</span>
          </div>

          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="w-full cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        {/* Numbers */}
        <div className="flex items-center justify-between text-white">
          <label>Include Numbers</label>
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
          />
        </div>

        {/* Characters */}
        <div className="flex items-center justify-between text-white">
          <label>Include Symbols</label>
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar((prev) => !prev)}
          />
        </div>

      </div>

    </div>
  </div>
);
 
}

export default App;