import React, { Component } from "react";
import "./home-component..css";

import ContenList from "../../components/content-list/content-list-component";
import Input from "../../components/input/input-component";
import Select from "../../components/select/select-component";
import ApiManager from "../../../helpers/ApiManager";

class HomeComponent extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      firstNameError: false,
      lastName: "",
      lastNameError: false,
      age: "",
      ageError: false,
      gender: "",
      genderError: false,
      userType: "",
      userTypeError: false,
      locationVal: "",
      locationValError: false,
      userList: [],
      createLoader: false,
      errorFields: false,
      btnLabel: "Add",
    };
    this.userId = "";
  }

  componentDidMount() {
    this.getUsers();
  }

  // add a user
  addUser = () => {
    const {
      firstName,
      lastName,
      age,
      gender,
      userType,
      locationVal,
    } = this.state;
    this.setState({
      createLoader: true,
    });

    // User fields check if empty 
    if (firstName === "") {
      return this.setState({
        firstNameError: true,
        createLoader: false,
      });
    }
    if (lastName === "") {
      return this.setState({
        lastNameError: true,
        createLoader: false,
      });
    }
    if (age === "") {
      return this.setState({
        ageError: true,
        createLoader: false,
      });
    }

    if (locationVal === "") {
      return this.setState({
        locationValError: true,
        createLoader: false,
      });
    }

    if (userType === "") {
      return this.setState({
        userTypeError: true,
        createLoader: false,
      });
    }
    if (gender === "") {
      return this.setState({
        genderError: true,
        createLoader: false,
      });
    }

    // add user 
    if (this.state.btnLabel === "Add") {
      new ApiManager()
        .addUser(firstName, lastName, age, gender, userType, locationVal)
        .then((result) => {
          if (result.no_result) {
            this.setState({
              createLoader: false,
            });
            return;
          }
          if (result.error) {
            this.setState({
              createLoader: false,
            });
            return;
          }
          if (result) {
            if (result.data) {
              this.getUsers();
              this.setState({
                firstName: "",
                firstNameError: false,
                lastName: "",
                lastNameError: false,
                age: "",
                ageError: false,
                gender: "None",
                genderError: false,
                userType: "None",
                userTypeError: false,
                locationVal: "",
                locationValError: false,
                createLoader: false,
              });
            }
          }
        });
    } else {
      // update user 
      new ApiManager()
        .updateUser(
          this.userId,
          firstName,
          lastName,
          age,
          gender,
          userType,
          locationVal
        )
        .then((result) => {
          if (result.no_result) {
            this.setState({
              createLoader: false,
            });
            return;
          }
          if (result.error) {
            this.setState({
              createLoader: false,
            });
            return;
          }
          if (result) {
            if (result.data) {
              this.getUsers();
              this.setState({
                firstName: "",
                firstNameError: false,
                lastName: "",
                lastNameError: false,
                age: "",
                ageError: false,
                gender: "None",
                genderError: false,
                userType: "None",
                userTypeError: false,
                locationVal: "",
                locationValError: false,
                createLoader: false,
                btnLabel: "Add",
              });
            }
          }
        });
    }
  };

  // getting user list
  getUsers = () => {
    new ApiManager().getUserList().then((result) => {
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
              userList: result.data.result,
              createLoader: false,
            });
          }
        }
      }
    });
  };

  // soft delete user (not from database) 
  softDeleteUser = (id) => {
    new ApiManager().softDeleteUser(id).then((result) => {
      if (result.no_result) {
        return;
      }
      if (result.error) {
        return;
      }
      if (result) {
        if (result.data) {
          this.getUsers();
        }
      }
    });
  };

  // empty user fields 
  updateUserField = (userData) => {
    console.log("userData", userData);
    this.userId = userData._id;
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      gender: userData.gender,
      userType: userData.userType,
      locationVal: userData.locationVal,
      btnLabel: "Update",
    });
  };

  render() {
    return (
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="user-info">
                <h3>User Info</h3>
                <div
                  className="card"
                  style={{
                    width: "18rem",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title"> </h5>
                    <p className="card-text">
                      Username{" "}
                      {this.state.firstName + " " + this.state.lastName}
                    </p>
                    <p className="card-text">Age {this.state.age}</p>
                    <p className="card-text">Gender {this.state.gender}</p>
                    <p className="card-text">
                      Location {this.state.locationVal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm">
              <div className="user-list">
                <h3>User List</h3>
                <ContenList
                  userList={this.state.userList}
                  deleteUser={this.softDeleteUser}
                  updateUser={this.updateUserField}
                />
              </div>
              <div className="add-user">
                <h3>Add User</h3>
                <div className="user-add-inputs">
                  <div className="row">
                    <div className="col-sm">
                      <Input
                        error={this.state.firstNameError}
                        inputLabel="First Name"
                        inputType="text"
                        inputPlaceholder="First Name"
                        changeHandler={(e) => {
                          this.setState({
                            firstName: e.target.value,
                          });
                        }}
                        value={this.state.firstName}
                      />

                      <Input
                        error={this.state.ageError}
                        inputLabel="Age"
                        inputType="number"
                        inputPlaceholder="Age"
                        changeHandler={(e) => {
                          let agee = e.target.value;
                          if (agee < 0) {
                            this.setState({
                              age: 0,
                            });
                          } else {
                            this.setState({
                              age: agee,
                            });
                          }
                        }}
                        value={this.state.age}
                      />

                      <Select
                        error={this.state.userTypeError}
                        selectLabel="User Type"
                        value={this.state.userType}
                        changeSelectHandler={(e) => {
                          this.setState({
                            userType: e.target.value,
                          });
                        }}
                      >
                        {" "}
                        <option defaultValue value="None">
                          None
                        </option>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </Select>
                    </div>

                    <div className="col-sm">
                      <Input
                        error={this.state.lastNameError}
                        inputLabel="Last Name"
                        inputType="text"
                        inputPlaceholder="Last Name"
                        changeHandler={(e) => {
                          this.setState({
                            lastName: e.target.value,
                          });
                        }}
                        value={this.state.lastName}
                      />

                      <Input
                        error={this.state.locationValError}
                        inputLabel="Location"
                        inputType="text"
                        inputPlaceholder="Location"
                        changeHandler={(e) => {
                          this.setState({
                            locationVal: e.target.value,
                          });
                        }}
                        value={this.state.locationVal}
                      />

                      <Select
                        error={this.state.genderError}
                        selectLabel="Gender"
                        value={this.state.gender}
                        changeSelectHandler={(e) => {
                          this.setState({
                            gender: e.target.value,
                          });
                        }}
                      >
                        <option defaultValue value="None">
                          None
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </div>
                </div>
                <button
                  style={{ width: "150px", marginTop: "20px" }}
                  className="btn btn-primary"
                  onClick={() => {
                    this.addUser();
                  }}
                >
                  {this.state.createLoader ? (
                    <div className="spinner-grow spinner-grow-sm" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    this.state.btnLabel
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
