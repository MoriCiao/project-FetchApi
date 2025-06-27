import React, { useContext } from "react";
import { SearchContext } from "./App";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
const SearchMain = () => {
  const { deBugStyle, data } = useContext(SearchContext);

  return (
    <section
      className={`h-screen md:col-start-3 xl:col-span-6 py-8 px-4 mb-4 text-[--theme-text] overflow-y-scroll`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.8, y: 20 }}
          transition={{ duration: 0.8, ease: easeInOut }}
          className="grid grid-cols-3 gap-4"
        >
          {data &&
            data.map((d, index) => {
              return (
                <div key={index} className="img-item">
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
                    {d.photographer}
                  </motion.h3>

                  <div className="overflow-hidden rounded-md">
                    <motion.img
                      initial={{ scale: 1 }}
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3, ease: easeInOut }}
                      className="w-full h-[300px] object-cover"
                      src={d.src.large}
                      alt=""
                    />
                  </div>
                  <div className="pt-2 grid grid-cols-8 items-center justify-start">
                    <span className="col-start-1 col-span-5">
                      Click me{" "}
                      <a href={d.src.landscape} target="blnak">
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
                      <a href={d.photographer_url} className="" target="blank">
                        Blog
                      </a>
                    </span>
                  </div>

                  <hr className="mt-2 border-[1px] rounded-full opacity-50" />
                </div>
              );
            })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default SearchMain;
