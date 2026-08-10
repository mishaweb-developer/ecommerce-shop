export default function FooterColumn({ title, children }) {
  return (
    <div>
      <h2 className="mb-4 font-bold">{title}</h2>
      <div className="body-small flex flex-col gap-3 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
