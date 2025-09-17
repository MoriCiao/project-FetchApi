import React, { ReactNode } from "react";

type ItemProps = {
  label: string;
  text: string;
};

export const ObjectItem: React.FC<ItemProps> = ({ label, text }) => {
  return (
    <div className="flex border px-4 py-2">
      <label>{label.toUpperCase()}：</label>
      <p>{text}</p>
    </div>
  );
};
