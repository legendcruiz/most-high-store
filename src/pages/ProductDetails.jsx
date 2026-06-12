import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { fallbackProducts } from "../data/fallbackProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setProduct(data);
      } else {
        setProduct(
          fallbackProducts.find((item) => String(item.id) === String(id)) ||
            null
        );
      }

      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  async function sendMessage() {
    if (!user) {
      alert("Login required");
      return;
    }

    if (!message.trim()) {
      alert("Write a message");
      return;
    }

    const { error } = await supabase.from("messages").insert([
      {
        sender_email: user.email,
        message: message.trim(),
        product_name: product.name,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    setMessage("");
    setShowMessage(false);
    alert("Message sent successfully");
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center">Loading...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-red-500 p-10 text-center">
          Product not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded"
        />

        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-orange-500 text-2xl font-bold mt-2">
            ${Number(product.price).toLocaleString()}
          </p>

          <p className="text-gray-600 mt-3">
            {product.description}
          </p>

          {product.category === "Cars" && (
            <div className="mt-5 bg-gray-100 p-4 rounded">
              <h2 className="font-bold mb-2">Vehicle Details</h2>
              <p>Year: {product.year || "Not listed"}</p>
              <p>Mileage: {product.mileage || "Not listed"}</p>
              <p>Fuel: {product.fuel || "Not listed"}</p>
              <p>Transmission: {product.transmission || "Not listed"}</p>
              <p>Location: {product.location || "Not listed"}</p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="bg-black text-white px-6 py-3 rounded w-full"
            >
              Add To Cart
            </button>

            <button
              onClick={() => setShowMessage((current) => !current)}
              className="bg-blue-500 text-white px-6 py-3 rounded"
            >
              Chat
            </button>
          </div>

          {showMessage && (
            <div className="mt-6">
              <textarea
                placeholder="Ask seller a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-3 rounded w-full"
                rows="4"
              />

              <button
                onClick={sendMessage}
                className="bg-black text-white px-6 py-3 rounded mt-3"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
