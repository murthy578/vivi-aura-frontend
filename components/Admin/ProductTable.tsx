"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  category_name: string;
  product_name: string;
  price: number;
  mrp: number;
  stock: number;
  brand: string;
  featured: number;
  status: string;
  image: string | null;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter((product) =>
      product.product_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (product.brand || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProducts(result);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#111] rounded-3xl p-10 text-center text-white">
        Loading Products...
      </div>
    );
  }
    return (
    <div className="bg-[#111] rounded-3xl overflow-hidden">

      {/* Search */}
      <div className="p-6 border-b border-gray-800">
        <input
          type="text"
          placeholder="🔍 Search Product, Category or Brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1A1A1A] text-white px-5 py-4 rounded-xl outline-none"
        />
      </div>

      <table className="w-full">

        <thead className="bg-[#1A1A1A]">
          <tr>
            <th className="p-5 text-left text-gray-300">Image</th>
            <th className="p-5 text-left text-gray-300">Category</th>
            <th className="p-5 text-left text-gray-300">Product</th>
            <th className="p-5 text-left text-gray-300">Price</th>
            <th className="p-5 text-left text-gray-300">MRP</th>
            <th className="p-5 text-left text-gray-300">Brand</th>
            <th className="p-5 text-left text-gray-300">Stock</th>
            <th className="p-5 text-left text-gray-300">Featured</th>
            <th className="p-5 text-left text-gray-300">Status</th>
            <th className="p-5 text-left text-gray-300">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-800 hover:bg-[#1A1A1A] transition"
            >

              <td className="p-5">
                {product.image ? (
                  <Image
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.product_name}
                    width={70}
                    height={70}
                    className="rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-[70px] h-[70px] bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
              </td>

              <td className="p-5 text-white">
                {product.category_name}
              </td>

              <td className="p-5 text-white font-semibold">
                {product.product_name}
              </td>

              <td className="p-5 text-green-400 font-semibold">
                ₹{product.price}
              </td>

              <td className="p-5 text-gray-400">
                ₹{product.mrp}
              </td>

              <td className="p-5 text-white">
                {product.brand || "-"}
              </td>

              <td className="p-5 text-white">
                {product.stock}
              </td>

              <td className="p-5">
                {product.featured ? (
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </span>
                ) : (
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                    No
                  </span>
                )}
              </td>

              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {product.status}
                </span>
              </td>

              <td className="p-5">
                <div className="flex gap-3">

                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}

          {filteredProducts.length === 0 && (
            <tr>
              <td
                colSpan={10}
                className="text-center text-gray-400 py-12"
              >
                No Products Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}