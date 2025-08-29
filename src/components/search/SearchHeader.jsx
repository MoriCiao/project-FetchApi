import React, { useContext, useEffect } from "react";

import { motion } from "framer-motion";
import BgImage from "../BgImage";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav, searchKeyword } from "../../features/search/searchSlice";
import Button from "../Button";
const Header = ({ toHeadrProps }) => {
  const { openFav, keyword } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { handleSearch, currentSearchRef } = toHeadrProps;

  useEffect(() => {
    currentSearchRef.current.focus();
  });
  return (
    <div
      className={`relative z-1 w-full md:h-full p-4 overflow-hidden flex gap-2 items-center justify-center col-start-1 col-span-2 xl:shadow-[10px_0px_20px_rgba(0,0,0,1)] md:shadow-[0_10px_20px_rgba(0,0,0,1)] flex flex-col `}
    >
      <BgImage type="header" />

      <div className="md:block hidden w-full">
        <h1 className="text-[1.25rem] text-white text-center">
          Search for
          <br />
          <motion.span className="text-[1.5rem]">
            What You Want{" "}
            <motion.span
              className="inline-block"
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.8, 1.2, 0.8], rotate: [60, 0, 60] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🔍
            </motion.span>
          </motion.span>
        </h1>
      </div>
      <div
        className={`search-area md:w-full w-[80%] border-0 rounded-md overflow-hidden flex flex-col shadow-[0px_0px_15px_rgba(255,255,255,.3)] relative z-1`}
      >
        <input
          className={`text-center h-[2rem] w-full bg-black text-white`}
          type="text"
          placeholder="請輸入關鍵字...."
          value={keyword}
          onChange={(e) => dispatch(searchKeyword(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          ref={currentSearchRef}
        />
        <Button
          label="Search"
          onClick={handleSearch}
          otherStyle="border-0 text-white bg-black cursor-pointer py-1"
        />
      </div>
      <div className="md:block hidden text-white flex xl:flex-col md:flex-row sm:gap-2 justify-center items-center w-full">
        <Button
          label="🩷 Favorites 🩷"
          onClick={() => dispatch(toggleFav(!openFav))}
          otherStyle="hover:bg-white hover:text-red-500 hover:tracking-widest hover:border-red-500 w-60 p-2 rounded-full w-full my-4 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default Header;
