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
      ? "bg-white p-0"
      : null;

  return (
    <section
      className={`homepage relative w-full h-full flex flex-col  overflow-x-hidden  ${pageStyle} `}
    >
      <div className="relative h-[10%] w-full text-center flex items-center justify-center">
        <Title
          title={
            pathname === "/"
              ? "Fetch Api"
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
              ? "text-black"
              : null
          }
        />
        {pathname === "/" || (
          <NavigateBtn
            to="/"
            label="返回首頁"
            className="absolute top-50% left-5 "
          />
        )}
      </div>
      <div
        className={`w-full h-[90%] flex items-center justify-center gap-15 ${
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
