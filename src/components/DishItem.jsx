export default function DishItem({ dish, onDelete, token }) {
  const handleDelete = async () => {
    if (!token) return alert("Login required");
    const res = await fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/menu/${
        dish._id
      }`,
      {
        method: "DELETE",
        headers: { Authorization: token },
      }
    );
    if (res.ok) {
      onDelete(dish._id);
      alert(`Item ${dish.item} removed`);
    } else alert("Delete failed");
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 10,
        marginBottom: 8,
        borderRadius: 6,
      }}
    >
      <strong>{dish.item}</strong> - ${dish.price}
      <div style={{ marginTop: 8 }}>
        <button style={{ marginRight: 8 }} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
