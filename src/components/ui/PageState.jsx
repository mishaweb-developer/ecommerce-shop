import { CircleAlert, LoaderCircle, PackageOpen } from "lucide-react";

const stateIcons = {
  error: CircleAlert,
  empty: PackageOpen,
};

export default function PageState({ type, title, message }) {
  const StateIcon = stateIcons[type];
  const isLoading = type === "loading";
  const isError = type === "error";

  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center px-4 py-10 text-center"
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
    >
      <div className="flex max-w-md flex-col items-center">
        {isLoading ? (
          <LoaderCircle
            className="mb-4 animate-spin text-muted-foreground"
            size={36}
            aria-hidden="true"
          />
        ) : (
          StateIcon && (
            <StateIcon
              className={`mb-4 ${isError ? "text-accent" : "text-muted-foreground"}`}
              size={36}
              aria-hidden="true"
            />
          )
        )}
        <h2 className="title-text font-semibold">{title}</h2>
        {message && (
          <p className="body-small mt-2 text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
}
