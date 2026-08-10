import Breadcrumbs from "../components/layout/Breadcrumbs";
import CartContent from "../components/cart/CartContent";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { apiClient } from "../api/apiClient";

export default function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const { cart, cartTotal } = useCart();
  const { user, session } = useAuth();

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
  }
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs
        items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="display-text mb-8">Checkout</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
        <form className="space-y-5" onSubmit={handleSubmit}>
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
          <Button type="submit" size="large" className="w-full">
            Place Order
          </Button>
        </form>
        <div>
          <h2 className="title-text mb-5 font-bold">Order summary</h2>
          <CartContent items={cart} editable={false} />
        </div>
      </div>
      {/* TASK-14: TODO: Implementiraj shipping state i validaciju. RULE: name min 2, address min 3, city min 2, postal min 3, country required i Cart ne sme biti prazan. TASK-15–17: STEPS: 1. Validiraj formu. 2. Proveri Cart. 3. Uzmi authenticated user/session. 4. Napravi orders red. 5. Uzmi order ID. 6. Napravi order_items. 7. Očisti Cart. 8. Preusmeri na potvrdu. HINT: AuthContext, CartContext, apiClient, Bearer token, POST i useNavigate. */}
    </div>
  );
}
