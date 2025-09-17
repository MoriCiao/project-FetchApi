import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../Tag";
import { TempItems, Hourly } from "./WeatherItems";
import KeywordInput from "../KeywordInput";
import { changeLocation } from "../../features/otherApi/otherSlice";
import Button from "../Button";
import Map from "../Map";

export type DataWeather = {
  latitude: number;
  longitude: number;
  utc_offset_seconds: number;
  generationtime_ms: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
};

const Weather = () => {
  const { data, currentURL, localtion } = useSelector(
    (state: any) => state.otherApi,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [inputlocation, setInputLocaltion] = useState({
    latitude: localtion.latitude,
    longitude: localtion.longitude,
  });
  const mapRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(changeLocation(inputlocation));
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {}, [currentURL, data]);

  return (
    <div className="weather-container flex h-full w-full flex-col items-start justify-start gap-10 overflow-auto pb-10 md:gap-4 xl:flex-row xl:pb-0">
      {data && <Hourly data={data} isOpen={isOpen} setIsOpen={setIsOpen} />}

      <div className="relative z-[1] hidden h-[70vh] w-full lg:flex-2 xl:block">
        <Map lat={inputlocation.latitude} long={inputlocation.longitude} />
      </div>

      <div className="flex w-full flex-col gap-4 px-4 pb-4 lg:flex-2">
        <div className="justify- flex w-full flex-col items-center gap-4 text-xl md:flex-row">
          <div className="flex w-full flex-col items-center py-2 sm:flex-row">
            <label htmlFor="" className="block min-w-20">
              經度：
            </label>
            <KeywordInput
              keyword={inputlocation.latitude}
              placeholder="經度："
              onChange={(e) =>
                setInputLocaltion((prev) => ({
                  ...prev,
                  latitude: e.target.value,
                }))
              }
              otherStyle="text-center rounded-md bg-white text-black h-10  w-full"
            />
          </div>
          <div className="flex w-full flex-col items-center py-2 sm:flex-row">
            <label htmlFor="" className="block min-w-20">
              緯度：
            </label>
            <KeywordInput
              keyword={inputlocation.longitude}
              placeholder="緯度："
              onChange={(e) =>
                setInputLocaltion((prev) => ({
                  ...prev,
                  longitude: e.target.value,
                }))
              }
              otherStyle="text-center rounded-md bg-white text-black h-10  w-full"
            />
          </div>
          <Button
            label="Search"
            onClick={handleSearch}
            otherStyle="rounded-md hover:bg-orange-500/20 hover:text-orange-500 h-10 xl:max-w-40 w-full"
          />
        </div>

        {data &&
          data.map((i: DataWeather, index: number) => {
            const entries = Object.entries(i);
            return (
              <div key={index} className="flex flex-2 flex-col gap-4">
                <TempItems entries={entries} setIsOpen={setIsOpen} />

                <div className="flex flex-col gap-2">
                  <h3>重要資訊：</h3>
                  <div className="flex flex-wrap justify-start gap-2 md:flex-row md:gap-4">
                    {entries.map(([key, _], keyIndex) => {
                      const names = [
                        "latitude",
                        "longitude",
                        "elevation",
                        "timezone",
                      ];
                      if (!names.includes(key.toLowerCase())) {
                        return null;
                      }
                      return (
                        <Tag
                          key={keyIndex}
                          label={key.toUpperCase()}
                          otherStyle="hover:bg-white hover:text-black"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div
        ref={mapRef}
        className="relative z-[1] h-[70vh] w-full px-4 pb-10 md:flex-3 xl:hidden"
      >
        <Map lat={inputlocation.latitude} long={inputlocation.longitude} />
      </div>
    </div>
  );
};

export default Weather;
