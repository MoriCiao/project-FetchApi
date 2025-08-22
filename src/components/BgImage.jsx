import React from "react";
import Bg_I from "../../public/header-bg.webp";
import Bg_II from "../../public/main-bg.webp";
const BgImage = ({ type, alt = "背景圖" }) => {
  return (
    <img
      className={
        type === "header"
          ? "bg-area absolute top-0 z-[-1] xl:h-screen md:w-full md:h-[30vh] xl:object-cover md:object-cover brightness-[0.3]"
          : "absolute top-0 left-0 z-[-1] w-full h-full ojbect-cover opacity-100 brightness-[.5] grayscale"
      }
      src={type === "header" ? Bg_I : Bg_II}
      alt={alt}
      loading="eager"
    />
  );
};

export default BgImage;
