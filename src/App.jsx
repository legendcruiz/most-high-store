import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<Admin />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}