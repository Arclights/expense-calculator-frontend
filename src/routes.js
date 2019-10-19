import React from "react";
import ListExpenses from "pages/ListExpenses";
import UniversalRouter from "universal-router";
import Expense from "./pages/Expense";

export default new UniversalRouter({
  path: "/",
  children: [
    { path: "/", action: () => <ListExpenses /> },
    {
      path: "/expense/:year/:month",
      action: (ctx, { year, month }) => <Expense />
    }
  ]
});
