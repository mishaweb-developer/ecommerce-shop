import { Image as ImageIcon } from "lucide-react";
import Button from "../ui/Button";

export default function TeamMemberCard({ name, role, description }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[10px] border border-border-subtle bg-white shadow-sm">
      <div className="flex aspect-[3/4] items-center justify-center bg-surface-muted text-muted-foreground">
        <div className="text-center">
          <ImageIcon className="mx-auto mb-2" aria-hidden="true" />
          <span className="body-small">Image placeholder</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="title-text font-bold">{name}</h3>
        <p className="body-small mt-1 font-semibold text-muted-foreground">
          {role}
        </p>
        <p className="body-small mb-6 mt-4 text-muted-foreground">
          {description}
        </p>
        <Button variant="outline" size="small" className="mt-auto w-full">
          Contact
        </Button>
      </div>
    </article>
  );
}
