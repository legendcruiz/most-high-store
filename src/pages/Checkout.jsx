import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          user_email: user.email,
          items: cart,
          total: total,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    clearCart();

    alert("Order placed successfully!");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold text-orange-500">
                  $
                  {(
                    item.price * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              Total: ${total.toLocaleString()}
            </h2>

            <button
              onClick={handleCheckout}
              className="bg-black text-white px-6 py-3 rounded w-full mt-4 hover:bg-gray-800"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}