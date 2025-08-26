import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import SearchHeader from '../components/search/SearchHeader';
import SearchResult from '../components/search/SearchResult';
import MyFavorites from '../components/search/MyFavorites';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {getData, moreData,setLoading} from "../features/search/searchSlice"
import StatusFrame from '../components/StatusFrame';


const SearchImg = () => {
  const [page, setPage] = useState<number>(1);
  const currentSearchRef = useRef<HTMLInputElement>(null);
  const { isAuth, APIkey ,ImgData ,openFav, keyword,initialURL, status} = useSelector((state:any) => state.search)
  const dispatch = useDispatch()

  const searchURL = async (url:string) => {
    if(APIkey){
      const res = await axios.get(url, {
        headers: { Authorization: APIkey },
      })
      if(res.status) {
        dispatch(getData(res.data.photos))
      }
    }

  }

  const handleSearch = async () => {
    if (!keyword || keyword === "") return;
    // 新增 loading
    // 此區觸發時要連動搜尋功能
    dispatch(setLoading(true));
    const inputSearchURL = `https://api.pexels.com/v1/search?query=${keyword}&per_page=16&page=1`;
    try {
      const res = await axios.get(inputSearchURL, {
        headers: { Authorization: APIkey },
      });
      dispatch(getData(res.data.photos));
    } catch (error) {
      alert("發生錯誤...請重新整理頁面");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleMore = () => {
    let newUrl :string;
    const concatData = async (url:string) => {
      // 先抓去後一頁的資料，再把資料連結起來成為新的data
      dispatch(setLoading(true));
      try {
        let res = await axios.get(url, {
          headers: { Authorization: APIkey },
        });
        let newData = res.data.photos;
        dispatch(moreData(newData))
        setPage((page) => page + 1);
      } catch (error) {
        alert("發生錯誤...請重新整理頁面");
      } finally {
        dispatch(setLoading(false));
      }
    };
    if (isAuth) {
      if (!keyword || keyword === "") {
        newUrl = `https://api.pexels.com/v1/curated?per_page=16&page=${page + 1}`;
        concatData(newUrl);
      } else {
        newUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=16&page=${page + 1}`;
        concatData(newUrl);
      }
    } else {
      return alert("API未輸入，無法啟用此功能...");
    }
  };

  const toHeadrProps = {
    handleSearch,
    currentSearchRef,
  };

  useEffect(() => {
    searchURL(initialURL);
  }, [APIkey]);


  return (
    <div className={`w-full h-full realtive flex`}>
      <div className={`search-header flex-1 h-full `}>
        <SearchHeader toHeadrProps={toHeadrProps} />
      </div>
      <div className={`search-main flex-4 h-full w-full grid grid-cols-4 gap-6 px-6 pb-8 pt-2 `}>
        <SearchResult/>
      </div>
    

      {openFav && 
        <div className='w-full h-full absolute z-10 top-0 left-0 bg-black/50 border border-white flex items-center justify-center'>

        <MyFavorites/>
      </div>}
      {(status.isLoading || status.isDownload || status.isError )&& <StatusFrame/>}
      

      {/* 更多圖片按鈕 */}
      <Button label={"More"} onClick={handleMore} otherStyle='absolute z-[5] bottom-5 right-10 z-10 w-25 h-10 bg-white/50 text-white rounded-md transition-all duration-500 hover:bg-orange-500 hover:text-black hover:font-bold hover:scale-110'/>
     
    
    </div>
  )
}


export default SearchImg