import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDistrict, findAddress } from "../../features/otherApi/otherSlice";
import KeywordInput from "../KeywordInput";
import Pagination from "./Pagination";

const data_per_page = 20;

type DataYoubike = {
  Quantity: number;
  act: string;
  ar: string;
  aren: string;
  available_rent_bikes: number;
  available_return_bikes: number;
  infoDate: string;
  infoTime: string;
  latitude: number;
  longitude: number;
  mday: string;
  sarea: string;
  sareaen: string;
  sna: string;
  snaen: string;
  sno: string;
  srcUpdateTime: string;
  updateTime: string;
};

export default function YouBike() {
  const { data, filtered, link, currentURL, keyword_Dis, keyword } =
    useSelector((state: any) => state.otherApi);
  const isBike = link.bike_url === currentURL;
  const dispatch = useDispatch();

  const currentData =
    keyword.trim() === "" && keyword_Dis === "" ? data || [] : filtered || [];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(currentData.length / data_per_page);
  const startIndex = (currentPage - 1) * data_per_page;
  const endIndex = startIndex + data_per_page;
  const CurrentItems = currentData.slice(startIndex, endIndex);

  function findDis<T extends Record<string, number | string>>(obj: T[]) {
    let result = obj.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.sarea] = (acc[cur.sarea] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(result);
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [currentURL, keyword]);

  return (
    <div className="relative flex w-full flex-col gap-4 overflow-hidden py-4 lg:px-8">
      <div
        className={`flex h-auto flex-col items-center justify-between gap-2 sm:h-20 md:flex-row md:gap-4`}
      >
        <div className="flex h-full w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
          <select
            name=""
            id=""
            className="h-10 w-full border bg-gray-500 text-center md:w-50"
            onChange={(e) => dispatch(findDistrict(e.target.value))}
          >
            <option value=""></option>
            {Object.entries(
              findDis(data).map(([key, value], index) => (
                <option key={index} value={key}>
                  {key} 共有 {value as number} 個
                </option>
              )),
            )}
          </select>
          <KeywordInput
            keyword={keyword}
            otherStyle="md:w-50 w-full h-10"
            placeholder="關鍵字..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(findAddress(e.target.value));
            }}
          />
        </div>
        <p>目前已獲取 {currentData.length} 筆資料</p>
      </div>
      <div className="flex h-150 w-full overflow-x-auto md:h-full">
        <table className="h-150 min-w-[100vw] table-fixed border-collapse border border-green-500 md:h-auto">
          <thead className="sticky -top-1">
            <tr className="w-full bg-gray-500 text-white">
              <th className={`w-20 border border-white/50 px-4 py-2`}>編號</th>
              <th className={`min-w-20 border border-white/50 px-4 py-2`}>
                地區
              </th>
              <th className={`min-w-50 border border-white/50 px-4 py-2`}>
                地址
              </th>
              <th className={`w-20 border border-white/50 px-4 py-2`}>地圖</th>
              <th className={`min-w-20 border border-white/50 px-4 py-2`}>
                已租借
              </th>
              <th className={`min-w-20 border border-white/50 px-4 py-2`}>
                未租借
              </th>
              <th className={`min-w-20 border border-white/50 px-4 py-2`}>
                總數量
              </th>
              <th className={`min-w-50 border border-white/50 px-4 py-2`}>
                資料更新時間
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              isBike &&
              CurrentItems.map(
                (d: DataYoubike, index: number): React.ReactNode => {
                  const displayIndex = index + 1;
                  const address = d.sarea + d.ar;
                  return (
                    <tr
                      key={displayIndex}
                      className={`transition-all duration-500 odd:hover:bg-gray-800 even:hover:bg-gray-500 even:hover:text-white`}
                    >
                      <th className={`border border-white/50 px-4 py-2`}>
                        {displayIndex}
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.sarea}
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.ar}
                      </th>
                      <th className={`border border-white/50`}>
                        <a
                          href={`https://www.google.com/maps?q=${address}`}
                          className="block flex h-full w-full items-center justify-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📍
                        </a>
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.available_rent_bikes}
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.available_return_bikes}
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.Quantity}
                      </th>
                      <th className={`border border-white/50 px-4 py-2`}>
                        {d.srcUpdateTime}
                      </th>
                    </tr>
                  );
                },
              )}
          </tbody>
        </table>
      </div>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
