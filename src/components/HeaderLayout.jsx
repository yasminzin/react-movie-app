import React from "react";
import { Outlet } from "react-router";
import NavbarComp from "./NavbarComp";

export default function HeaderLayout() {
  return (
    <div>
      <NavbarComp />
      <Outlet />
    </div>
  );
}
