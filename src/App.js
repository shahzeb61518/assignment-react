import React from "react";
import { ROUTES } from "./helpers/RoutePaths";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";

const Main = React.lazy(() => import("./Main"));
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              path={ROUTES.home}
              name="Home"
              render={(props) => <Main {...props} />}
            />
          </Switch>
          <Redirect to={ROUTES.home} />
          {/* <Soft /> */}
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
