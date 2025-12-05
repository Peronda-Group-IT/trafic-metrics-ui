import { MetricsDashboardSkeleton } from "@/components/metrics/metrics-dashboard-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
            <div className="space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-9 w-64 mb-2" />
                        <Skeleton className="h-5 w-80" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-10" />
                    </div>
                </div>
                <MetricsDashboardSkeleton />
            </div>
        </div>
    );
}