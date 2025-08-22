import React, { useEffect, useState } from "react";
import Button from "../Button";

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

  return (
    <>
      {!visibleMain && (
        <div className="API-content absolute top-1/4 left-1/2 -translate-x-1/2 border border-white/  flex flex-col gap-4 items-center m-auto justify-center rounded-md p-4  bg-gradient-to-br from-white/10 via-white/20 to-white/10  text-white w-150">
          <label className="text-[1.5rem] font-bold mb-2" htmlFor="">
            請輸入 Pexels API Key
          </label>
          <input
            className="w-[15rem] text-center rounded-md h-[2rem] mb-2 border w-[80%] text-white"
            type="text"
            placeholder="Inpuy test API Key..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            label="提交"
            onClick={hanldeSubmit}
            otherSytle="hover:text-black hover:bg-white cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default InputAPI;
