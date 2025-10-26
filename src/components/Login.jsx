import React, { useState } from "react";
import '../styles/login.css'
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      onLogin(data.token);
      localStorage.setItem("token", data.token);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={submit} style={{ marginTop: 12 }}>
        <div className="formField">
        <input name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button className="loginBtn" type="submit" style={{ marginLeft: 6 }}>
          Login
        </button>
        </div>
      </form>
    </div>
  );
}
