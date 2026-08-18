import { useEffect, useState } from "react";
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
  lazy = true,
  loading = false,
}) {
  const [loaded, setLoaded] = useState(false);

  const aspectClass = aspectClasses[aspect] ?? aspectClasses["4/3"];

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${aspectClass} ${className}`}
    >
      {src ? (
        <>
          {loading && !loaded && (
            <div
              className="absolute inset-0 animate-pulse bg-surface-muted"
              aria-hidden="true"
            />
          )}

          <img
            src={src}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover ${
              loading
                ? `transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                  }`
                : ""
            }`}
          />
        </>
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