import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, Store, UserRound, X } from "lucide-react";
import NavLinks from "./NavLinks";
import SearchInput from "../ui/SearchInput";
import { useCart } from "../../contexts/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { cartQuantity } = useCart();
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();

    navigate(`/products?search=${encodeURIComponent(searchValue)}`);
  }

  return (
    <header className="border-b border-border-subtle bg-white">
      <div className="container-wide">
        <div className="flex h-[72px] items-center gap-5">
          <button
            className="lg:hidden"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <Link
            to="/"
            aria-label="Ecommerce Shop home"
            className="flex items-center gap-2 font-bold"
          >
            <Store />
            <span className="hidden sm:inline">Ecommerce Shop</span>
          </Link>
          <NavLinks className="ml-auto hidden items-center gap-7 lg:flex" />
          <div className="hidden w-56 lg:block">
            <SearchInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <div className="ml-auto flex items-center gap-4 lg:ml-0">
            <Link to="/cart" aria-label="Cart" className="relative">
              <ShoppingCart />
              {cartQuantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs text-white">
                  {cartQuantity}
                </span>
              )}
            </Link>
            <Link to="/login" aria-label="Login">
              <UserRound />
            </Link>
            {/* TASK-12: TODO: Prikaži Login ili Logout prema auth stanju. RULE: Register ne pripada Navbar-u. */}
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-border-subtle py-4 lg:hidden">
            <NavLinks
              onNavigate={() => setMenuOpen(false)}
              className="flex flex-col gap-4"
            />
          </div>
        )}
      </div>
    </header>
  );
}
