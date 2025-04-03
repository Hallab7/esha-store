"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; 
import { Menu, X } from "lucide-react";
import logo from "@/assets/esha-logo.png"; // Import logo from assets
import Link from "next/link"; // Import Link from next/link

export default function Navbar({ selectedCategory, setSelectedCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleHomeClick = () => setSelectedCategory("all");

  const getLinkClass = (category) =>
    selectedCategory === category
      ? "text-black font-semibold border-b-2 border-black pb-1"
      : "hover:text-gray-300";

  return (
    <nav className="flex justify-between items-center py-4 px-6 text-black bg-white">
      {/* Logo wrapped in Link to make it clickable and navigate to home */}
      <div className="flex items-center">
        <Link href="/" onClick={handleHomeClick}>
          <Image src={logo} alt="Esha's Beddings Logo" width={160} height={100} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <button onClick={handleHomeClick} className={getLinkClass("all")}>
            Home
          </button>
        </li>
        {["bedding", "pillows", "duvets", "essentials"].map((category) => (
          <li key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={getLinkClass(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-black py-4 text-center z-50">
          <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
          <ul className="space-y-6 text-lg mt-10">
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
            {["bedding", "pillows", "duvets", "essentials"].map((category) => (
              <li key={category}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setMenuOpen(false);
                  }}
                  className={`block py-2 px-4 ${
                    selectedCategory === category ? "bg-black text-white" : "hover:bg-black hover:text-white"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
