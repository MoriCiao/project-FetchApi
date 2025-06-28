import { createContext, useEffect, useRef, useState, useReducer } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import Header from "./Header";
import SearchMain from "./SearchMain";

import "./style/style.css";
import MyFavorites from "./components/MyFavorites";

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const currentSearchRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [isFavorotes, setIsFavorotes] = useState(false);
  const [favorotesList, setFavorotesList] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialURL = "https://api.pexels.com/v1/curated?per_page=16&page=1";

  const searchURL = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    setData(result.data.photos);

    // console.log(result.data.photos);
  };

  const handleSearch = async () => {
    console.log("Search Click !");
    if (!input || input === "") return;

    // 新增 loading
    // 此區觸發時要連動搜尋功能
    setLoading(true);
    console.log("目前搜尋為：" + input);
    const inputSearchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=16&page=1`;
    try {
      const res = await axios.get(inputSearchURL, {
        headers: { Authorization: apiKey },
      });

      setData(res.data.photos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMore = () => {
    let newUrl;
    const concatData = async (url) => {
      //先抓去後一頁的資料，再把資料連結起來成為新的data
      setLoading(true);
      try {
        let result = await axios.get(url, {
          headers: { Authorization: apiKey },
        });
        let newData = result.data.photos;

        setData(data.concat(newData));
        setPage((page) => page + 1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!input || input === "") {
      newUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${page + 1}`;
      concatData(newUrl);
    } else {
      newUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=16&page=${
        page + 1
      }`;
      concatData(newUrl);
    }
  };

  const toHeadrProps = {
    input,
    setInput,
    handleSearch,
    currentSearchRef,

    setIsFavorotes,
  };
  const initialState = {
    favorites: [],
  };
  function FavReduce(state, action) {
    // 每個正在action 的data 整合成 id
    const item = action.payload;
    // 用 id 核對目前list 裡是否存在
    const alreadyExists = state.favorites.some((fav) => fav.id === item.id);
    switch (action.type) {
      case "IS_LIKE": {
        return {
          ...state,
          favorites: alreadyExists
            ? state.favorites.filter((fav) => fav.id != item.id)
            : [...state.favorites, item],
        };
      }
      case "CLEAN": {
        console.log("清理");

        return state;
      }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(FavReduce, initialState);

  useEffect(() => {
    searchURL(initialURL);
  }, []);

  return (
    <div className="APP-area relative xl:grid xl:grid-cols-8 md:grid-cols-1">
      {isFavorotes && (
        <div className="absolute z-[5] w-[100%] max-w-100vh h-screen top-0 left-0 bg-black/50"></div>
      )}

      <Header toHeadrProps={toHeadrProps} />

      <SearchMain
        data={data}
        setFavorotesList={setFavorotesList}
        state={state}
        dispatch={dispatch}
      />
      <MyFavorites
        isFavorotes={isFavorotes}
        setIsFavorotes={setIsFavorotes}
        state={state.favorites}
        dispatch={dispatch}
      />

      {loading && (
        <div className="fixed inset-0 z-[10] flex items-center justify-center bg-black/50 m-auto w-[200px] h-[200px] rounded-full">
          <p className="text-center text-white text-[1.5rem]">Loading...</p>
        </div>
      )}
      {/* 更多圖片按鈕 */}

      <div className="w-screen h-auto relative">
        <button
          className={`fixed z-[10] bottom-8 right-12 bg-[--theme-bg] border border-white rounded-full px-4 text-white`}
          onClick={handleMore}
        >
          More...
        </button>
      </div>
    </div>
  );
}

export default App;
