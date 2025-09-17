import Button from "../Button";
import { setAuthModal } from "../../features/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";
const AuthModal = () => {
  const { authModal } = useSelector((state: any) => state.search);
  const dispatch = useDispatch();
  return (
    <div className="authModal fixed inset-0 z-50 mt-20 flex justify-center border bg-black/50 backdrop-blur-sm">
      <Zoom>
        <div className="flex min-h-50 w-[92vw] max-w-lg flex-col items-center justify-between gap-4 border border-white/50 bg-black pt-10 pb-5 text-2xl text-white">
          <p>{authModal.text}</p>
          <Button
            label="Confirm"
            onClick={() => {
              dispatch(setAuthModal({ status: false, text: "" }));
            }}
            otherStyle="hover:bg-white hover:text-black px-3 py-2 rounded"
          />
        </div>
      </Zoom>
    </div>
  );
};

export default AuthModal;
