import React from "react";

type BtnProps = {
  label: string;
  otherStyle?: string;
  onClick: () => void;
};

const Button = ({
  label,
  onClick,
  otherStyle,
}: BtnProps): React.JSX.Element => {
  return (
    <button
      className={`text-large cursor-pointer border px-4 font-bold ${otherStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
