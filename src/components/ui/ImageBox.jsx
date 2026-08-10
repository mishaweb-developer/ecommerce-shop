import { Image as ImageIcon } from "lucide-react";

const aspectClasses = {
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "4/5": "aspect-[4/5]",
  "5/4": "aspect-[5/4]",
};

export default function ImageBox({
  src,
  alt = "",
  aspect = "4/3",
  className = "",
}) {
  const aspectClass = aspectClasses[aspect] ?? aspectClasses["4/3"];

  return (
    <div
      className={`overflow-hidden ${aspectClass} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-muted text-muted-foreground">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-2" aria-hidden="true" />
            <span className="text-sm">Image placeholder</span>
          </div>
        </div>
      )}
    </div>
  );
}
