"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default to Home

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
  }, [menuOpen]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Handle Home Button Click
  const handleHomeClick = () => {
    setSelectedCategory("all"); // Set Home as active
  };

  // Function to determine active class
  const getLinkClass = (category) => {
    return selectedCategory === category
      ? "text-black font-semibold border-b-2 border-black pb-1" // Active class with underline
      : "hover:text-gray-300";
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-6 text-black bg-white">
        <h1 className="text-2xl font-bold">Esha&apos;s Beddings</h1>

        {/* Full Menu for Larger Screens */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <button
              onClick={handleHomeClick}
              className={getLinkClass("all")} // Home is active by default
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("bedding")}
              className={getLinkClass("bedding")}
            >
              Bedding
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("pillows")}
              className={getLinkClass("pillows")}
            >
              Pillows
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("duvets")}
              className={getLinkClass("duvets")}
            >
              Duvets
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedCategory("essentials")}
              className={getLinkClass("essentials")}
            >
              Cozy Essentials
            </button>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-black py-4 space-y-4 text-center z-50">
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
          <ul className="space-y-6 text-lg">
            <li>
              <button
                onClick={() => {
                  handleHomeClick();
                  setMenuOpen(false);
                }}
                className={`block py-2 px-4 ${selectedCategory === "all" ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("bedding");
                  setMenuOpen(false);
                }}
                className={`block py-2 px-4 ${selectedCategory === "bedding" ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
              >
                Bedding
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("pillows");
                  setMenuOpen(false);
                }}
                className={`block py-2 px-4 ${selectedCategory === "pillows" ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
              >
                Pillows
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("duvets");
                  setMenuOpen(false);
                }}
                className={`block py-2 px-4 ${selectedCategory === "duvets" ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
              >
                Duvets
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("essentials");
                  setMenuOpen(false);
                }}
                className={`block py-2 px-4 ${selectedCategory === "essentials" ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
              >
                Cozy Essentials
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Page Content */}
      {loading ? (
        <p className="text-center text-black text-xl w-full">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 my-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="hover:border rounded-lg p-4 shadow-md">
                <Image src={product.image} alt={product.name} width={300} height={200} className="w-full rounded-lg" />
                <h2 className="text-xl text-black font-semibold mt-2">{product.name}</h2>
                <p className="text-black">{product.description}</p>
                <p className="text-lg text-black font-bold mt-2">₦{product.price}</p>
                <Link
                  href={`https://wa.me/2349017912829?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}%20for%20₦${product.price}`}
                  className="block bg-black text-white text-center mt-4 py-2 rounded-lg"
                >
                  Order Now
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl w-full col-span-3">No products in this category</p>
          )}
        </div>
      )}
    </div>
  );
}
