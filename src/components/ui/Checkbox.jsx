export default function Checkbox({
  id,
  label,
  checked = false,
  onChange,
  name,
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 text-sm"
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border border-muted-foreground transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground">
        <span
          className={
            checked
              ? "h-3 w-3 rounded-[2px] bg-foreground opacity-100"
              : "h-3 w-3 rounded-[2px] bg-foreground opacity-0"
          }
        />
      </span>
      {label}
    </label>
  );
}
