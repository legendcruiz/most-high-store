import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold">
                    {item.name}
                  </h2>

                  <p className="text-orange-500 font-bold">
                    $
                    {Number(item.price).toLocaleString()}
                  </p>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded shadow mt-6">
            <h2 className="text-2xl font-bold">
              Total: ${total.toLocaleString()}
            </h2>

            <a href="/checkout">
              <button className="bg-orange-500 text-white px-6 py-3 rounded mt-4 w-full hover:bg-orange-600">
                Proceed To Checkout
              </button>
            </a>
          </div>
        </>
      )}
    </Layout>
  );
}