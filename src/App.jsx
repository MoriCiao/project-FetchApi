import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import SearchMain from "./SearchMain";
import "./style/style.css";

export const SearchContext = createContext();

function App() {
  const [data, setData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialURL = "https://api.pexels.com/v1/curated?per_page=16&page=1";

  const searchURL = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    setData(result.data.photos);

    console.log(result.data.photos);
  };
  const SearchProvider = ({ children }) => {
    const deBugStyle = "border";

    const handleSearch = () => {
      console.log("Search Click !");
      setData(null);
    };

    return (
      <SearchContext.Provider value={{ deBugStyle, handleSearch, data }}>
        {children}
      </SearchContext.Provider>
    );
  };

  useEffect(() => {
    searchURL(initialURL);
  }, []);

  return (
    <SearchProvider>
      <div className="APP-area xl:grid xl:grid-cols-8 md:grid-cols-1">
        <Header />
        <SearchMain />
      </div>
    </SearchProvider>
  );
}

export default App;
