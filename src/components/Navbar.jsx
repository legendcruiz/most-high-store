import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();

  const { search, setSearch, category, setCategory } = useProducts();
  const { user, signOut } = useAuth();

  const cartCount = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <Link to="/" className="shrink-0">
            <h1 className="text-3xl font-black tracking-widest">
              THE MOST HIGH
            </h1>
          </Link>

          <div className="flex flex-1 w-full max-w-3xl gap-2">
            <input
              type="text"
              placeholder="Search products, cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-0 px-4 py-3 rounded-lg text-black outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-32 px-3 py-3 rounded-lg text-black"
            >
              <option value="all">All</option>
              <option value="Phones">Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="Gaming">Gaming</option>
              <option value="Fashion">Fashion</option>
              <option value="Cars">Cars</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <Link to="/notifications">Notifications</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/cart">Cart ({cartCount})</Link>

            {user?.email === "legendcruiz18@gmail.com" && (
              <>
                <Link to="/admin">Admin</Link>
                <Link to="/messages">Inbox</Link>
              </>
            )}

            {user ? (
              <button
                type="button"
                onClick={signOut}
                className="shrink-0 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="shrink-0 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-500"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="shrink-0 bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
