import React from "react";
import { useNavigate } from "react-router";
import { resetData } from "../features/otherApi/otherSlice";
import { useDispatch, useSelector } from "react-redux";
type NavProps = {
  to: string;
  label: string;
  className?: string;
};

const NavigateBtn = ({ to, label, className }: NavProps): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.otherApi);
  const handleCleanBack = (to) => {
    if (data) {
      dispatch(resetData("返回首頁，資料重新設定中..."));
    }
    navigate(`${to}`);
  };

  return (
    <button
      className={`h-10 rounded-md border bg-transparent px-2 text-white md:w-25 ${className}`}
      onClick={() => handleCleanBack(to)}
    >
      {label}
    </button>
  );
};

export default NavigateBtn;
