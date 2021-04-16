import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./app-routes/routes";
import { ROUTES } from "./helpers/RoutePaths";
import HeaderComponent from "./views/pages/common/header/header-component";

class Main extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="app">
        <main className="main">
          <HeaderComponent {...this.props}  />
          <Suspense fallback={this.loading()}>
            <Switch>
              { routes && routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect to={ROUTES.home} />
            </Switch>
          </Suspense>
        </main>
      </div>
    );
  }
}

export default Main;
