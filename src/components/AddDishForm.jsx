import { useState } from "react";

export default function AddDishForm({ onAdd, token }) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!item || !price) return alert("Fill Fields");

    const body = { item, price: Number(price) };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/menu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: token } : {}),
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) throw new Error("Add Failed");
      const newDish = await res.json();
      onAdd(newDish);
      alert(` ${newDish.item} Added successfully`);
      setItem("");
      setPrice("");
    } catch (err) {
      console.error("Failed to Add: ", err);
      alert("Failed to add dish. Check console and auth.");
    }
  };

  return (
    <form style={{ marginTop: 12 }} onSubmit={submit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Dish name"
      />
      <input
        style={{ marginLeft: 6 }}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Dish price"
      />
      <button type="submit" style={{marginLeft:6}}>Add Dish</button>
    </form>
  );
}
