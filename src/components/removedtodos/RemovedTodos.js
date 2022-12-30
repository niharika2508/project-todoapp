import React, { useEffect, useState } from "react";
import "./RemovedTodos.css";
import axios from "axios";

function RemovedTodos() {
  //deleted users state
  let [deletedUsers, setDeletedUsers] = useState([]);
  //error state
  let [error, setError] = useState("");
  useEffect(() => {
    getRemovedUsers();
  }, []);

  //get removed users
  const getRemovedUsers = () => {
    axios
      .get("http://localhost:4000/removedUsers")
      .then((res) => {
        if (res.status === 200) {
          setDeletedUsers(res.data);
        } else {
          throw new Error("Something went wrong in fetcing removed users data");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          //console.log(err.response.data);
          //console.log(err.response.status);
          //console.log(err.response.headers);
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };

  //restore user
  const restoreUser = (user) => {
    axios
      .post(`http://localhost:4000/users`, user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
         
          // remove user from "users"
          axios
            .delete(`http://localhost:4000/removedUsers/${user.id}`)
            .then((res) => {
              console.log(res)
              if (res.status === 200) {
              getRemovedUsers()
              }
            });

          //clear error message
          setError("");
          //  navigate("/users");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
        // The client was given an error response (5xx, 4xx)
        if (err.response) {
          setError(err.message);
          // The client never received a response, and the request was never left
        } else if (err.request) {
          setError(err.message);
          // for other errors
        } else {
          setError(err.message);
        }
      });
  };
  

  return (
    <div className="removed-users">
       <p className="display-2 text-center fw-bold removed ">Removed Todos</p>
      {deletedUsers.length === 0 ? (
        <div className="text-center text-warning display-3 mt-5">
          <h2 className="empty">Empty</h2>
      <img src="https://th.bing.com/th/id/OIP.eUum_-GBnhgTaYbKbiLL5AHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7"/>
        </div>
      ) : (
        <ul className="removed-users-list">
          {deletedUsers.map((user) => (
            <li key={user.id}>  
                <span className="todo-name">{user.todo}</span>
              <span>
                {/* restore user button */}
                <button
                  className="user-restore-btn"
                  onClick={() => restoreUser(user)}
                >
                  Restore
                </button>

                
               
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RemovedTodos;