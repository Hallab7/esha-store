import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ products, loading }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (productId) => {
    setExpanded((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  if (loading) {
    return <p className="text-center text-black text-xl w-full">Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-4 my-6">
      {products.length > 0 ? (
        products.map((product) => {
          const isExpanded = expanded[product._id];
          const shortDescription = product.description.slice(0, 80);
          const shouldShowSeeMore = product.description.length > 80;

          return (
            <div key={product._id} className="hover:border rounded-lg p-4 shadow-lg">
              <Image src={product.image} alt={product.name} width={300} height={200} className="h-[250px] w-full rounded-lg" />
              <h2 className="text-xl text-black font-semibold mt-2">{product.name}</h2>
              <p className="text-black">
                {isExpanded ? product.description : product.description.length > 80 ? `${shortDescription}...` : shortDescription }
              </p>
              {shouldShowSeeMore && (
                <button
                  onClick={() => toggleExpand(product._id)}
                  className="text-black mt-1 text-sm hover:underline font-bold cursor-pointer"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
              <p className="text-lg text-black font-bold mt-2">₦{product.price}</p>
              <Link
                href={`https://wa.me/2349055625989?text=I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                className="block border-2 text-black hover:bg-black hover:text-white text-center mt-4 py-2 rounded-lg w-1/3  transition duration-300"
                target="_blank"
              >
                Order Now
              </Link>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 text-xl w-full col-span-3">No products in this category</p>
      )}
    </div>
  );
}
