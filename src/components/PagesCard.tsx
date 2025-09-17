import React, { ReactNode } from "react";
import { Link } from "react-router";

type CardProps = {
  label: string;
  title: string;
  link: string;
  description: string;
};

const PagesCard: React.FC<CardProps> = ({
  label,
  title,
  link,
  description,
}): ReactNode => {
  return (
    <div
      className={`${label} flex h-100 w-100 items-center justify-center rounded-xl border border-black/20 bg-gradient-to-b from-white/25 via-white/10 to-transparent shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl lg:h-120 lg:w-120`}
    >
      <Link
        to={link}
        className={`flex h-full w-full flex-col items-center justify-center gap-2 text-center transition-all duration-500 hover:scale-110 sm:gap-4`}
      >
        <h3 className="text-xl font-bold sm:text-4xl">{title}</h3>
        <p className="text-sm sm:text-xl">{description}</p>
      </Link>
    </div>
  );
};

export default PagesCard;
