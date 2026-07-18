"use client";

import { useState } from "react";

export default function CategoryForm() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!category.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setCategory("");

        // Refresh the page so the table updates
        window.location.reload();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111] rounded-3xl p-8"
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        Add Category
      </h2>

      <div className="flex gap-5">
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 bg-[#1A1A1A] text-white rounded-xl px-5 py-4 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black px-8 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}