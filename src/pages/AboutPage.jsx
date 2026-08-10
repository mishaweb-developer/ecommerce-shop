import Breadcrumbs from "../components/layout/Breadcrumbs";
import TeamMemberCard from "../components/about/TeamMemberCard";
import Button from "../components/ui/Button";
import ImageBox from "../components/ui/ImageBox";

const teamMembers = [
  {
    name: "Emily Johnson",
    role: "Chief Executive Officer (CEO)",
    description:
      "Emily leads our team with vision and a passion for innovation. With over 10 years of experience in the e-commerce industry, her mission is to ensure every customer has the best possible experience.",
    image: "/about/tim-1.png",
  },
  {
    name: "Sarah Smith",
    role: "Head of Product Development ",
    description:
      "Sarah  oversees product development and selection. Her expertise in market trends and product quality ensures that our offerings meet the highest standards.",
    image: "/about/tim-2.png",
  },
  {
    name: "Michael Smith",
    role: "Marketing & Community Manager",
    description:
      "Michael manages all marketing campaigns and community engagement. He ensures that every customer receives clear information and feels connected to our brand.",
    image: "/about/tim-3.png",
  },
];

export default function AboutPage() {
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <h1 className="display-text text-center">About Us</h1>
      <p className="body-large mx-auto mb-8 mt-3 max-w-2xl text-center text-muted-foreground md:mb-10">
        We believe fashion should be simple, comfortable, and easy to enjoy
        every day.
      </p>

      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <ImageBox
          src="/about/who-we-are.png"
          alt="About our fashion store"
          aspect="3/4"
        />
        <div>
          <h2 className="title-text font-bold">So, who are we?</h2>
          <p className="body-large mt-4 text-muted-foreground">
            Since our founding in 2015, our mission has always been to bring
            quality and convenience to our customers. We believe in
            transparency, sustainability, and delivering value in every product
            we offer. Over the years, we’ve grown from a small local shop to a
            trusted e-commerce brand serving thousands of satisfied customers.
          </p>
          <p className="body-large mt-4 text-muted-foreground">
            Every product is carefully selected and tested to ensure it meets
            our high standards. Our team is passionate about innovation and
            constantly works on improving the shopping experience, offering new
            products, and listening to our community’s feedback. We are
            committed to giving back to the community and supporting local
            initiatives, because we believe a business should make a positive
            impact beyond its sales.
          </p>
          <Button className="mt-7">Get in Touch</Button>
        </div>
      </section>

      <section className="mt-10 md:mt-14 lg:mt-16">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="display-text">Meet the Team</h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-muted-foreground">
            Meet the people who shape our collections and make shopping with
            Fashion simple and enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
}
