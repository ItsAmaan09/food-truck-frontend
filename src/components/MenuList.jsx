import React from "react";
import DishItem from "./DishItem";

export default function MenuList({ dishes, onDelete, onUpdate, token }) {
  return (
    <div>
      {dishes.length === 0 ? (
        <p>No dishes yet.</p>
      ) : (
        dishes.map((d) => <DishItem key={d._id} dish={d} onDelete={onDelete} onUpdate={onUpdate} token={ token} />)
      )}
    </div>
  );
}
