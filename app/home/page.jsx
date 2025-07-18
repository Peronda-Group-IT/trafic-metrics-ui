import { MetricsDashboardSkeleton } from "@/components/metrics/metrics-dashboard-skeleton";
import RefreshButton from "@/components/metrics/metrics-refresh-button";
import MetricsDashboard from "@/components/metrics/new-metrics-dashboard";
import { fetchOrigins, fetchMetrics, fetchUsernames } from "@/lib/metrics";
import { Suspense } from "react";

const HomePage = async ({ searchParams }) => {

  const params = await searchParams

  const metrics = await fetchMetrics(params);

  const origins = await fetchOrigins();

  const usernames = await fetchUsernames();

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      <div className="space-y-6">
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
          <MetricsDashboard data={metrics} origins={origins} usernames={usernames} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
