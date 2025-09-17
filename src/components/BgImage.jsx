import React from "react";

const BG = {
  Bg_I: "/project-FetchApi//header-bg.webp",
  Bg_II: "/project-FetchApi//main-bg.webp",
};

const BgImage = ({ type, alt = "背景圖" }) => {
  return (
    <img
      className={
        type === "header"
          ? "bg-area absolute top-0 z-[-1] brightness-[0.3] md:h-[30vh] md:w-full md:object-cover xl:h-screen xl:object-cover"
          : "ojbect-cover absolute top-0 left-0 z-[-1] h-full w-full opacity-100 brightness-[.5] grayscale"
      }
      src={type === "header" ? BG.Bg_I : BG.Bg_II}
      alt={alt}
      loading="eager"
    />
  );
};

export default BgImage;
