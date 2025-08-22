import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import SearchHeader from '../components/search/SearchHeader';
import SearchMain from '../components/search/SearchResult';
import MyFavorites from '../components/MyFavorites';
import Button from '../components/Button';
import BgImage from '../components/BgImage';
import InputAPI from '../components/InputAPI';
import { AnimatePresence, motion ,easeInOut} from 'framer-motion';
import SearchResult from '../components/search/SearchResult';

const SearchImg = () => {
  const [data, setData] = useState<T[]>([])
  const [input, setInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [isFavorotes, setIsFavorotes] = useState(false);
  const [visibleMain, setVisibleMain] = useState(false);
  const currentSearchRef = useRef<HTMLInputElement>(null);
  


  const [apiKey, setApiKey] = useState(import.meta.env.VITE_API_BASE_URL);

  const initialURL = "https://api.pexels.com/v1/curated?per_page=16&page=1";

  const searchURL = async (url:string) => {
    let result = await axios.get(url, {
      headers: { Authorization: apiKey },
    });
    setData(result.data.photos);
  };

  const handleSearch = async () => {
    if (!input || input === "") return;
    // 新增 loading
    // 此區觸發時要連動搜尋功能
    setLoading(true);

    const inputSearchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=16&page=1`;
    try {
      const res = await axios.get(inputSearchURL, {
        headers: { Authorization: apiKey },
      });

      setData(res.data.photos);
    } catch (error) {
      alert("發生錯誤...請重新整理頁面");
    } finally {
      setLoading(false);
    }
  };

  const handleMore = () => {
    let newUrl :string;
    if (visibleMain) {
      const concatData = async (url:string) => {
        //先抓去後一頁的資料，再把資料連結起來成為新的data
        setLoading(true);
        try {
          let result = await axios.get(url, {
            headers: { Authorization: apiKey },
          });
          let newData = result.data.photos;

          setData(data.concat(newData) );
          setPage((page) => page + 1);
        } catch (error) {
          alert("發生錯誤...請重新整理頁面");
        } finally {
          setLoading(false);
        }
      };
      if (!input || input === "") {
        newUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${
          page + 1
        }`;
        concatData(newUrl);
      } else {
        newUrl = `https://api.pexels.com/v1/search?query=${input}&per_page=16&page=${
          page + 1
        }`;
        concatData(newUrl);
      }
    } else {
      return alert("API未輸入，無法啟用此功能...");
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
    // 每個正在action 的data 整合成 item
    const item = action.payload;

    switch (action.type) {
      case "IS_LIKE": {
        // 用 id 核對目前圖片是否存在 fav list 裡
        const alreadyExists = state.favorites.some((fav) => fav.id === item.id);
        return {
          ...state,
          favorites: alreadyExists
            ? // 如果 true ，已經存在 fav list裡，則把該 item 過濾掉
              state.favorites.filter((fav) => fav.id != item.id)
            : // 如果False 不存在，則將目前操作的 item新增至fav list裡
              [...state.favorites, item],
        };
      }
      case "ALL_CLEAN": {
        // 清除收藏清單
        return { ...initialState };
      }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(FavReduce, initialState);
  useEffect(() => {
    searchURL(initialURL);
  }, [apiKey]);


  return (
    <div className={`w-full h-full realtive flex`}>
      <div className={`search-header flex-1 h-full `}>
        <SearchHeader toHeadrProps={toHeadrProps} />
      </div>
      <div className={`search-main flex-4 h-full w-full grid grid-cols-4 gap-6 px-6 pb-8 pt-2 `}>
        <SearchResult data={data}/>
      </div>
    

      {isFavorotes && 
        <div className='w-full h-full absolute z-10 top-0 left-0 bg-black/50 border border-white flex items-center justify-center'>

        <MyFavorites
          isFavorotes={isFavorotes}
          setIsFavorotes={setIsFavorotes}
          state={state.favorites}
          dispatch={dispatch}
        />
      </div>}
      
      {loading && (
        <div className="fixed inset-0 z-[10] flex items-center justify-center bg-black/50 m-auto w-[200px] h-[200px] rounded-full">
          <p className="text-center text-white text-[1.5rem]">Loading...</p>
        </div>
      )}

      {/* 更多圖片按鈕 */}
      <Button label={"More"} onClick={handleMore} otherSytle='absolute bottom-5 right-10 z-10 bg-white text-black rounded-md'/>
     
    
    </div>
  )
}


export default SearchImg