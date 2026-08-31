export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col" aria-hidden="true">
      <div className="aspect-[4/3] w-full bg-muted/55" />
      <div className="pt-3.5 sm:pt-4">
        <div className="h-2 w-1/4 bg-muted" />
        <div className="mt-2.5 h-5 w-4/5 bg-muted" />
        <div className="mt-2 h-5 w-3/5 bg-muted" />
        <div className="mt-3.5 h-5 w-2/5 bg-muted" />
        <div className="mt-5 h-3 w-1/3 bg-muted" />
      </div>
    </div>
  );
}
