import Breadcrumbs from "../components/layout/Breadcrumbs";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../api/apiClient";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { session } = useAuth();

  useEffect(() => {
    if (!session) return;

    async function loadOrders() {
      setLoading(true);
      setError("");

      try {
        const data = await apiClient(
          "/orders?select=*,order_items(*)&order=created_at.desc",
          {
            token: session.access_token,
          },
        );

        const formattedOrders = data.flatMap((order) =>
          order.order_items.map((item) => ({
            id: item.id,
            orderId: order.id,
            date: order.created_at,
            product: item.product_name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        );

        setOrders(formattedOrders);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [session]);

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "My Orders" }]} />
      <h1 className="display-text mb-8">My Orders</h1>
      {loading && (
        <div className="rounded bg-surface p-6">Loading orders...</div>
      )}
      {error && (
        <div
          role="alert"
          className="rounded border border-accent p-6 text-accent"
        >
          {error}
        </div>
      )}
      {!loading && !error && !orders.length && (
        <div className="rounded bg-surface p-10 text-center">
          <h2 className="title-text">No orders yet.</h2>
          <p className="body-small mt-2 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      )}
      {orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-foreground">
                <th className="p-3">Order ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Product</th>
                <th className="p-3">Size</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border-subtle">
                  <td className="p-3">{order.orderId}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.size}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.price.toFixed(2)}</td>
                  <td className="p-3">{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* TASK-18: TODO: Učitaj orders i order_items authenticated korisnika i upravljaj loading/error/empty stanjima. HINT: AuthContext, useEffect, useState, apiClient i Authorization Bearer token. RULE: Osloni se na postojeći RLS i nikada ne traži tuđe porudžbine. */}
    </div>
  );
}
