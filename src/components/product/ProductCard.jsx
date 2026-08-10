import { Image as ImageIcon } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <article
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-border-subtle/60 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="flex aspect-[4/5] items-center justify-center rounded-[10px] bg-surface">
        <div className="text-center text-muted-foreground">
          <ImageIcon className="mx-auto mb-2" />
          <span className="text-xs">Product image</span>
        </div>
      </div>
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
          }}
        >
          Add to Cart
        </Button>
      </div>
      {/* TASK-08: TODO: Klik kartice vodi na detalje, a dugme radi quick-add bez navigacije. HINT: Ako sizes sadrži L koristi L, inače prvi size; quantity je 1. */}
    </article>
  );
}
