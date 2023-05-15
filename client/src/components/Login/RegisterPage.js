import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
import "../Btn.css";

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/register", userDetails).then((res) => {
      if (res.status === 200) {
        alert("Success");
        navigate("/");
      } else {
        alert("Failed");
      }
    });
  };
  return (
    <>
      <Navbar />
      <header className="App-header"></header>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={changeHandler}
          value={userDetails.name}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={changeHandler}
          value={userDetails.email}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={changeHandler}
          value={userDetails.password}
        />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={changeHandler}
          value={userDetails.confirmPassword}
        />
        <br />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
