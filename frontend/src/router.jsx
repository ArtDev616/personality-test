import { memo } from "react";

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components";

import Home from "./views/Home";
import Evaluation from "./views/Evaluation";
import Final from "./views/Final";

import { ROUTES } from "./settings/constants";

const routes = [
  { path: ROUTES.HOME, element: Home },
  { path: ROUTES.EVALUATION, element: Evaluation },
  { path: ROUTES.FINAL, element: Final },
];

const PublicRoutes = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Component = route.element;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
      </Routes>
    </Router>
  );
};

export default memo(PublicRoutes);
