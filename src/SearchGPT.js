import React, { useState } from "react";
import axios from "axios";
function SearchGPT() {
  const [prompt, setPropmt] = useState("");
  const [response, setResponse] = useState("");
  const handlePrompt = (e) => {
    setPropmt(e.target.value);
  };
  const handleClear = () => {
    setPropmt("");
    setResponse("");
  };
  const key = "raket";
  const axiosWithAuth = () => {
    const tokenObj = JSON.parse(localStorage.getItem(key));
    let token = null;
    if (tokenObj) {
      token = tokenObj.token;
    }
    return axios.create({
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
  };
  const handleSearchGpt = () => {
    axiosWithAuth()
      .post("http://localhost:9000/api/chatgpt", { prompt: prompt })
      .then((res) => {
        if (res.status === 200) {
          setResponse(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-slate-950 p-8 w-full mt-8 rounded-md shadow-md">
      <div className="bg-slate-800 text-white rounded-md px-4 py-14 flex-col">
        <div>
          <p className="text-4xl font-bold">Ask ChatGPT</p>
          <p className="mt-4">Ask ChatGPT about tennis and Raket</p>
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              value={prompt}
              onChange={handlePrompt}
              className="text-black p-2 rounded-md w-4/5"
              placeholder="How to find the most suitable tennis racket for myself?
"
            />
            <div className="flex justify-around w-1/5 items-center">
              <button
                onClick={handleSearchGpt}
                className="text-blue-400 border-2 border-blue-400 p-2 rounded-md font-bold hover:bg-blue-400 hover:text-white"
              >
                Send
              </button>
              <button
                onClick={handleClear}
                className="text-red-400 border-2 border-red-400 p-2 rounded-md font-bold hover:bg-red-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
          <p className="text-slate-300 mt-8">{response}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchGPT;
