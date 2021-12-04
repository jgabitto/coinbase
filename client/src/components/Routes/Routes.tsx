import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import LandingPageView from "../Views/LandingPage/LandingPageView";

const routes = [
  {
    path: "/",
    route: <LandingPageView />,
  },
];

const Routes = (): JSX.Element => {
  return (
    <Switch>
      {routes.map((item, i) => {
        console.log(item);
        return <Route key={i} path={item.path} element={item.route} />;
      })}
      {/* <Route path="*" element={<Navigate to="/not-found-cover" />} /> */}
    </Switch>
  );
};

export default Routes;
