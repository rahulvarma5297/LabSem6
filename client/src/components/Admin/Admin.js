import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "../Btn.css";
import axios from "axios";

const Admin = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setUser(user);
  }, [data]);
  return (
    <div>
      <Navbar />
      {user.name === "admin" ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>address</th>
                <th>age</th>
                <th>state</th>
                <th>problem</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
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
                            .delete(`http://localhost:9000/delete/${data._id}`)
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

          <button
            onClick={() => {
              axios.get(`http://localhost:9000/getfulldata`).then((res) => {
                setData(res.data);
                console.log(res.data);
              });
            }}
            className="btn"
          >
            Show Data
          </button>
        </div>
      ) : (
        <h1>Not Authorized</h1>
      )}
    </div>
  );
};

export default Admin;
