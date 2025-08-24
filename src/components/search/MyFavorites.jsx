import React, { useState } from "react";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFav,
  allClean,
  setDownload,
  isLike,
} from "../../features/search/searchSlice";
import PhotoCard from "./PhotoCard";
import Button from "../Button";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const MyFavorites = ({}) => {
  const { openFav, favorites } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleDownload = async () => {
    if (favorites.length === 0) {
      console.warn("無資料可以下載");
      alert("無資料可以下載");
      return;
    }
    dispatch(setDownload(true));
    let i = 1;
    const zip = new JSZip();
    try {
      for (const img of favorites) {
        const res = await fetch(img.src.landscape);

        if (!res.ok) {
          console.warn(`抓取第 ${i} 個圖檔失敗: ${res.status}`);
          continue; // 抓取失敗後，後續圖檔繼續處理
        }

        const blob = await res.blob();
        zip.file(`MyFav_${i}.jpg`, blob);
        i += 1;
      }
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "My_photos.zip");

      // 怕記憶體遺漏，將其清空
      zip.remove(/.*$/);
    } catch (e) {
      console.log("發生錯誤，原因：", e);
      alert("發生錯誤，請重新整理頁面再嘗試一次。");
    } finally {
      dispatch(setDownload(false));
    }
  };

  return (
    <section
      className={`favorites ${
        openFav ? "" : "hidden"
      }  z-[10] bg-black/50 w-[80%] h-[80%] rounded-xl p-0 overflow-hidden border border-white/50 flex flex-col gap-4`}
    >
      <div className="favorites-nav w-full h-15 pl-5 relative flex items-center justify-between">
        <div className="flex gap-4">
          <Button
            label="All Clean"
            onClick={() => dispatch(allClean())}
            otherStyle="text-white hover:bg-white/20 hover:text-red-500 text-[1.25rem] rounded-md"
          />
          <Button
            label="All Download"
            onClick={handleDownload}
            otherStyle="text-white hover:bg-white/20 hover:text-green-500 text-[1.25rem] rounded-md"
          />
        </div>
        <Button
          label="❌"
          onClick={() => dispatch(toggleFav(false))}
          otherStyle="border-0 text-[1.5rem]"
        />
      </div>
      <div className="favorites-content w-full h-[90%] p-4 grid grid-cols-4 gap-2  space-y-4 place-items-start justify-center overflow-y-auto">
        {favorites.map((f) => {
          return (
            <PhotoCard
              key={f.id}
              name={f.photographer}
              src={f.src.large}
              download={f.src.landscape}
              blog={f.photographer_url}
              isLike={favorites.find((fav) => fav.id === f.id) ? "🩷" : "🤍"}
              onClick={() => dispatch(isLike(f))}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MyFavorites;
