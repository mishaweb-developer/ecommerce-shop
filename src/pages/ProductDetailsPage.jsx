import { Image as ImageIcon } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import QuantityControl from "../components/ui/QuantityControl";
import SizeOption from "../components/product/SizeOption";

export default function ProductDetailsPage() {
  const product = {
    name: "Product name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    price: 0,
    sizes: ["S", "M", "L", "XL"],
  };
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs
        items={[{ label: "Shop", to: "/products" }, { label: product.name }]}
      />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="flex aspect-[4/5] items-center justify-center rounded-[10px] bg-surface">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="mx-auto mb-2" />
            Product image placeholder
          </div>
        </div>
        <div className="lg:py-8">
          <h1 className="display-text">{product.name}</h1>
          <p className="title-text mt-5 font-semibold">
            €{product.price.toFixed(2)}
          </p>
          <p className="body-large mt-6 text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-8">
            <p className="mb-3 font-semibold">Select size</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <SizeOption key={size} size={size} />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 font-semibold">Quantity</p>
            <QuantityControl />
          </div>
          <Button size="large" className="mt-8 w-full sm:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
      {/* TASK-04: TODO: Uzmi ID proizvoda iz URL-a i učitaj proizvod. HINT: useParams, useState, useEffect i apiClient. TASK-05: TODO: Implementiraj selected size, quantity i kontrole. TASK-08: TODO: Poveži Add to Cart sa CartContext-om. */}
    </div>
  );
}
