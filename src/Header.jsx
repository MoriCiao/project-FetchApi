import React, { useContext } from "react";
import { SearchContext } from "./App";
import BgImage from "./components/BgImage";
const Header = () => {
  const { deBugStyle, handleSearch } = useContext(SearchContext);

  const Searchinput = () => {
    return (
      <input
        className={`text-center h-[2rem] w-60`}
        type="text"
        placeholder="請輸入關鍵字...."
      />
    );
  };

  const SearchBtn = () => {
    return (
      <button className={` h-[2rem] w-60`} onClick={handleSearch}>
        Search
      </button>
    );
  };

  return (
    <div
      className={`relative w-full xl:h-screen md:h-[30vh] overflow-hidden flex items-center justify-center col-start-1 col-span-2 xl:shadow-[10px_0px_20px_rgba(0,0,0,1)] md:shadow-[0_10px_20px_rgba(0,0,0,1)]`}
    >
      <BgImage />
      <section
        className={`search-area rounded-md overflow-hidden flex flex-col bg-white `}
      >
        <Searchinput />
        <SearchBtn />
      </section>
    </div>
  );
};

export default Header;
