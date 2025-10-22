import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import AddDishForm from "./AddDishForm";
import '../styles/dashboard.css'
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Dashboard() {
  const [dishes, setDishes] = useState([]);
  const [token] = useState(localStorage.getItem("token") || null);
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
    <div className="container">
      <h1 style={{textAlign:'center'}}>🍔 Food Truck Dashboard</h1>
      <div style={{textAlign:'center'}}>
        <AddDishForm onAdd={handleAdd} token={token}></AddDishForm>
        <MenuList dishes={dishes} onDelete={handleDelete} token={token} />
      </div>
    </div>
  );
}
