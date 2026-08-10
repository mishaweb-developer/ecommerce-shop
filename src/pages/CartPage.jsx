import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import CartContent from "../components/cart/CartContent";
import Button from "../components/ui/Button";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <h1 className="display-text text-center">Your Cart</h1>
      <p className="body-large mx-auto mb-8 mt-3 max-w-2xl text-center text-muted-foreground">
        Review your selected items, update quantities, and continue when you
        are ready to place your order.
      </p>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        <section className="min-w-0 lg:col-span-2">
          <div className="lg:max-h-[65vh] lg:overflow-y-auto lg:pr-2">
            <CartContent
              items={cart}
              editable
              showTotal={false}
              onIncrease={(item) =>
                updateQuantity(item.productId, item.size, item.quantity + 1)
              }
              onDecrease={(item) =>
                updateQuantity(item.productId, item.size, item.quantity - 1)
              }
              onRemove={(item) => removeFromCart(item.productId, item.size)}
            />
          </div>
        </section>

        {cart.length > 0 && (
          <aside className="min-w-0 self-start rounded-[10px] border border-border-subtle bg-surface p-6 lg:col-span-1">
            <h2 className="title-text mb-6 font-bold">Order Summary</h2>
            <dl className="body-small space-y-4">
              <SummaryRow label="Subtotal" value={cartTotal} />
              <SummaryRow label="Discount" value={0} />
              <SummaryRow label="Delivery" value={0} />
              <div className="flex items-center justify-between gap-4 border-t border-border-subtle pt-4 text-base">
                <dt className="font-bold">Total</dt>
                <dd className="font-bold">€{Number(cartTotal).toFixed(2)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="mt-6 block">
              <Button size="large" className="w-full">
                Checkout
              </Button>
            </Link>
          </aside>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">€{Number(value).toFixed(2)}</dd>
    </div>
  );
}
