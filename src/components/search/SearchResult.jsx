import InputAPI from "./InputAPI";
import BgImage from "../BgImage";
import { useDispatch, useSelector } from "react-redux";
import PhotoCard from "./PhotoCard";
import { isLike } from "../../features/search/searchSlice";
const SearchResult = () => {
  const { isAuth, ImgData, favorites } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  return (
    <>
      <BgImage />
      {!isAuth && <InputAPI />}

      {ImgData &&
        ImgData.map((d) => (
          <PhotoCard
            key={`${d.id}`}
            name={d.photographer}
            src={d.src.large}
            download={d.src.landscape}
            blog={d.photographer_url}
            isLike={favorites.find((f) => f.id === d.id) ? "🩷" : "🤍"}
            onClick={() => dispatch(isLike(d))}
          />
        ))}
    </>
  );
};

export default SearchResult;
