import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      setMessages(data || []);
    }

    fetchMessages();

    // realtime updates
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [
            payload.new,
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Customer Messages
      </h1>

      {messages.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <div className="flex justify-between mb-2">
                <h2 className="font-bold">
                  {msg.sender_email}
                </h2>

                <p className="text-sm text-gray-400">
                  {new Date(
                    msg.created_at
                  ).toLocaleString()}
                </p>
              </div>

              <p className="text-orange-500 mb-2">
                Product: {msg.product_name}
              </p>

              <p className="text-gray-700">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
