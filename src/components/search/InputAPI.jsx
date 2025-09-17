import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import {
  handleApi,
  allowApi,
  setAuthModal,
} from "../../features/search/searchSlice";
const InputAPI = () => {
  const { APIkey, isAuth } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const hanldeSubmit = () => {
    if (APIkey) {
      dispatch(allowApi(true));
    } else {
      dispatch(setAuthModal({ status: true, text: "請輸入正確的 API " }));
    }
  };

  return (
    <>
      <div className="API-content absolute m-auto flex w-[80vw] flex-col items-center justify-center gap-4 rounded-md border border-white bg-gradient-to-br from-white/10 via-white/20 to-white/10 p-4 text-white sm:w-100 md:top-1/4 md:left-1/2 md:-translate-x-1/2 lg:w-150">
        <label className="mb-2 font-bold md:text-[1.5rem]" htmlFor="">
          請輸入 Pexels API Key
        </label>
        <input
          className="mb-2 h-[2rem] rounded-md border text-center text-white md:w-[80%]"
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
