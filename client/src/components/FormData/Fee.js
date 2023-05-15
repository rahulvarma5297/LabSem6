import React from 'react';
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../Btn.css";

const Fee = () => {
    const [user, setUser] = useState({});
    const [fee, setFee] = useState({});

    const changeHandler = (e) => {
        setFee({ ...fee, [e.target.name]: e.target.value });
        };

        const submitHandler = (e) => {
            e.preventDefault();
            alert("Success Payment");
            alert(`Name: ${fee.name} Age: ${fee.age} Problem: ${fee.problem} Fee: ${fee.fee}`);

            // clear the form
            setFee({ name: "", age: "", problem: "", fee: "" });
        }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
      }, []);

  return (
    <div>
        <Navbar />
      {user.name === "rahul" || user.name === "varma" ? (
        <>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={changeHandler}
              value={fee.name}
            />
            <br />

            <input
              type="text"
              name="age"
              placeholder="Enter your age"
              onChange={changeHandler}
              value={fee.age}
            />
            <br />

            <input
              type="text"
              name="problem"
              placeholder="Enter your problem"
              onChange={changeHandler}
              value={fee.problem}
            />
            <br />

            <input
                type="text"
                name="fee"
                placeholder="Enter your fee"
                onChange={changeHandler}
                value={fee.fee}
            />
            <br />
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>Please Login</h1>
          <h1> This is Patient Place </h1>
          <h1>Not Authorized for You </h1>
        </>
      )}
    </div>
  )
}

export default Fee
