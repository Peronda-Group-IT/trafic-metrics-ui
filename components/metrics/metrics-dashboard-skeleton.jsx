import { Skeleton } from "@/components/ui/skeleton";

export function TopCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
  );
}

export function FiltersSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-44 w-full" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export function MetricsDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <TopCardsSkeleton />
      <FiltersSkeleton />
      <TableSkeleton />
    </div>
  );
}
