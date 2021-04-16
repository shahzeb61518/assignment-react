import React from "react";
import { ROUTES } from "../helpers/RoutePaths";

const Home = React.lazy(() => import("../views/pages/home/home-component"));
const SoftDeleted = React.lazy(() =>
  import("../views/pages/soft-deleted/soft-deleted-component")
);

const routes = [
  { path: ROUTES.home, exact: true, name: "Home", component: Home  },
  { path: ROUTES.homepage, exact: true, name: "Home page", component: Home },
  {
    path: ROUTES.softdelete,
    exact: true,
    name: "SoftDeleted",
    component: SoftDeleted,
  },
];

export default routes;
