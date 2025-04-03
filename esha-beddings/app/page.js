"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingCategory, setLoadingCategory] = useState(false); // Track loading state when category is clicked

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Handle category change with loading state
  const handleCategoryChange = (category) => {
    setLoadingCategory(true); // Show loading when category changes
    setSelectedCategory(category);

    // Simulate a delay for loading state
    setTimeout(() => {
      setLoadingCategory(false); // Hide loading after some time (simulated delay)
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <Navbar selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />
      <ProductList products={filteredProducts} loading={loading || loadingCategory} />
    </div>
  );
}
