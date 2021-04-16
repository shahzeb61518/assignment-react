import axios from "axios";

export default class ApiManager {
  // LocalHost
  // _BASE_URL = "http://localhost:4000/api/";
  _BASE_URL = "https://assignment-nodejs.herokuapp.com/api/";

  _ADD_USER = "user/add";
  _GET_USER_LIST = "user/get";
  _UPDATE_USER = "user/update";
  _DELETE_USER = "user/delete";
  _SOFT_DELETE_USER = "user/soft-delete";
  _GET_DELETED_USERS = "user/get-deleted-user";

  //   Get Request Call
  async sendGetRequest(_url, _params, _headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);

    if (!_headers) {
      _headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios.get(_url, {
        data: _params ? _params : null,
        headers: _headers,
        timeout: 15000,
      });

      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      // console.log("catch error on ", _url, " call fail", err)
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  //   Post Request Call
  async sendPostRequest(_url, _params, _headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);
    if (!_params) {
      _params = {};
    }
    if (!_headers) {
      _headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios({
        method: "post",
        url: _url,
        headers: _headers,
        data: _params,
        timeout: 50000,
      });
      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  //   Delete Request Call
  async sendDeleteRequest(_url, _params, _headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);
    if (!_params) {
      _params = {};
    }
    if (!_headers) {
      _headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios.delete(_url, {
        data: _params ? _params : null,
        headers: _headers,
        timeout: 15000,
      });

      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  //   Put Request Call
  async sendPutRequest(_url, _params, _headers) {
    _url = this._BASE_URL + _url;
    console.log("API _url", _url);
    if (!_params) {
      _params = {};
    }
    if (!_headers) {
      _headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      let response = await axios({
        method: "put",
        url: _url,
        headers: _headers,
        data: _params,
        timeout: 50000,
      });
      console.log("API call response", response);
      return response;
    } catch (error) {
      let err = [];
      err.error = error;
      err.no_result = true;
      console.log("catch error on ", _url, " call fail", err);
      setTimeout(() => {
        alert("Unable to connect with server");
      }, 400);
      return err;
    }
  }

  //   Add User Function
  addUser(_firstName, _lastName, _age, _gender, _userType, _location) {
    let url = this._ADD_USER;
    let data = {
      firstName: _firstName,
      lastName: _lastName,
      age: _age,
      gender: _gender,
      userType: _userType,
      locationVal: _location,
    };
    console.log("data for adding>>>>>", data);
    return this.sendPostRequest(url, data, this.headers);
  }

  //   Get User List Function
  getUserList() {
    let url = this._GET_USER_LIST;
    return this.sendGetRequest(url, "", this.headers);
  }

  //   Get Deleted User List Function
  getDeletedUsers() {
    let url = this._GET_DELETED_USERS;
    return this.sendGetRequest(url, "", this.headers);
  }

  // Updating User Function
  updateUser(_id, _firstName, _lastName, _age, _gender, _userType, _location) {
    let url = this._UPDATE_USER;
    let data = {
      id: _id,
      firstName: _firstName,
      lastName: _lastName,
      age: _age,
      gender: _gender,
      userType: _userType,
      locationVal: _location,
    };
    console.log("data for updating>>", data);
    return this.sendPutRequest(url, data, this.headers);
  }

  // Delete User Funtion
  deleteUser(id) {
    let data = {
      userId: id,
    };
    let url = this._DELETE_USER;
    console.log("Delete User>>>>", data);
    return this.sendDeleteRequest(url, data, this.headers);
  }

  softDeleteUser(id) {
    let data = {
      userId: id,
    };
    let url = this._SOFT_DELETE_USER;
    console.log("Delete User>>>>", data);
    return this.sendPutRequest(url, data, this.headers);
  }
}
