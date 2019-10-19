import React from "react";
import ListExpenses from "pages/ListExpenses";
import UniversalRouter from "universal-router";

export default new UniversalRouter({
  path: "/",
  children: [{ path: "/", action: () => <ListExpenses /> }]
});
