import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  // FORM STATES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // IMAGE
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ADMIN EMAIL
  const adminEmail = "legendcruiz18@gmail.com";

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  }

  // IMAGE SELECT
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);

    setPreview(URL.createObjectURL(file));
  }

  // ADD PRODUCT
  async function handleAddProduct(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    // UNIQUE FILE NAME
    const fileName = `${Date.now()}-${imageFile.name}`;

    // UPLOAD TO STORAGE
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    // GET PUBLIC URL
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    // SAVE PRODUCT
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          image: publicUrl,
          description,
          category,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Product added successfully");

      // RESET FORM
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setPreview("");

      fetchProducts();
    }

    setLoading(false);
  }

  // DELETE PRODUCT
  async function handleDelete(id) {
    const confirmDelete = confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    fetchProducts();
  }

  // BLOCK NON ADMINS
  if (!user || user.email !== adminEmail) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h1 className="text-3xl font-bold text-red-500">
            Access Denied
          </h1>

          <p className="mt-2 text-gray-500">
            You are not authorized to access this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Add Product
        </h2>

        <form
          onSubmit={handleAddProduct}
          className="grid gap-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            className="border p-3 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-3 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded"
            rows="4"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          {/* IMAGE INPUT */}
          <div>
            <label className="font-semibold block mb-2">
              Upload Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* PREVIEW */}
          {preview && (
            <img
              src={preview}
              className="h-48 object-cover rounded border"
            />
          )}

          <button
            disabled={loading}
            className="bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-lg">
                {p.name}
              </h2>

              <p className="text-orange-500 font-bold mt-2">
                ₦{Number(p.price).toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {p.category}
              </p>

              <p className="text-sm mt-2 text-gray-700 line-clamp-2">
                {p.description}
              </p>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-2 rounded mt-4 w-full hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}