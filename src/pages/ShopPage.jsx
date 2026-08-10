import Breadcrumbs from "../components/layout/Breadcrumbs";
import ProductGrid from "../components/product/ProductGrid";
import ShopFilters from "../components/shop/ShopFilters";
import SearchInput from "../components/ui/SearchInput";
import PageState from "../components/ui/PageState";
import { useState, useEffect, useRef } from "react";
import { apiClient } from "../api/apiClient";
import { useSearchParams } from "react-router-dom";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterError, setFilterError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterHeight, setFilterHeight] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const filterRef = useRef(null);
  const initialLoadRef = useRef(true);
  const categoriesRef = useRef([]);
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
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => setIsDesktop(desktopMedia.matches);

    updateDesktopState();
    desktopMedia.addEventListener("change", updateDesktopState);

    return () =>
      desktopMedia.removeEventListener("change", updateDesktopState);
  }, []);

  useEffect(() => {
    const filterPanel = filterRef.current;

    if (!filterPanel) return undefined;

    const updateFilterHeight = () => {
      const nextHeight = filterPanel.getBoundingClientRect().height;

      if (nextHeight > 0) setFilterHeight(nextHeight);
    };

    updateFilterHeight();

    const observer = new ResizeObserver(updateFilterHeight);
    observer.observe(filterPanel);

    return () => observer.disconnect();
  }, [categories, isDesktop, loading]);

  useEffect(() => {
    async function loadData() {
      const isInitialLoad = initialLoadRef.current;

      if (isInitialLoad) {
        setError("");
      } else {
        setFilterLoading(true);
        setFilterError("");
      }

      try {
        let categoriesData = categoriesRef.current;

        if (!categoriesData.length) {
          categoriesData = await apiClient("/categories?select=*");
          categoriesRef.current = categoriesData;
          setCategories(categoriesData);
        }

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
        if (isInitialLoad) {
          setError(error.message);
        } else {
          setFilterError(error.message);
        }
      } finally {
        if (isInitialLoad) {
          initialLoadRef.current = false;
          setLoading(false);
        } else {
          setFilterLoading(false);
        }
      }
    }

    loadData();
  }, [search, audience, category, minPrice, maxPrice]);

  if (loading) return <PageState type="loading" title="Loading products..." />;
  if (error)
    return (
      <PageState
        type="error"
        title="Something went wrong"
        message={error}
      />
    );

  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <div className="mb-8">
        <h1 className="display-text text-center">Shop</h1>
        <p className="body-large mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Discover everyday fashion for women, men, and kids. Browse our
          collection and find pieces that fit your style.
        </p>
      </div>
      <div className="mb-6 lg:hidden">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <button
          type="button"
          className="flex h-[50px] w-full items-center justify-between rounded-[10px] border border-border-subtle bg-surface px-5 font-semibold lg:hidden"
          aria-expanded={filtersOpen}
          aria-controls="shop-filters-panel"
          onClick={() => setFiltersOpen((isOpen) => !isOpen)}
        >
          <span>Filters</span>
          <span aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
        </button>
        {!isDesktop && filtersOpen && (
          <div id="shop-filters-panel" className="lg:hidden">
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
          </div>
        )}
        {isDesktop && (
          <div
            ref={filterRef}
            className="hidden self-start lg:col-start-1 lg:row-start-1 lg:block"
          >
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
          </div>
        )}
        <div
          className="min-w-0 lg:col-start-2 lg:row-start-1 lg:flex lg:min-h-0 lg:flex-col"
          style={
            isDesktop && filterHeight
              ? { height: `${filterHeight}px` }
              : undefined
          }
        >
          <div className="mb-5 flex shrink-0 items-center justify-between gap-4">
            <p className="body-small text-muted-foreground">
              {products.length} products
            </p>
            <div className="body-small flex items-center gap-2 text-muted-foreground" aria-live="polite">
              {filterLoading && (
                <>
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-border-subtle border-t-foreground"
                    aria-hidden="true"
                  />
                  <span>Updating products...</span>
                </>
              )}
              {!filterLoading && filterError && (
                <span className="text-accent">{filterError}</span>
              )}
            </div>
          </div>
          <div
            className={`min-h-0 flex-1 overflow-y-auto pr-2 transition-opacity ${
              filterLoading
                ? "opacity-60"
                : "opacity-100"
            }`}
            aria-busy={filterLoading}
          >
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
