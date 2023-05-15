import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "../Btn.css";

const Form = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name } = JSON.parse(localStorage.getItem("user"));
    const newdata = { ...data, name };

    axios.post("http://localhost:9000/formdata", newdata).then((res) => {
      if (res.status === 200) {
        alert("Success");
        navigate("/data");
      } else {
        alert("Failed");
      }
    });
  };

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
              value={data.name}
            />
            <br />

            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={changeHandler}
              value={data.address}
            />
            <br />

            <input
              type="text"
              name="age"
              placeholder="Enter your age"
              onChange={changeHandler}
              value={data.age}
            />
            <br />

            <input
              type="text"
              name="state"
              placeholder="Enter your state"
              onChange={changeHandler}
              value={data.state}
            />
            <br />

            <input
              type="text"
              name="problem"
              placeholder="Enter your problem"
              onChange={changeHandler}
              value={data.problem}
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
  );
};

export default Form;
