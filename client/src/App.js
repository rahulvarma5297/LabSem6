import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/FormData/Data";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Login/RegisterPage";
import Form from "./components/FormData/Form";
import DoctorData from "./components/FormData/DoctorData";
import Admin from "./components/Admin/Admin";
import Fee from "./components/FormData/Fee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/data" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/doctordata" element={<DoctorData />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/fee" element={<Fee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
