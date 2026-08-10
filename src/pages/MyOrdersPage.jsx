import Breadcrumbs from "../components/layout/Breadcrumbs";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../api/apiClient";
import PageState from "../components/ui/PageState";

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

        setOrders(data);
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
      <h1 className="display-text text-center">My Orders</h1>
      <p className="body-large mx-auto mb-8 mt-3 max-w-2xl text-center text-muted-foreground">
        View your previous purchases and review the products included in each
        order.
      </p>
      {loading && <PageState type="loading" title="Loading orders..." />}
      {error && (
        <PageState
          type="error"
          title="Something went wrong"
          message={error}
        />
      )}
      {!loading && !error && !orders.length && (
        <PageState
          type="empty"
          title="No orders yet"
          message="Your completed orders will appear here."
        />
      )}
      {orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => {
            const items = Array.isArray(order.order_items)
              ? order.order_items
              : [];

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-[10px] border border-border-subtle bg-white shadow-sm"
              >
                <header className="flex flex-col gap-3 bg-surface p-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="title-text font-bold">
                      Order #{String(order.id).slice(0, 8)}
                    </h2>
                    <p className="body-small mt-1 text-muted-foreground">
                      Date: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    Total: €{Number(order.total_amount).toFixed(2)}
                  </p>
                </header>

                <div className="divide-y divide-border-subtle lg:hidden">
                  {items.map((item) => (
                    <div key={item.id} className="p-5">
                      <h3 className="font-semibold">{item.product_name}</h3>
                      <dl className="body-small mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        <dt className="text-muted-foreground">Size</dt>
                        <dd>{item.size}</dd>
                        <dt className="text-muted-foreground">Quantity</dt>
                        <dd>{item.quantity}</dd>
                        <dt className="text-muted-foreground">Total</dt>
                        <dd className="font-semibold">
                          €
                          {(Number(item.price) * item.quantity).toFixed(2)}
                        </dd>
                      </dl>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:block">
                  <table className="w-full table-fixed border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border-subtle">
                        <th className="w-1/2 p-4 font-semibold">Product</th>
                        <th className="p-4 font-semibold">Size</th>
                        <th className="p-4 font-semibold">Quantity</th>
                        <th className="p-4 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-border-subtle last:border-b-0"
                        >
                          <td className="p-4 font-semibold">
                            {item.product_name}
                          </td>
                          <td className="p-4">{item.size}</td>
                          <td className="p-4">{item.quantity}</td>
                          <td className="p-4 text-right font-semibold">
                            €
                            {(Number(item.price) * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {/* TASK-18: TODO: Učitaj orders i order_items authenticated korisnika i upravljaj loading/error/empty stanjima. HINT: AuthContext, useEffect, useState, apiClient i Authorization Bearer token. RULE: Osloni se na postojeći RLS i nikada ne traži tuđe porudžbine. */}
    </div>
  );
}
