import React from "react";
import DishItem from "./DishItem";

export default function MenuList({ dishes, onDelete, token }) {
  return (
    <div>
      {dishes.length === 0 ? (
        <p>No dishes yet.</p>
      ) : (
        dishes.map((d) => <DishItem key={d._id} dish={d} onDelete={onDelete} token={ token} />)
      )}
    </div>
  );
}
