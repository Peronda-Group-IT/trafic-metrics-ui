import { MetricsDashboardSkeleton } from "@/components/metrics/metrics-dashboard-skeleton";
import RefreshButton from "@/components/metrics/metrics-refresh-button";
import MetricsDashboard from "@/components/metrics/new-metrics-dashboard";
import { Button } from "@/components/ui/button";
import { fetchMetrics } from "@/lib/server-utils";
import { RefreshCcw } from "lucide-react";
import { Suspense } from "react";

const HomePage = async ({ searchParams }) => {
  const metrics = await fetchMetrics(searchParams);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Metrics Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and analyze your API usage metrics
            </p>
          </div>
          <div className="flex gap-2">
            <RefreshButton />
          </div>
        </div>
        <Suspense
          fallback={<MetricsDashboardSkeleton />}
          key={searchParams.toString()}
        >
          <MetricsDashboard initialData={metrics} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
