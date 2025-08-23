import React from "react";
import { useSelector } from "react-redux";

type PhotoProps = {
  id:number,
  name: string
  src: string
  alt:string
  download:string
  blog:string
  isLike: string
  onClick: () => void
}




const PhotoCard = ({id, name,src ,alt = "圖片展示", download ,blog, isLike ,onClick} :PhotoProps) => {



  return <div key={id} className="group relative z-1 w-90 h-100 photo-card flex flex-col items-center justify-center gap-2 border border-white/20 rounded-sm px-4 py-2 text-white bg-gradient-to-br from-white/10 via-white/20 to-white/10 transition duration-500 hover:-translate-y-[5px]">
    <div className="w-full flex justify-between ">
      <p >{name}</p> 
      <span className="cursor-pointer" onClick={onClick}>{isLike}</span>
    </div>
    <div className="w-full h-full overflow-hidden rounded-md border border-white/20 ">
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"/>
    </div>
    <div className="w-full flex justify-between">
      <p>Click to  <a href={download} target="_blank" rel="noopener noreferrer">Dowload</a>  </p>
      <a href={blog} target="_blank" rel="noopener noreferrer">Blog</a>

    </div>

  </div>;
};

export default PhotoCard;
