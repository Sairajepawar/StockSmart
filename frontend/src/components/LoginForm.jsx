import { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import "../login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userInput
      );
      console.log(response);

      setAuth((prevAuth) => {
        return {
          ...prevAuth,
          user: response.data.user,
          token: response.data.token,
        };
      });
      localStorage.setItem("auth", JSON.stringify(response.data));

      alert("Logged In");

      navigate(location.state || "protected/home");
    } catch (error) {
      console.log(error);
    }
  };

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = () => {
    setUserInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div className="container-login">
      <div>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="login-email"
              name="email"
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="login-password"
              name="password"
              onChange={handleInput}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
