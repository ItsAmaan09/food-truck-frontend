import { useState } from "react";
import "../styles/dishItem.css";

export default function DishItem({ dish, onDelete, onUpdate, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(dish.item);
  const [price, setPrice] = useState(dish.price);
  const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleDelete = async () => {
    if (!token) return alert("Login required");

    const confirmDelete = window.confirm(`Are you sure you want to delete "${dish.item}"?`);
    if(!confirmDelete) return;
    const res = await fetch(`${API}/menu/${dish._id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    if (res.ok) {
      onDelete(dish._id);
      alert(`Item ${dish.item} removed`);
    } else alert("Delete failed");
  };

  const handleSave = async () => {
    if (!token) return alert("Login required");
    const body = { item, price: Number(price) };

    try {
      const res = await fetch(`${API}/menu/${dish._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        alert("Update failed");
        throw new Error("Update failed");
      }
      const updated = await res.json();
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed. Check console");
    }
  };

  return (
    <div className="container-dishItem">
      {isEditing ? (
        <div>
          <input style={{marginRight:'12px'}}
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
          />
        </div>
      ) : (
        <strong>{dish.item}</strong>
      )}
      {!isEditing && <span> ${dish.price}</span>}
      <div style={{ marginTop: 8 }}>
        {isEditing ? (
          <>
            <input id="saveBtn" type="button" onClick={handleSave} style={{ marginRight: 6 }} value="Save"/>
            <input type="button" onClick={() => setIsEditing(false)} value="Cancel"/>
          </>
        ) : (
          <>
            <input id="editBtn" type="button"
              onClick={() => setIsEditing(true)}
              style={{ marginRight: 6 }}
            value="Edit"/>
              
            <input type="button" onClick={handleDelete} value="Delete"/>
          </>
        )}
      </div>
    </div>
  );
}
