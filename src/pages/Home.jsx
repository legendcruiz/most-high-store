import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { search, category } = useProducts();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }

    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = String(p.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all"
        ? true
        : p.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <Layout>
      {/* HERO */}
      <div className="bg-black text-white p-10 rounded-lg mb-8">
        <h1 className="text-4xl font-bold">
          THE MOST HIGH MARKETPLACE
        </h1>
        <p className="text-gray-300 mt-2">
          Buy Cars, Phones, Fashion & More Worldwide
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-2xl transition overflow-hidden"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                className="h-48 w-full object-cover"
              />
            </Link>

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {product.name}
              </h2>

              <p className="text-gray-500 text-sm">
                Category: {product.category}
              </p>

              <p className="text-orange-500 font-bold text-xl mt-2">
                ${Number(product.price).toLocaleString()}
              </p>

              {/* CAR TAG */}
              {product.category === "Cars" && (
                <div className="mt-2 text-sm text-blue-600">
                  🚗 Vehicle Listing
                </div>
              )}

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white w-full py-2 mt-3 rounded hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
