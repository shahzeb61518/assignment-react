import React, { Component } from "react";

import ContenList from "./../../components/content-list/content-list-component";
import ApiManager from "../../../helpers/ApiManager";

import "./soft-deleted-component.css";

class SoftDeletedUser extends Component {
  constructor() {
    super();
    this.state = {
      userArr: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  // getting user list
  getUsers = () => {
    new ApiManager().getDeletedUsers().then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.error) {
        return;
      }
      if (result) {
        if (result.data) {
          if (result.data.result) {
            this.setState({
              userArr: result.data.result,
            });
          }
        }
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="deleted-list">
          <h5>Deleted Users</h5>
          <ContenList
            userList={this.state.userArr}
            text="No User deleted yet..."
            notDeleted={true}
          />
        </div>
      </div>
    );
  }
}

export default SoftDeletedUser;
