import Breadcrumbs from "../components/layout/Breadcrumbs";
import ProductGrid from "../components/product/ProductGrid";
import ShopFilters from "../components/shop/ShopFilters";
import SearchInput from "../components/ui/SearchInput";
import { useState, useEffect } from "react";
import { apiClient } from "../api/apiClient";
import { useSearchParams } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    search = "",
    audience = "",
    category = "",
    minPrice = "",
    maxPrice = "",
  } = Object.fromEntries(searchParams);
  const [searchValue, setSearchValue] = useState(search);

  function updateParam(name, value) {
    const newParam = new URLSearchParams(searchParams);

    if (value) {
      newParam.set(name, value);
    } else {
      newParam.delete(name);
    }

    setSearchParams(newParam);
  }

  function updatePrice(min, max) {
    const newParam = new URLSearchParams(searchParams);

    if (min) {
      newParam.set("minPrice", min);
    } else {
      newParam.delete("minPrice");
    }

    if (max) {
      newParam.set("maxPrice", max);
    } else {
      newParam.delete("maxPrice");
    }

    setSearchParams(newParam);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    updateParam("search", searchValue);
  }

  function clearFilters() {
    setSearchParams({});
  }

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const categoriesData = await apiClient("/categories?select=*");
        setCategories(categoriesData);

        const productParams = new URLSearchParams({
          select: "*",
          is_active: "eq.true",
        });
        if (audience) productParams.set("audience", `eq.${audience}`);
        const selectedCategory = categoriesData.find(
          (categoryItem) => categoryItem.slug === category,
        );
        if (selectedCategory)
          productParams.set("category_id", `eq.${selectedCategory.id}`);
        if (minPrice) productParams.append("price", `gte.${minPrice}`);
        if (maxPrice) productParams.append("price", `lte.${maxPrice}`);
        if (search) productParams.set("name", `ilike.*${search}*`);

        const productsData = await apiClient(
          `/products?${productParams.toString()}`,
        );
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [search, audience, category, minPrice, maxPrice]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <ShopFilters
          categories={categories}
          audience={audience}
          onAudienceChange={(value) => updateParam("audience", value)}
          category={category}
          onCategoryChange={(value) => updateParam("category", value)}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={updatePrice}
          onClearFilters={clearFilters}
        />
        <div>
          <div className="mb-5 flex justify-between">
            <p className="body-small text-muted-foreground">
              {products.length} products
            </p>
          </div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
