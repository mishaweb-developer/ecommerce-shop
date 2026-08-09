import Breadcrumbs from "../components/layout/Breadcrumbs";
import ProductGrid from "../components/product/ProductGrid";
import ShopFilters from "../components/shop/ShopFilters";
import SearchInput from "../components/ui/SearchInput";
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const productsData = await apiClient("/products?select=*&is_active=eq.true",);
        setProducts(productsData);
        const categoriesData = await apiClient("/categories?select=*");
        setCategories(categoriesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error}</p>

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <div className="mb-8">
        <h1 className="display-text">Shop</h1>
        <p className="body-large mt-4 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="mb-6 lg:hidden">
        <SearchInput />
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <ShopFilters categories={categories} />
        <div>
          <div className="mb-5 flex justify-between">
            <p className="body-small text-muted-foreground">
              {products.length} products
            </p>
          </div>
          <ProductGrid products={products} />
          {/* TASK-03: TODO: Izgradi REST filtere iz URL-a. Pagination prikaži samo kada ima više od 12 proizvoda. */}
        </div>
      </div>
    </div>
  );
}
