import React from "react";
import { Outlet, Route, Routes } from "react-router";
import SearchImg from "../pages/SearchImg";
import OtherAPI from "../pages/OtherAPI";
import HomePage from "../pages/HomePage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="searchImg" element={<SearchImg />} />
        <Route path="otherApi" element={<OtherAPI />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
