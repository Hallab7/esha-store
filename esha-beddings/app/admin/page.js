"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    adminToken: "",
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(true);
  const router = useRouter();

  const formRef = useRef(null); // 👈 Ref for the form

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      setAuthenticating(false);
      router.push("/admin/login");
    } else {
      fetchProducts();
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
      setLoading(false);
      setAuthenticating(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      setAuthenticating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, formData);
        setMessage("Product updated successfully");
      } else {
        await axios.post("/api/products", formData);
        setMessage("Product added successfully");
        console.log("Product updated successfully:", formData);
      }

      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", image: "", category: "", adminToken: "" });
      router.refresh();
    } catch (error) {
      setMessage("Error processing request");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      adminToken: "",
    });

    // 👇 Scroll to the form when editing
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
      setMessage("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  if (authenticating && loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl text-[#DBC078]">Authenticating...</p>
      </div>
    );
  }

  if (authenticating === false && !loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

        {message && <p className="text-center text-red-500">{message}</p>}

        <form
          ref={formRef} // 👈 Add the ref here
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white text-black p-6 rounded-lg shadow-lg mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full border p-2 mb-2 rounded-lg"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 mb-2 rounded-lg"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border p-2 mb-2 rounded-lg"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full border p-2 mb-2 rounded-lg"
            value={formData.image}
            onChange={handleChange}
            required
          />
          <select
            name="category"
            className="w-full border p-2 mb-2 rounded-lg"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="bedding">Bedding</option>
            <option value="pillows">Pillows</option>
            <option value="duvets">Duvets</option>
            <option value="essentials">Cozy Essentials</option>
          </select>
          <input
            type="password"
            name="adminToken"
            placeholder="Admin Token"
            className="w-full border p-2 mb-2 rounded-lg"
            onChange={handleChange}
            required
          
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg">
            {editingProduct ? "Update Product" : "Upload Product"}
          </button>
        </form>

        <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          {loading ? (
            <p className="text-center text-gray-500">Product is loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products available</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product._id} className="border p-4 mb-4 rounded-lg">
                  <h3 className="font-bold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="text-green-500 font-semibold">₦{product.price}</p>
                  <p className="text-gray-500">Category: {product.category}</p>
                  <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mt-2" />
                  <div className="mt-2 flex space-x-2">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 text-center">
          <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg">
            Logout
          </button>
        </div>
      </div>
    );
  }
}
