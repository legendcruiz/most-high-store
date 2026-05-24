import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-center">
          Loading orders...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded shadow"
            >
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(
                      order.created_at
                    ).toLocaleString()}
                  </p>
                </div>

                <h2 className="text-orange-500 font-bold text-xl">
                  ${Number(order.total).toLocaleString()}
                </h2>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold">
                      $
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}