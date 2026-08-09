import { Image as ImageIcon } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import QuantityControl from "../components/ui/QuantityControl";
import SizeOption from "../components/product/SizeOption";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

export default function ProductDetailsPage() {
  // const product = {
  //   name: "Product name",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  //   price: 0,
  //   sizes: ["S", "M", "L", "XL"],
  // };
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await apiClient(`/products?select=*&id=eq.${id}`);
        setProduct(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found.</p>;

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
                <SizeOption
                  key={size}
                  size={size}
                  selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="mb-3 font-semibold">Quantity</p>
            <QuantityControl
              quantity={quantity}
              onDecrease={() =>
                setQuantity((prevQuantity) =>
                  prevQuantity > 1 ? prevQuantity - 1 : 1,
                )
              }
              onIncrease={() => setQuantity((prevQuantity) => prevQuantity + 1)}
            />
          </div>
          <Button size="large" className="mt-8 w-full sm:w-auto">
            Add to Cart
          </Button>
        </div>
      </div>
      {/* TASK-05: TODO: Implementiraj selected size, quantity i kontrole. TASK-08: TODO: Poveži Add to Cart sa CartContext-om. */}
    </div>
  );
}
