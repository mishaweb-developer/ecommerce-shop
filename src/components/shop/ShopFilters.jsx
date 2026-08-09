import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";

const audiences = ["Women", "Men", "Kids"];
const prices = ["Under €25", "€25–€50", "€50–€100", "Over €100"];
const priceRanges = {
  "Under €25": { min: "", max: "25" },
  "€25–€50": { min: "25", max: "50" },
  "€50–€100": { min: "50", max: "100" },
  "Over €100": { min: "100", max: "" },
};

export default function ShopFilters({
  categories = [],
  audience,
  onAudienceChange,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onClearFilters,
}) {
  return (
    <aside className="rounded-[10px] bg-surface p-5">
      <h2 className="title-text mb-6 font-bold">Filters</h2>
      <FilterGroup
        title="Audience"
        items={audiences}
        isChecked={(item) => audience === item.toLowerCase()}
        onChange={(item) => {
          const value = item.toLowerCase();

          onAudienceChange(audience === value ? "" : value);
        }}
      />
      <FilterGroup
        title="Category"
        items={categories}
        isChecked={(item) => category === item.slug}
        onChange={(item) => {
          onCategoryChange(category === item.slug ? "" : item.slug);
        }}
      />
      <FilterGroup
        title="Price"
        items={prices}
        isChecked={(item) => {
          const range = priceRanges[item];

          return minPrice === range.min && maxPrice === range.max;
        }}
        onChange={(item) => {
          const range = priceRanges[item];

          const isActive = minPrice === range.min && maxPrice === range.max;

          onPriceChange(isActive ? "" : range.min, isActive ? "" : range.max);
        }}
      />
      <Button variant="outline" size="small" className="w-full" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </aside>
  );
}
function FilterGroup({ title, items, isChecked, onChange }) {
  return (
    <fieldset className="mb-7">
      <legend className="mb-3 font-semibold">{title}</legend>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Checkbox
            key={typeof item === "object" ? item.id : item}
            id={`${title}-${typeof item === "object" ? item.name : item}`}
            label={typeof item === "object" ? item.name : item}
            checked={isChecked ? isChecked(item) : false}
            onChange={() => onChange?.(item)}
          />
        ))}
      </div>
    </fieldset>
  );
}
