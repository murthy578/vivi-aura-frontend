"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

export default function ProductForm() {
  const params = useParams();
  const router = useRouter();

  const isEdit = !!params?.id;

  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [mrp, setMrp] = useState("");
const [sku, setSku] = useState("");
const [brand, setBrand] = useState("");
const [fabric, setFabric] = useState("");
const [weight, setWeight] = useState("");

const [featured, setFeatured] = useState(false);
const [newArrival, setNewArrival] = useState(false);
const [bestSeller, setBestSeller] = useState(false);
const [trending, setTrending] = useState(false);

const [status, setStatus] = useState("Active");

  useEffect(() => {
    fetchCategories();

    if (isEdit) {
      fetchProduct();
    }
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
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${params.id}`
      );

      const product = await response.json();

      setCategoryId(product.category_id.toString());
      setProductName(product.product_name);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setDescription(product.product_description || "");

      if (product.image) {
        setPreview(
          `http://localhost:5000/uploads/${product.image}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!categoryId || !productName || !price) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("category_id", categoryId);
      formData.append("product_name", productName);
      formData.append(
        "product_description",
        description
      );
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("mrp", mrp);
formData.append("sku", sku);
formData.append("brand", brand);
formData.append("fabric", fabric);
formData.append("weight", weight);

formData.append(
  "featured",
  featured ? "1" : "0"
);

formData.append(
  "new_arrival",
  newArrival ? "1" : "0"
);

formData.append(
  "bestseller",
  bestSeller ? "1" : "0"
);

formData.append(
  "trending",
  trending ? "1" : "0"
);

formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      const url = isEdit
        ? `http://localhost:5000/api/products/${params.id}`
        : "http://localhost:5000/api/products";

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      router.push("/admin/products");
    } catch (error) {
      console.error(error);

      alert("Backend connection failed.");
    }
  };

    return (
    <div className="bg-[#111] rounded-3xl p-8">

      <h2 className="text-3xl font-bold text-white mb-8">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Category */}

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {/* Product Name */}

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) =>
            setProductName(e.target.value)
          }
          className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
        />

        {/* Price */}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
        />

        {/* Stock */}

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
        />

      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-6">

  <input
    type="number"
    placeholder="MRP"
    value={mrp}
    onChange={(e) => setMrp(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  />

  <input
    type="text"
    placeholder="SKU"
    value={sku}
    onChange={(e) => setSku(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  />

  <input
    type="text"
    placeholder="Brand"
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  />

  <input
    type="text"
    placeholder="Fabric"
    value={fabric}
    onChange={(e) => setFabric(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  />

  <input
    type="text"
    placeholder="Weight"
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  />

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none"
  >
    <option value="Active">Active</option>
    <option value="Draft">Draft</option>
  </select>

</div>

      {/* Description */}

      <textarea
        placeholder="Product Description"
        rows={5}
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="bg-[#1A1A1A] text-white p-4 rounded-xl outline-none w-full mt-6 resize-none"
      />

      {/* Image Upload */}

      <div className="mt-8">

        <label className="block text-white mb-3 font-semibold">
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="text-white"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-5 w-56 h-56 object-cover rounded-2xl border border-gray-700"
          />
        )}

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

  <label className="flex items-center gap-2 text-white">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) => setFeatured(e.target.checked)}
    />
    Featured
  </label>

  <label className="flex items-center gap-2 text-white">
    <input
      type="checkbox"
      checked={newArrival}
      onChange={(e) => setNewArrival(e.target.checked)}
    />
    New Arrival
  </label>

  <label className="flex items-center gap-2 text-white">
    <input
      type="checkbox"
      checked={bestSeller}
      onChange={(e) => setBestSeller(e.target.checked)}
    />
    Best Seller
  </label>

  <label className="flex items-center gap-2 text-white">
    <input
      type="checkbox"
      checked={trending}
      onChange={(e) => setTrending(e.target.checked)}
    />
    Trending
  </label>

</div>

      {/* Buttons */}

      <div className="flex gap-4 mt-10">

        <button
          onClick={handleSubmit}
          className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {isEdit ? "Update Product" : "Save Product"}
        </button>

        <button
          onClick={() => router.push("/admin/products")}
          className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}