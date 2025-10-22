import React, { useEffect, useState } from "react";
import MenuList from "./components/MenuList";
import AddDishForm from "./components/AddDishForm";
import Login from "./components/Login";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [dishes, setDishes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (t) => setToken(t);
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const [loading, setLoading] = useState(true);
  const handleAdd = (dish) => setDishes((prev) => [dish, ...prev]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/menu`);
        const data = await res.json();

        setDishes(data);
      } catch (err) {
        console.error("Failed to load: ", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading menu...</p>;

  const handleDelete = (id) => {
    setDishes((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🍔 Food Truck Dashboard</h1>

      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <AddDishForm onAdd={handleAdd} token={token}></AddDishForm>
          <MenuList dishes={dishes} onDelete={handleDelete} token={token} />
        </div>
      )}
    </div>
  );
}
