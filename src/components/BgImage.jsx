import React from "react";

const BgImage = () => {
  const bgImg = "/searchImage/header-bg.jpg";
  return (
    <img
      className="bg-area absolute top-0 z-[-10] xl:h-screen md:w-full md:h-[30vh] xl:object-cover md:object-cover brightness-[0.3]"
      src={bgImg}
      alt="bg=Img"
    />
  );
};

export default BgImage;
