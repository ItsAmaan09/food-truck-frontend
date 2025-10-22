import { Routes, Link, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const handleLogin = (t) => setToken(t);
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <nav style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}> 
            <Link to="/">Home</Link>
            <button  onClick={handleLogout}>Logout</button>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      )}
    </div>
  );
}
