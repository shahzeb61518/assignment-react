import React from "react";
import { withRouter } from "react-router";
import { ROUTES } from "../../../../helpers/RoutePaths";

function HeaderComponent(props) {
  console.log("propsssssssssssss.", props);
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Assignment</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => {
                  props.history.push(ROUTES.homepage);
                }}
              >
                Home
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => {
                  props.history.push(ROUTES.softdelete);
                }}
              >
                Soft Deleted
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default withRouter(HeaderComponent);
