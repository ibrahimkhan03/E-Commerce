import React, { useState } from "react";
import { createCategory } from "../../api/categoryAPI";

const Category = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name });
      alert("Category added");
      setName("");
    } catch (err) {
      alert("Error creating category");
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Category;
