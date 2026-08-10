import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ImageBox from "../components/ui/ImageBox";
const audiences = [
  ["Women", "women"],
  ["Kids", "kids"],
  ["Men", "men"],
];
export default function HomePage() {
  return (
    <>
      <section className="container-content grid items-center gap-8 py-10 md:py-14 lg:grid-cols-2 lg:py-20">
        <div className="max-w-xl">
          <p className="body-small mb-4 font-semibold uppercase text-accent">
            Fashion
          </p>
          <h1 className="display-text">Discover Brands</h1>
          <p className="body-large mt-6 text-muted-foreground">
            Discover a collection that blends style and comfort. Browse our
            carefully selected pieces of modern clothing that follow the latest
            trends while staying true to your unique style.
          </p>
          <Link to="/products">
            <Button size="large" className="mt-8">
              Shop Now
            </Button>
          </Link>
        </div>
        <ImageBox
          src="/home/hero.png"
          alt="Fashion collection"
          aspect="4/3"
          className="lg:aspect-[5/4]"
        />
      </section>
      <section className="bg-surface section-space">
        <div className="container-content">
          <h2 className="display-text mb-8 lg:mb-12">Shop by audience</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {audiences.map(([name, param]) => (
              <article key={name}>
                <ImageBox
                  src={`/home/${param}.png`}
                  alt={`${name} fashion`}
                  aspect="3/4"
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
      <section className="section-space">
        <div className="container-wide">
          <div className="hidden grid-cols-2  lg:grid">
            <ImageBox src="/home/cta-left.png" alt="Fashion collection" aspect="4/3" />
            <ImageBox src="/home/cta-right.png" alt="Fashion collection" aspect="4/3" />
          </div>
          <div className="bg-surface-muted">
            <div className="container-content flex flex-col items-start gap-6 py-8 md:py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
              <h2 className="display-text text-accent">
                Enjoy 20% Off This Season’s Styles
              </h2>
              <Link to="/products" className="shrink-0">
                <Button size="large" >Show All</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
