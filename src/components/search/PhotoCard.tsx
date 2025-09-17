import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
type PhotoProps = {
  id: number;
  name: string;
  src: string;
  alt: string;
  download: string;
  blog: string;
  isLike: string;
  onClick: () => void;
};

const PhotoCard = ({
  id,
  name,
  src,
  alt = "圖片展示",
  download,
  blog,
  isLike,
  onClick,
}: PhotoProps) => {
  return (
    <div
      key={id}
      className="group photo-card relative z-1 flex h-80 w-full flex-col items-center justify-center gap-2 rounded-sm border border-white/20 bg-gradient-to-br from-white/10 via-white/20 to-white/10 px-4 py-2 text-white transition duration-500 hover:-translate-y-[5px] md:h-100"
    >
      <div className="flex w-full justify-between">
        <motion.h3 className="text-lg font-[800]">攝影師：{name}</motion.h3>
        <motion.span
          initial={{ scale: 1 }}
          whileTap={{ scale: 3 }}
          transition={{ duration: 1 }}
          className="cursor-pointer"
          onClick={onClick}
        >
          {isLike}
        </motion.span>
      </div>
      <div className="h-full w-full overflow-hidden rounded-md border border-white/20">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <p>
          Click to
          <a
            href={download}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-orange-500 underline"
          >
            Dowload
          </a>{" "}
        </p>
        <a href={blog} target="_blank" rel="noopener noreferrer" className="">
          <motion.span
            initial={{ x: -5 }}
            animate={{ x: [-5, 0, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mx-2 inline-block"
          >
            👉
          </motion.span>
          Blog
        </a>
      </div>
    </div>
  );
};

export default PhotoCard;
