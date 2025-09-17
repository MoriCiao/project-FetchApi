import React, { useState } from "react";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFav,
  allClean,
  setDownload,
  isLike,
  setAuthModal,
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
      dispatch(setAuthModal({ status: true, text: "無資料可以下載" }));
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
      } z-[10] flex h-full w-full flex-col justify-start gap-4 overflow-hidden rounded-xl border border-white/50 bg-black/50 p-0 p-4 md:h-[80%] md:w-[80%]`}
    >
      <div className="favorites-nav relative flex h-auto w-full items-center justify-between md:h-15 md:pl-5">
        <div className="flex gap-4">
          <Button
            label="All Clean"
            onClick={() => dispatch(allClean())}
            otherStyle="text-white hover:bg-white/20 hover:text-red-500 md:text-[1.25rem] rounded-md"
          />
          <Button
            label="All Download"
            onClick={handleDownload}
            otherStyle="text-white hover:bg-white/20 hover:text-green-500 md:text-[1.25rem] rounded-md"
          />
        </div>
        <Button
          label="❌"
          onClick={() => dispatch(toggleFav(false))}
          otherStyle="border-0 md:text-[1.5rem] text-xl  md:border-0 border-1 border-red-300 rounded-md"
        />
      </div>
      {favorites.length !== 0 ? (
        <div className="favorites-content grid h-[90%] w-full grid-cols-1 place-items-start justify-center gap-2 space-y-4 overflow-y-auto p-4 md:grid-cols-2 xl:grid-cols-4">
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
      ) : (
        <p className="flex h-full w-full items-center justify-center text-center text-2xl text-white">
          目前無任何收藏...
        </p>
      )}
    </section>
  );
};

export default MyFavorites;
