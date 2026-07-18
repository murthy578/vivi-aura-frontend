"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/categories"
      );

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Reload categories after delete
        fetchCategories();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend.");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111] rounded-3xl p-10 text-center text-white">
        Loading Categories...
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-3xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#1A1A1A]">
          <tr>
            <th className="text-left p-5 text-gray-300">
              Category
            </th>

            <th className="text-left p-5 text-gray-300">
              Products
            </th>

            <th className="text-left p-5 text-gray-300">
              Status
            </th>

            <th className="text-left p-5 text-gray-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-gray-800"
            >
              <td className="text-white p-5">
                {category.name}
              </td>

              <td className="text-gray-400 p-5">
                0
              </td>

              <td className="text-green-400 p-5">
                Active
              </td>

              <td className="p-5">
                <div className="flex gap-3">
                  <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="text-center text-gray-400 py-10"
              >
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}