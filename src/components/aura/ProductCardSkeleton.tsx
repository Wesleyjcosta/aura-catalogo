export function ProductCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-foreground/5"
      aria-hidden="true"
    >
      <div className="aspect-square w-full bg-muted/65" />
      <div className="space-y-3 p-3.5 sm:p-4">
        <div className="h-2.5 w-1/3 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-4/5 rounded-full bg-muted" />
          <div className="h-4 w-3/5 rounded-full bg-muted" />
        </div>
        <div className="h-5 w-2/5 rounded-full bg-muted" />
        <div className="h-9 w-full rounded-full bg-muted" />
      </div>
    </div>
  );
}
