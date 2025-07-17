import { Skeleton } from "@/components/ui/skeleton";

export function MetricsDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <div>
        <Skeleton className="h-96" />
      </div>
    </div>
  );
}
