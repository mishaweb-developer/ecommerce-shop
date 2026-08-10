import { Image as ImageIcon } from "lucide-react";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import TeamMemberCard from "../components/about/TeamMemberCard";
import Button from "../components/ui/Button";

const teamMembers = [
  {
    name: "Alex Morgan",
    role: "Founder & Creative Director",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
  },
  {
    name: "Jamie Carter",
    role: "Product Designer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent libero.",
  },
  {
    name: "Taylor Brooks",
    role: "Customer Experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus.",
  },
];

function ImagePlaceholder() {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-[10px] bg-surface-muted text-muted-foreground">
      <div className="text-center">
        <ImageIcon className="mx-auto mb-2" aria-hidden="true" />
        <span className="body-small">Image placeholder</span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="container-content pb-10 md:pb-14 lg:pb-20">
      <Breadcrumbs items={[{ label: "About Us" }]} />
      <h1 className="display-text mb-8 md:mb-10">About Us</h1>

      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <ImagePlaceholder />
        <div>
          <h2 className="title-text font-bold">Who We Are</h2>
          <p className="body-large mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="body-large mt-4 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <Button className="mt-7">Get in Touch</Button>
        </div>
      </section>

      <section className="mt-10 md:mt-14 lg:mt-16">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="display-text">Meet the Team</h2>
          <p className="body-large mx-auto mt-4 max-w-2xl text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
