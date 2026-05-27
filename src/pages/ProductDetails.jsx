import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setProduct(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-red-500 p-10">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl object-cover"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl text-green-400 mb-4">
            ${product.price}
          </p>

          <p className="text-gray-300 mb-6">
            {product.description}
          </p>

          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold">
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}