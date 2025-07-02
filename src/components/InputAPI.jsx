import React, { useEffect, useState } from "react";

const InputAPI = ({ visibleMain, setVisibleMain, apiKey, setApiKey }) => {
  const [inputValue, setInputValue] = useState("");

  const hanldeSubmit = () => {
    if (inputValue) {
      setVisibleMain(true);
      setApiKey(inputValue);
    } else {
      alert("請輸入正確的API...");
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      {!visibleMain && (
        <section className={`InputAPI-area w-100 `}>
          <div className="API-content flex flex-col items-center m-auto justify-center rounded-md p-4 bg-white/50 text-black w-[20rem]">
            <label className="text-[1.5rem] font-bold mb-2" htmlFor="">
              請輸入API Key
            </label>
            <input
              className="w-[15rem] text-center rounded-md h-[2rem] mb-2"
              type="text"
              placeholder="Inpuy test API Key..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button
              onClick={hanldeSubmit}
              className="bg-white text-[1.2rem] px-4 mt-2 rounded-full"
            >
              提交
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default InputAPI;
