import {} from "react";
import { useLocation } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import AppOutlay from "./pages/AppOutlay";
import NavigateBtn from "./components/NavigateBtn";
import Title from "./components/Title";

function App() {
  const { pathname } = useLocation();

  const pageStyle =
    pathname === "/"
      ? "bg-gradient-to-br from-amber-100 to-amber-200 p-0 "
      : pathname === "/searchImg"
      ? "bg-black p-0 "
      : pathname === "/otherApi"
      ? "bg-gradient-to-br from-zinc-500 to-zinc-800 p-0"
      : null;

  return (
    <section
      className={`homepage relative w-full h-full flex flex-col  overflow-x-hidden  ${pageStyle} `}
    >
      <div className="relative lg:h-[10%] h-[20%] py-8 w-full text-center flex items-center justify-center">
        <Title
          title={
            pathname === "/"
              ? "Fetch API"
              : pathname === "/searchImg"
              ? "Search Image"
              : pathname === "/otherApi"
              ? "Other API"
              : null
          }
          otherStyle={
            pathname === "/"
              ? "text-black"
              : pathname === "/searchImg"
              ? "text-white"
              : pathname === "/otherApi"
              ? "text-white"
              : null
          }
        />
        {pathname === "/" || (
          <NavigateBtn
            to="/"
            label="返回首頁"
            className="absolute sm:top-1/2 top-4 sm:left-5 left-4 cursor-pointer hover:bg-white hover:text-black transition duration-500"
          />
        )}
      </div>
      <div
        className={`w-full lg:h-[90%] h-full flex md:flex-nowrap flex-wrap items-center justify-center lg:gap-15 sm:gap-8 gap-4 ${
          pathname !== "/" ? "p-0" : "p-20"
        }`}
      >
        <AppRoutes />
        <AppOutlay />
      </div>
    </section>
  );
}

export default App;
