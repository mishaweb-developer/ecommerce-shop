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
      <h1 className="display-text mb-8">Cart</h1>
      <CartContent
        items={cart}
        editable
        onIncrease={(item) =>
          updateQuantity(item.productId, item.size, item.quantity + 1)
        }
        onDecrease={(item) =>
          updateQuantity(item.productId, item.size, item.quantity - 1)
        }
        onRemove={(item) => removeFromCart(item.productId, item.size)}
      />
      {cart.length > 0 && (
        <div className="mt-7 flex justify-end">
          <Link to="/checkout">
            <Button size="large">Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
