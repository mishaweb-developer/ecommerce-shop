import { Link } from "react-router-dom";
import { Facebook, Instagram, Music2 } from "lucide-react";
import FooterColumn from "./FooterColumn";
export default function Footer() {
  return (
    <footer className="mt-auto bg-foreground py-10 text-white md:py-14">
      <div className="container-content grid gap-10 md:grid-cols-3">
        <FooterColumn title="Fashion">
          <p>
            Modern fashion for everyday style, designed to make shopping simple
            and effortless.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:text-white"
            >
              <Facebook size={18} />
            </button>
            <button
              type="button"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:text-white"
            >
              <Instagram size={18} />
            </button>
            <button
              type="button"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition hover:border-white hover:text-white"
            >
              <Music2 size={18} />
            </button>
          </div>
        </FooterColumn>
        <FooterColumn title="Explore">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About Us</Link>
        </FooterColumn>
        <FooterColumn title="Customer Care">
          <Link to="/cart">Cart</Link>
        </FooterColumn>
      </div>
    </footer>
  );
}
