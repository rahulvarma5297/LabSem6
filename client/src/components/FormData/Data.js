import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "../Btn.css";
import "./Data.css";

const Home = () => {
  const [user, setUser] = useState({});
  const [updated, setUpdated] = useState(false);
  const [image, setImage] = useState(null);
  const [getdata, setGetdata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, [updated]);
  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const user = JSON.parse(localStorage.getItem("user"));
    formData.append("name", user.name);
    axios.post("http://localhost:9000/upload", formData).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUpdated(!updated);
        alert("Success");
      } else alert("Failed");
    });
  };

  return (
    <>
      <Navbar />
      <>
        <header className="App-header"></header>
        {user && (
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
              className="btn btn-data"
            >
              Logout
            </button>
          </div>
        )}
        {user ? (
          <>
            <form onSubmit={submitHandler}>
              <input type="file" name="image" onChange={changeHandler} />
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
            <h1>Details</h1>
            <table>
              <tbody>
                <tr>
                  <td style={{ width: "50px" }}>
                    {user.image ? (
                      <div style={{ backgroundColor: "black" }}>
                        <img
                          src={user.image}
                          alt="user"
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <h3>Please Upload the Image</h3>
                    )}
                  </td>
                  <tr>Name: {user.name}</tr>
                  <tr>Email: {user.email}</tr>
                </tr>
              </tbody>
            </table>

            <button
              onClick={() => {
                axios
                  .get(`http://localhost:9000/getdata/${user.name}`)
                  .then((res) => {
                    setGetdata(res.data);
                    console.log(res.data);
                  });
              }}
              className="btn"
            >
              Show Data
            </button>
            <table>
              <thead>
                <tr>
                  <th>name</th>
                  <th>address</th>
                  <th>age</th>
                  <th>state</th>
                  <th>problem</th>
                  <th> Delete</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((data) => {
                  return (
                    <tr key={data._id}>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.age}</td>
                      <td>{data.state}</td>
                      <td>{data.problem}</td>
                      <td>
                        <button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:9000/delete/${data._id}`
                              )
                              .then((res) => {
                                console.log(res);
                                alert("Deleted");
                              });
                          }}
                          className="btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: "40px" }}>
              Please{" "}
              <button
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
                className="btn btn-data"
              >
                Login
              </button>
            </h1>
          </>
        )}
      </>
    </>
  );
};

export default Home;
