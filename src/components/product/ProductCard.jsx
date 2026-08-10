import Button from "../ui/Button";
import ImageBox from "../ui/ImageBox";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { Check } from "lucide-react";

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <article
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-border-subtle/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <ImageBox src={product.image_url} alt={product.name} aspect="4/5" />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <p className="text-xs uppercase text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 min-h-12 text-sm font-semibold leading-6">
          {product.name}
        </h3>
        <p className="mb-6 mt-1 text-lg font-semibold leading-normal">
          €{Number(product.price).toFixed(2)}
        </p>
        <Button
          variant="outline"
          size="small"
          className="mt-auto w-full"
          onClick={(e) => {
            e.stopPropagation();

            const size = product.sizes.includes("L") ? "L" : product.sizes[0];

            addToCart({
              productId: product.id,
              name: product.name,
              imageUrl: product.image_url,
              price: product.price,
              size,
              quantity: 1,
            });
            setAdded(true);

            setTimeout(() => {
              setAdded(false);
            }, 1500);
          }}
        >
          <span
            className="flex items-center justify-center gap-2"
            aria-live="polite"
          >
            {added ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </span>
        </Button>
      </div>
      {/* TASK-08: TODO: Klik kartice vodi na detalje, a dugme radi quick-add bez navigacije. HINT: Ako sizes sadrži L koristi L, inače prvi size; quantity je 1. */}
    </article>
  );
}
