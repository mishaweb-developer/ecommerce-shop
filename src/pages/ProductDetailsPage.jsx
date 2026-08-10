import Breadcrumbs from "../components/layout/Breadcrumbs";
import Button from "../components/ui/Button";
import ImageBox from "../components/ui/ImageBox";
import QuantityControl from "../components/ui/QuantityControl";
import SizeOption from "../components/product/SizeOption";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { useCart } from "../contexts/CartContext";
import PageState from "../components/ui/PageState";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart();

  function handleAddToCart() {
    if (!selectedSize) return;

    addToCart({
      productId: product.id,
      name: product.name,
      imageUrl: product.image_url,
      price: product.price,
      size: selectedSize,
      quantity,
    });
  }

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

  if (loading) return <PageState type="loading" title="Loading product..." />;

  if (error)
    return (
      <PageState
        type="error"
        title="Something went wrong"
        message={error}
      />
    );

  if (!product)
    return (
      <PageState
        type="empty"
        title="Product not found"
        message="This product may no longer be available."
      />
    );

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs
        items={[{ label: "Shop", to: "/products" }, { label: product.name }]}
      />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ImageBox
          src={product.image_url}
          alt={product.name}
          aspect="4/5"
        />
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
          <Button
            size="large"
            className="mt-8 w-full sm:w-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
