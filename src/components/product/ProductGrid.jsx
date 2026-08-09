import ProductCard from "./ProductCard";
export default function ProductGrid({ products = [] }) {
  if (!products.length)
    return (
      <div className="rounded-[10px] bg-surface p-10 text-center">
        <p>No products match your filters.</p>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
