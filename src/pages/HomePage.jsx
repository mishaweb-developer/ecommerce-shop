import { Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
const audiences = [
  ["Women", "women"],
  ["Kids", "kids"],
  ["Men", "men"],
];
function Placeholder({ label, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-[10px] bg-surface-muted ${className}`}
    >
      <div className="text-center text-muted-foreground">
        <ImageIcon className="mx-auto mb-2" />
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}
export default function HomePage() {
  return (
    <>
      <section className="container-content grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:py-20">
        <div className="max-w-xl">
          <p className="body-small mb-4 font-semibold uppercase text-accent">
            Ecommerce Shop
          </p>
          <h1 className="display-text">Lorem ipsum dolor sit amet</h1>
          <p className="body-large mt-6 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="/products">
            <Button size="large" className="mt-8">
              Shop Now
            </Button>
          </Link>
        </div>
        <Placeholder
          label="Hero image placeholder"
          className="aspect-[4/3] lg:aspect-[5/4]"
        />
      </section>
      <section className="bg-surface section-space">
        <div className="container-content">
          <h2 className="display-text mb-8 lg:mb-12">Shop by audience</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {audiences.map(([name, param]) => (
              <article key={name}>
                <Placeholder
                  label={`${name} image placeholder`}
                  className="aspect-[4/3]"
                />
                <Link to={`/products?audience=${param}`}>
                  <Button variant="outline" className="mt-4 w-full">
                    {name}
                  </Button>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-content section-space">
        <div className="grid overflow-hidden rounded-[10px] bg-surface-warm lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16">
            <h2 className="display-text">Lorem ipsum dolor sit amet</h2>
            <p className="body-large mt-5 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
              ad minim veniam.
            </p>
            <Link to="/about">
              <Button className="mt-7">About Us</Button>
            </Link>
          </div>
          <Placeholder
            label="CTA image placeholder"
            className="min-h-72 rounded-none"
          />
        </div>
      </section>
    </>
  );
}
