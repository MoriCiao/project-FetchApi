import { p } from "framer-motion/client";
import React from "react";

type tagProps = {
  label: string;
  otherStyle?: string;
};

const Tag: React.FC<tagProps> = ({ label, otherStyle }) => {
  return (
    <span className={`cursor-default rounded-full border px-4 ${otherStyle}`}>
      {label}
    </span>
  );
};

export default Tag;
