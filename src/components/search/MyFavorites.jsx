import React, { useState } from "react";

import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav, allClean } from "../../features/search/searchSlice";
import PhotoCard from "./PhotoCard";
import Button from "../Button";
/* 
做出一個彈跳視窗
內容是可以加入收藏的圖片
*/
const MyFavorites = ({}) => {
  const { openFav, favorites } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  return (
    <section
      className={`favorites ${
        openFav ? "" : "hidden"
      }  z-[10] bg-black/50 w-[80%] h-3/4 rounded-xl p-4 overflow-hidden border border-white flex flex-col gap-4`}
    >
      <div className="favorites-nav w-full h-[25px] relative flex items-center justify-between pr-2 my-2">
        <Button
          label="All Clean"
          onClick={() => dispatch(allClean())}
          otherSytle="text-white hover:bg-white hover:text-red-500"
        />
        <Button
          label="❌"
          onClick={() => dispatch(toggleFav(false))}
          otherSytle="border-0 text-[1.5rem]"
        />
      </div>
      <div className="favorites-content w-full h-[90%] p-4 grid grid-cols-4 gap-8 place-items-center justify-center overflow-y-auto">
        {favorites.map((f) => {
          return (
            <PhotoCard
              key={f.id}
              name={f.photographer}
              src={f.src.large}
              download={f.src.landscape}
              blog={f.photographer_url}
              isLike={favorites.find((fav) => fav.id === f.id) ? "🩷" : "🤍"}
              onClick={() => dispatch(isLike(d))}
            />
            // <div key={index} className="img-item" loading="lazy">
            //   <div className="relative flex items-center">
            //     <motion.h3
            //       initial={{}}
            //       animate={{
            //         color: [
            //           "rgb(120, 194, 196)",
            //           "rgb(120, 196, 131)",
            //           "rgb(236, 229, 94)",
            //           "rgb(236, 118, 94)",
            //         ],
            //         textShadow: "2px 2px 5px black",
            //       }}
            //       transition={{ duration: 4 }}
            //       className="text-[--theme-text] text-[1.15rem] py-2 font-bold"
            //     >
            //       {f.photographer}
            //     </motion.h3>
            //     <span
            //       className="absolute right-0 cursor-pointer "
            //       onClick={() =>
            //         dispatch({
            //           type: "IS_LIKE",
            //           payload: f,
            //         })
            //       }
            //     >
            //       🩷
            //     </span>
            //   </div>

            //   <div className="overflow-hidden rounded-md">
            //     <motion.img
            //       initial={{ scale: 1 }}
            //       whileHover={{
            //         scale: 1.1,
            //       }}
            //       transition={{ duration: 0.3, ease: easeInOut }}
            //       className="w-full h-[300px] object-cover"
            //       src={f.src.large}
            //       alt=""
            //     />
            //   </div>
            //   <div className="pt-2 grid grid-cols-8 items-center justify-start">
            //     <span className="col-start-1 col-span-5 text-[--theme-text]">
            //       Click me{" "}
            //       <a href={f.src.landscape} target="_blnak">
            //         <strong className="text-[orange]">Dowload</strong>
            //       </a>
            //     </span>

            //     <span className="col-start-7 col-span-2 flex justify-end">
            //       <motion.span
            //         initial={{ x: -10 }}
            //         animate={{
            //           x: [0, -10, 0],
            //           textShadow: [
            //             "0 0 5px gold",
            //             "0 0 10px orange",
            //             "0 0 5px gold",
            //           ],
            //           scale: [1.1, 1, 1.1],
            //         }}
            //         transition={{ duration: 2, repeat: Infinity }}
            //         className="col-start-7"
            //       >
            //         👉
            //       </motion.span>
            //       <a
            //         href={f.photographer_url}
            //         className="text-[--theme-text]"
            //         target="_blank"
            //       >
            //         Blog
            //       </a>
            //     </span>
            //   </div>

            //   <hr className="mt-2 border-[1px] rounded-full opacity-50" />
            // </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyFavorites;
