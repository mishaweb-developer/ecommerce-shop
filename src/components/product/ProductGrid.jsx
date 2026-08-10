import ProductCard from "./ProductCard";
import PageState from "../ui/PageState";
export default function ProductGrid({ products = [] }) {
  if (!products.length)
    return (
      <PageState
        type="empty"
        title="No products found"
        message="Try changing your filters."
      />
    );
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
