import React, { useState, useEffect } from "react";
import "./Todo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";


function Users() {
  //users state
  let [users, setUsers] = useState([]);
  let [error, setError] = useState("");
  //state of user to edit
  let [userToEdit, setUserToEdit] = useState({});
  //useForm
  let {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //navigate hook
  let navigate = useNavigate();
  //modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //network request
  useEffect(() => getUsers(), [users.length]);

  // //create user
  const getUsers = () => {
    axios
      .get("http://localhost:4000/users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
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

  //go to Adduser
  const gotoAddUser = () => {
    navigate("/");
  };
  //delete user
  const deleteUser = (user) => {
    axios
      .post(`http://localhost:4000/removedUsers`,user)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          // remove user from "users"
          axios.delete(`http://localhost:4000/users/${user.id}`)
          .then(res=>{
            if(res.status===200){
              getUsers();
            }
          })

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
  //edit  user
  const editUser = (userToEdit) => {
    //show modal
    handleShow();
    //set user edit state
    setUserToEdit(userToEdit);
    //set values to edit for
    setValue("todo", userToEdit.todo);
    setValue("starttime",userToEdit.starttime)
    setValue("endtime",userToEdit.endtime)
    setValue("categroy",userToEdit.category)
    setValue("status",userToEdit.status)

  };

  //save modified user
  const saveUser = () => {
    //close modal
    handleClose();

    //get values from form
    let modifiedUser = getValues();
    //add id
    modifiedUser.id = userToEdit.id;
    //modify user in DB
    axios
      .put(`http://localhost:4000/users/${modifiedUser.id}`,modifiedUser)
      .then((res) => {
        if (res.status === 200) {
          //get recent users
          getUsers();
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
    <div className="container users-data ">

      {/* add user link */}
      <button className="back-to-add-user" onClick={gotoAddUser}>
        +
      </button>
      <p className="display-2 text-center fw-bold tetx ">Todo List</p>
      {/* get users data error */}

      {error.length !== 0 && (
        <p className="text-danger fw-bold display-2 text-center">{error}</p>
      )}
      {/* diaplay users data */}
      {users.length === 0 ? (
        <div className="text-center text-warning display-3 mt-5">
          Todos list is empty !!
         
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {users.map((userObj) => (
            <div className="col text-center mx-auto" key={userObj.id}>
              <div className="card">
               
                <div className="card-body">
                  <p className="display-3 name">Task:{userObj.todo}</p>
                  <p className="display-6 st">Start time:{userObj.starttime}</p>
                  <p className="display-6 end">End time:{userObj.endtime}</p>
                  <p className="display-6 categ">Category:{userObj.category}</p>
                  <p className="display-6 sta">Status:{userObj.status}</p>
                  <button
                    className="btn btn-warning float-start"
                    onClick={() => editUser(userObj)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => deleteUser(userObj)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal to edit user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit todo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-form">
          {/* edit form */}
          <form onSubmit={handleSubmit(saveUser)}>
            {/* name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="todo"
                placeholder="namexyz"
                {...register("todo")}
              />
              <label htmlFor="todo">edit task</label>
           </div>
           <select {...register("starttime")} className="form-select mb-4" defaultValue={"- - -"}>
                <option value="- - -" disabled>Start Time</option>
                <option value="1:00AM">1:00AM</option>
                <option value="2:00AM">2:00AM</option>
                <option value="3:00AM">3:00AM</option>
                <option value="4:00AM">4:00AM</option>
                <option value="5:00AM">5:00AM</option>
                <option value="6:00AM">6:00AM</option>
                <option value="7:00AM">7:00AM</option>
                <option value="8:00AM">8:00AM</option>
                <option value="9:00AM">9:00AM</option>
                <option value="10:00AM">10:00AM</option>
                <option value="11:00AM">11:00AM</option>
                <option value="12:00PM">12:00PM</option>
                <option value="1:00PM">1:00PM</option>
                <option value="2:00PM">2:00PM</option>
                <option value="3:00PM">3:00PM</option>
                <option value="4:00PM">4:00PM</option>
                <option value="5:00PM">5:00PM</option>
                <option value="6:00PM">6:00PM</option>
                <option value="7:00PM">7:00PM</option>
                <option value="8:00PM">8:00PM</option>
                <option value="9:00PM">9:00PM</option>
                <option value="10:00PM">10:00PM</option>
                <option value="11:00PM">11:00PM</option>
                <option value="12:00AM">12:00AM</option>
              </select>

              <select {...register("endtime")} className="form-select mb-4" defaultValue={"- - -"}>
                <option value="- - -" disabled>End Time</option>
                <option value="1">1:00AM</option>
                <option value="2:00AM">2:00AM</option>
                <option value="3:00AM">3:00AM</option>
                <option value="4:00AM">4:00AM</option>
                <option value="5:00AM">5:00AM</option>
                <option value="6:00AM">6:00AM</option>
                <option value="7:00AM">7:00AM</option>
                <option value="8:00AM">8:00AM</option>
                <option value="9:00AM">9:00AM</option>
                <option value="10:00AM">10:00AM</option>
                <option value="11:00AM">11:00AM</option>
                <option value="12:00PM">12:00PM</option>
                <option value="1:00PM">1:00PM</option>
                <option value="2:00PM">2:00PM</option>
                <option value="3:00PM">3:00PM</option>
                <option value="4:00PM">4:00PM</option>
                <option value="5:00PM">5:00PM</option>
                <option value="6:00PM">6:00PM</option>
                <option value="7:00PM">7:00PM</option>
                <option value="8:00PM">8:00PM</option>
                <option value="9:00PM">9:00PM</option>
                <option value="10:00PM">10:00PM</option>
                <option value="11:00PM">11:00PM</option>
                <option value="12:00AM">12:00AM</option>
              </select>

              <select {...register("category")} className="form-select mb-4" defaultValue={"- - -"}>
                <option value="- - -" disabled>Category</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="others">others</option>
                </select>
                <select {...register("status")} className="form-select mb-4" defaultValue={"- - -"}>
                <option value="- - -" disabled>Status</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
                <option value="Yet to start">Yet to start</option>
               
                </select>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;