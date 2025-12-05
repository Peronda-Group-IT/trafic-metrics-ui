import { Suspense } from "react";
import RefreshButton from "@/components/metrics/metrics-refresh-button";
import MetricsCardsLoader from "@/components/metrics/metrics-cards-loader";
import MetricsFiltersLoader from "@/components/metrics/metrics-filters-loader";
import MetricsTableLoader from "@/components/metrics/metrics-table-loader";
import {
  TopCardsSkeleton,
  FiltersSkeleton,
  TableSkeleton
} from "@/components/metrics/metrics-dashboard-skeleton";

const HomePage = async ({ searchParams }) => {
  const params = await searchParams;

  if (!params?.startDate) {
    const date = new Date();

    // Subtract one month
    date.setMonth(date.getMonth() - 1);

    // Format to yyyy-mm-dd
    const formatted = date.toISOString().split("T")[0];

    params.startDate = formatted;
  }

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

        <Suspense fallback={<TopCardsSkeleton />}>
          <MetricsCardsLoader searchParams={params} />
        </Suspense>

        <Suspense fallback={<FiltersSkeleton />}>
          <MetricsFiltersLoader />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <MetricsTableLoader searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
