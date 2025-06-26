import { createContext, useState } from "react";
import Header from "./Header";
import SearchMain from "./SearchMain";
import "./style/style.css";

function App() {
  const SearchCotext = createContext();
  const SearchProvider = ({ children }) => {
    return <SearchProvider>{children}</SearchProvider>;
  };

  return (
    <>
      <Header />
      <SearchMain />
    </>
  );
}

export default App;
