import React from "react";
import ListCalculations from "pages/ListCalculations";
import UniversalRouter from "universal-router";
import Calculation from "./pages/Calculation";

export default new UniversalRouter({
  path: "/",
  children: [
    { path: "/", action: () => <ListCalculations /> },
    {
      path: "/expense/:year/:month",
      action: (ctx, { year, month }) => <Calculation year={year} month={month} />
    },
    {
      path: "(.*)",
      action: () => <h1>Not found</h1>
    }
  ]
});
