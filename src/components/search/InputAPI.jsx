import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { handleApi, allowApi } from "../../features/search/searchSlice";
const InputAPI = () => {
  const { APIkey, isAuth } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const hanldeSubmit = () => {
    if (APIkey) {
      dispatch(allowApi(true));
    } else {
      alert("請輸入正確的API...");
    }
  };

  return (
    <>
      <div className="API-content absolute top-1/4 left-1/2 -translate-x-1/2 border border-white/  flex flex-col gap-4 items-center m-auto justify-center rounded-md p-4  bg-gradient-to-br from-white/10 via-white/20 to-white/10  text-white w-150">
        <label className="text-[1.5rem] font-bold mb-2" htmlFor="">
          請輸入 Pexels API Key
        </label>
        <input
          className="w-[15rem] text-center rounded-md h-[2rem] mb-2 border w-[80%] text-white"
          type="text"
          placeholder="Pexels API Key..."
          value={APIkey}
          onChange={(e) => {
            dispatch(handleApi(e.target.value));
          }}
        />
        <Button
          label="提交"
          onClick={hanldeSubmit}
          otherStyle="hover:text-black hover:bg-white cursor-pointer"
        />
      </div>
    </>
  );
};

export default InputAPI;
