import { useState } from "react";
import "./AddTodo.css";
import { useForm } from "react-hook-form";
import {GiNotebook} from 'react-icons/gi'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddTodo() {
  let [error, setError] = useState("");

 
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();

 
  const createUser = (newUser) => {
   
    newUser.id=Math.floor(Math.random() * 100);
    axios
      .post("http://localhost:4000/users", newUser)
      .then((res) => {
        if (res.status == 201) {
       
          setError("");
          navigate("/todos");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((err) => {
       
        if (err.response) {
   
          setError(err.message);
        
        } else if (err.request) {
          setError(err.message);
        
        } else {
          setError(err.message);
        }
      });
  };
  return (
    <div className="add-user ">
    <p className="display-3 text-center user">CREATE NEW TODO</p>
   
    {error.length !== 0 && (
      <p className="text-danger fw-bold display-2 text-center">{error}</p>
    )}
    <div className="row ">
      <div className="col-11 col-sm-8  col-md-11 mx-auto ">
        <form onSubmit={handleSubmit(createUser)}>
      
          <div className="form-floating mb-3  c">
            <input
              type="text"
              className="form-control mb-3"
              id="name"
              placeholder="add a new todo"
              {...register("todo",{required:true})}
            />
         
            
            <label htmlFor="todo ">add a new todo</label>
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

          </div>
          <button type="submit" className="float-end btn add-user-btn btn-success">
              
          <GiNotebook
            style={{
              marginRight: "5px",
              fontSize: "2.5rem",
              
            }}
          />
              Add to list
            </button>
        
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddTodo