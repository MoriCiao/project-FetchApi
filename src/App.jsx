import {} from "react";
import { useLocation } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import AppOutlay from "./pages/AppOutlay";
import NavigateBtn from "./components/NavigateBtn";
import Title from "./components/Title";
import { Fade } from "react-awesome-reveal";

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
      className={`homepage relative flex h-full w-full flex-col overflow-x-hidden ${pageStyle} `}
    >
      <div className="relative flex h-[20%] w-full items-center justify-center py-8 text-center lg:h-[10%]">
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
            label="首頁"
            className={`absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer transition duration-500 hover:bg-white hover:text-black`}
          />
        )}
      </div>
      <Fade className="h-full w-full">
        <div
          className={`flex h-full w-full flex-wrap items-center justify-center md:flex-nowrap ${
            pathname !== "/" ? "p-0" : "gap-4 p-20 lg:gap-15"
          }`}
        >
          <AppRoutes />
          <AppOutlay />
        </div>
      </Fade>
    </section>
  );
}

export default App;
