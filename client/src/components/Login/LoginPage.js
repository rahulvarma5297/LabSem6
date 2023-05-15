import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
import "../Btn.css";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9000/login", userDetails).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Success");
        navigate("/data");
      } else {
        alert("Failed");
      }
    });
  };
  return (
    <>
      <Navbar />
      <header className="App-header"></header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={changeHandler}
          value={userDetails.name}
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
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginPage;
