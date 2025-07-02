import React, { useState } from "react";

import { easeInOut, motion, AnimatePresence } from "framer-motion";

/* 
做出一個彈跳視窗
內容是可以加入收藏的圖片
*/
const MyFavorites = ({ isFavorotes, setIsFavorotes, state, dispatch }) => {
  // console.log("目前的清單state:" + JSON.stringify(state));
  const FavData = state;
  // console.log(FavData);

  return (
    <section
      className={`favorites ${
        isFavorotes ? "" : "hidden"
      } absolute z-[10] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 w-3/4 h-3/4 rounded-xl p-2 overflow-hidden border`}
    >
      <div className="favorites-nav w-full h-[25px] relative flex items-center justify-end pr-2 my-2">
        <motion.button
          whileHover={{
            backgroundColor: "rgb(255,255,255)",
            color: "rgb(55,60,56)",
          }}
          transition={{ duration: 0.2 }}
          className="absolute border px-2 border-white rounded-full left-4 top-0 text-white"
          onClick={() => dispatch({ type: "ALL_CLEAN" })}
        >
          All Clean
        </motion.button>
        <button className="" onClick={() => setIsFavorotes(false)}>
          ❌
        </button>
      </div>
      {/* border border-white/50 */}
      <div className="favorites-content w-full h-[95%] bg-black/50  p-4  rounded-xl overflow-y-scroll grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 sm:pb-12 p-2">
        {FavData.map((f, index) => {
          return (
            <div key={index} className="img-item" loading="lazy">
              <div className="relative flex items-center">
                <motion.h3
                  initial={{}}
                  animate={{
                    color: [
                      "rgb(120, 194, 196)",
                      "rgb(120, 196, 131)",
                      "rgb(236, 229, 94)",
                      "rgb(236, 118, 94)",
                    ],
                    textShadow: "2px 2px 5px black",
                  }}
                  transition={{ duration: 4 }}
                  className="text-[--theme-text] text-[1.15rem] py-2 font-bold"
                >
                  {f.photographer}
                </motion.h3>
                <span
                  className="absolute right-0 cursor-pointer "
                  onClick={() =>
                    dispatch({
                      type: "IS_LIKE",
                      payload: f,
                    })
                  }
                >
                  🩷
                </span>
              </div>

              <div className="overflow-hidden rounded-md">
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3, ease: easeInOut }}
                  className="w-full h-[300px] object-cover"
                  src={f.src.large}
                  alt=""
                />
              </div>
              <div className="pt-2 grid grid-cols-8 items-center justify-start">
                <span className="col-start-1 col-span-5 text-[--theme-text]">
                  Click me{" "}
                  <a href={f.src.landscape} target="_blnak">
                    <strong className="text-[orange]">Dowload</strong>
                  </a>
                </span>

                <span className="col-start-7 col-span-2 flex justify-end">
                  <motion.span
                    initial={{ x: -10 }}
                    animate={{
                      x: [0, -10, 0],
                      textShadow: [
                        "0 0 5px gold",
                        "0 0 10px orange",
                        "0 0 5px gold",
                      ],
                      scale: [1.1, 1, 1.1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="col-start-7"
                  >
                    👉
                  </motion.span>
                  <a
                    href={f.photographer_url}
                    className="text-[--theme-text]"
                    target="_blank"
                  >
                    Blog
                  </a>
                </span>
              </div>

              <hr className="mt-2 border-[1px] rounded-full opacity-50" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyFavorites;
