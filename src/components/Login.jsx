import React, { useState } from "react";
import '../styles/login.css'
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/user/login`,
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
      <form onSubmit={submit} style={{ marginTop: 12 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          style={{ marginLeft: 6 }}
        />
        <button type="submit" style={{ marginLeft: 6 }}>
          Login
        </button>
      </form>
    </div>
  );
}
