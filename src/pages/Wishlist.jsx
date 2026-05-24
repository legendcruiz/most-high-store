import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Wishlist() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    const { data: wishlist } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_email", user.email);

    if (!wishlist) return;

    const productIds = wishlist.map(
      (item) => item.product_id
    );

    if (productIds.length === 0) {
      setItems([]);
      return;
    }

    const { data: products } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    setItems(products || []);
  }

  async function removeFromWishlist(id) {
    await supabase
      .from("wishlist")
      .delete()
      .eq("product_id", id)
      .eq("user_email", user.email);

    fetchWishlist();
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        My Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No wishlist items yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold">
                    {product.name}
                  </h2>

                  <p className="text-orange-500 font-bold mt-2">
                    $
                    {Number(product.price).toLocaleString()}
                  </p>
                </div>
              </Link>

              <button
                onClick={() =>
                  removeFromWishlist(product.id)
                }
                className="bg-red-500 text-white w-full py-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}