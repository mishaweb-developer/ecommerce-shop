import Breadcrumbs from "../components/layout/Breadcrumbs";
import CartContent from "../components/cart/CartContent";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [shippingHeight, setShippingHeight] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const shippingRef = useRef(null);
  const { cart, cartTotal, clearCart } = useCart();
  const { user, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const shippingForm = shippingRef.current;

    if (!shippingForm) return undefined;

    const updateHeight = () => {
      const height = shippingForm.getBoundingClientRect().height;

      if (height > 0) setShippingHeight(height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(shippingForm);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    const updateDesktopState = () => {
      setIsDesktop(desktopMedia.matches);
    };

    updateDesktopState();
    desktopMedia.addEventListener("change", updateDesktopState);

    return () => {
      desktopMedia.removeEventListener("change", updateDesktopState);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (fullName.trim().length < 2) {
      setError("Full name must have at least 2 characters.");
      return;
    }

    if (address.trim().length < 3) {
      setError("Address must have at least 3 characters.");
      return;
    }

    if (city.trim().length < 2) {
      setError("City must have at least 2 characters.");
      return;
    }

    if (postalCode.trim().length < 3) {
      setError("Postal code must have at least 3 characters.");
      return;
    }

    if (!country.trim()) {
      setError("Country is required.");
      return;
    }

    setSubmitting(true);

    try {
      const orders = await apiClient("/orders", {
        method: "POST",
        token: session.access_token,
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          user_id: user.id,
          total_amount: cartTotal,
          shipping_name: fullName.trim(),
          shipping_address: address.trim(),
          shipping_city: city.trim(),
          shipping_postal_code: postalCode.trim(),
          shipping_country: country.trim(),
        }),
      });

      const order = orders[0];

      if (!order?.id) {
        throw new Error("Order could not be created.");
      }

      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.name,
        image_url: item.imageUrl,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }));

      await apiClient("/order_items", {
        method: "POST",
        token: session.access_token,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItems),
      });

      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs
        items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="display-text text-center">Checkout</h1>
      <p className="body-large mx-auto mb-8 mt-3 max-w-2xl text-center text-muted-foreground">
        Enter your shipping details and review your order before completing
        your purchase.
      </p>
      <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-stretch">
        <form
          ref={shippingRef}
          className="space-y-5 lg:self-start"
          onSubmit={handleSubmit}
        >
          <h2 className="title-text font-bold">Shipping details</h2>
          <Input
            id="shipping-name"
            name="fullName"
            label="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            id="address"
            name="address"
            label="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            id="city"
            name="city"
            label="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            id="postal-code"
            name="postalCode"
            label="Postal Code"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Input
            id="country"
            name="country"
            label="Country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <div aria-live="polite" className="min-h-5 text-sm text-accent">
            {error}
          </div>
          <Button
            type="submit"
            size="large"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </Button>
        </form>
        <div
          className="min-h-0 lg:flex lg:flex-col lg:overflow-hidden"
          style={
            isDesktop && shippingHeight
              ? { height: `${shippingHeight}px` }
              : undefined
          }
        >
          <h2 className="title-text mb-5 shrink-0 font-bold">
            Order summary
          </h2>
          <div className="min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
            <CartContent items={cart} editable={false} showTotal={false} />
          </div>
          <div className="mt-5 shrink-0 border-t border-border-subtle pt-5">
            <p className="title-text text-right font-bold">
              Total: €{Number(cartTotal).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {/* TASK-15–17: STEPS: 1. Validiraj formu. 2. Proveri Cart. 3. Uzmi authenticated user/session. 4. Napravi orders red. 5. Uzmi order ID. 6. Napravi order_items. 7. Očisti Cart. 8. Preusmeri na potvrdu. HINT: AuthContext, CartContext, apiClient, Bearer token, POST i useNavigate. */}
    </div>
  );
}
