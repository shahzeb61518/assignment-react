import React from "react";

import "./content-list-component.css";

function ContentList({ userList, deleteUser, updateUser, text, notDeleted }) {
  return (
    <div className="content-list">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">UserName</th>
            <th scope="col">Gender</th>
            <th scope="col">Delete?</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length > 0 ? (
            userList.map((item, k) => {
              return (
                <tr key={k}>
                  <td>
                    {" "}
                    <a
                      onClick={() => {
                        if (notDeleted) {
                        } else {
                          updateUser(item);
                        }
                      }}
                      className="card-link"
                    >
                      {item.firstName + " " + item.lastName}
                    </a>
                  </td>
                  <td>{item.gender}</td>
                  <td>
                    {notDeleted ? (
                      <button disabled className="btn btn-danger">
                        delete
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          deleteUser(item._id);
                        }}
                        className="btn btn-danger"
                      >
                        delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td>{text ? text : "No user added"}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ContentList;
