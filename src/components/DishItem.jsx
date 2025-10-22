import '../styles/dishItem.css'

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
    <div className="container-dishItem">
      <strong>{dish.item}</strong> 
      <strong>${dish.price}</strong>
      <div>
        <input type='button' onClick={handleDelete} value='Delete'/>
      </div>
    </div>
  );
}
