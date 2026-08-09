import { Link } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import CartContent from "../components/cart/CartContent";
import Button from "../components/ui/Button";
export default function CartPage() {
  const items = [];
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <h1 className="display-text mb-8">Cart</h1>
      <CartContent items={items} editable />
      {items.length > 0 && (
        <div className="mt-7 flex justify-end">
          <Link to="/checkout">
            <Button size="large">Checkout</Button>
          </Link>
        </div>
      )}
      {/* TASK-09: TODO: Prosledi CartContext vrednosti i callback funkcije u CartContent. */}
    </div>
  );
}
