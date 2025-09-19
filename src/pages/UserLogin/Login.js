import { useState } from "react";
import API from "../../api/api";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import './Login.css';
import React from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      setToken(res.data.data.token);
      navigate("/inventory");
    } catch (err) {
      alert("Login failed");
    }
  };

  const useMasterUser = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="default-creds">
        <button onClick={useMasterUser} type="button">
          Use Master User
        </button>
      </div>
    </div>
  );
};

export default Login;
