import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    if (!user?.email) return;

    async function fetchNotifications() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", {
          ascending: false,
        });

      setNotifications(data || []);
    }

    fetchNotifications();

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          if (
            payload.new.user_email === user.email
          ) {
            setNotifications((prev) => [
              payload.new,
              ...prev,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.email]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No notifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="font-bold text-lg">
                {n.title}
              </h2>

              <p className="text-gray-700 mt-2">
                {n.message}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                {new Date(
                  n.created_at
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
