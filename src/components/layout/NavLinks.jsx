import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function NavLinks({ onNavigate = () => {}, className = "" }) {
  const { user } = useAuth();
  const links = [
    ["Home", "/"],
    ["Shop", "/products"],
    ["About Us", "/about"],
    ...(user ? [["My Orders", "/my-orders"]] : []),
  ];

  return (
    <nav className={className}>
      {links.map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `body-small font-semibold hover:text-accent ${isActive ? "text-accent" : ""}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
