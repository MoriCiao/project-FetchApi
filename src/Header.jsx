import React, { useContext, useEffect } from "react";

import { motion } from "framer-motion";
import BgImage from "./components/BgImage";
const Header = ({ toHeadrProps }) => {
  const { handleSearch, input, setInput, currentSearchRef, setIsFavorotes } =
    toHeadrProps;

  const SearchBtn = () => {
    return (
      <button
        className={`h-[2rem] w-60 bg-black text-white`}
        onClick={handleSearch}
      >
        <strong>Search</strong>
      </button>
    );
  };
  useEffect(() => {
    currentSearchRef.current.focus();
  });
  return (
    <div
      className={`relative w-full xl:h-[100vh] sm:h-[30vh]  overflow-hidden flex items-center justify-center col-start-1 col-span-2 xl:shadow-[10px_0px_20px_rgba(0,0,0,1)] md:shadow-[0_10px_20px_rgba(0,0,0,1)] flex flex-col`}
    >
      <BgImage />
      <div className=" title py-4">
        <h1 className="text-[1.5rem] text-white text-center">
          Search for
          <br />
          <motion.span className="text-[2rem]">
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
      <section
        className={`search-area border-0 rounded-md overflow-hidden flex flex-col shadow-[0px_0px_15px_rgba(255,255,255,.3)]`}
      >
        <input
          className={`text-center h-[2rem] w-60 bg-black text-white`}
          type="text"
          placeholder="請輸入關鍵字...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          ref={currentSearchRef}
        />
        <SearchBtn />
      </section>
      <section className="text-white flex xl:flex-col md:flex-row sm:justify-center sm:gap-2 items-center w-full">
        <motion.button
          whileHover={{
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(120, 194, 196)",
            fontWeight: 900,
          }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsFavorotes(true)}
          className="px-4 py-2 md:mt-4 rounded-full w-[10rem] text-center border "
        >
          🩷 Favorites 🩷
        </motion.button>
      </section>
    </div>
  );
};

export default Header;
