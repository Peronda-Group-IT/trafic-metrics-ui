"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCwIcon, ActivityIcon } from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3Icon } from "lucide-react";
import MetricsTopCards from "./metrics-top-cards";
import MetricsFilters from "./metrics-filters";
import MetricsTable from "./metrics-table";
import MetricsCharts from "./metrics-charts";

export default function MetricsDashboard({ initialData: data }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => ({
      origin: searchParams.get("origin") || "all",
      username: searchParams.get("username") || "all",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      service: searchParams.get("service") || "",
      route: searchParams.get("route") || "",
    }),
    [searchParams]
  );

  const [activeView, setActiveView] = useState("table");

  // Get unique values for filter dropdowns
  const uniqueOrigins = useMemo(
    () => Array.from(new Set(data.map((item) => item.origin))),
    [data]
  );

  const uniqueUsernames = useMemo(
    () => Array.from(new Set(data.map((item) => item.username))),
    [data]
  );

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesOrigin =
        filters.origin === "all" || item.origin === filters.origin;
      const matchesUsername =
        filters.username === "all" || item.username === filters.username;

      const itemDate = new Date(item.timestamp);
      const matchesStartDate =
        !filters.startDate || itemDate >= new Date(filters.startDate);
      const matchesEndDate =
        !filters.endDate ||
        itemDate <= new Date(filters.endDate + "T23:59:59.999Z");

      return (
        matchesOrigin && matchesUsername && matchesStartDate && matchesEndDate
      );
    });
  }, [data, filters]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    const totalRequests = filteredData.length;
    const uniqueUsers = new Set(filteredData.map((item) => item.username)).size;
    const uniqueRoutes = new Set(filteredData.map((item) => item.route)).size;
    const uniqueServices = new Set(filteredData.map((item) => item.service))
      .size;

    return {
      totalRequests,
      uniqueUsers,
      uniqueRoutes,
      uniqueServices,
    };
  }, [filteredData]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  const uniqueServicesForChart = useMemo(
    () =>
      Array.from(
        new Set(filteredData.map((item) => item.service || "unknown"))
      ),
    [filteredData]
  );

  const chartConfig = useMemo(() => {
    return uniqueServicesForChart.reduce((acc, service, index) => {
      acc[service] = {
        label: service,
        color: COLORS[index % COLORS.length],
      };
      return acc;
    }, {});
  }, [uniqueServicesForChart]);

  // Chart data calculations
  const chartData = useMemo(() => {
    // Timeline data - requests per hour
    const timelineDataMap = filteredData.reduce((acc, item) => {
      const hour = format(new Date(item.timestamp), "MMM dd, HH:mm");
      const service = item.service || "unknown";

      if (!acc[hour]) {
        const date = new Date(item.timestamp);
        acc[hour] = { time: hour, timestamp: date.getTime() };
        uniqueServicesForChart.forEach((s) => {
          acc[hour][s] = 0;
        });
      }

      acc[hour][service] += 1;

      return acc;
    }, {});

    const timelineData = Object.values(timelineDataMap).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Route distribution
    const routeData = filteredData.reduce((acc, item) => {
      const route = item.route.split("/").pop() || item.route;
      const existing = acc.find((d) => d.route === route);
      if (existing) {
        existing.requests += 1;
      } else {
        acc.push({ route, requests: 1 });
      }
      return acc;
    }, []);

    // User activity
    const userActivity = filteredData.reduce((acc, item) => {
      const existing = acc.find((d) => d.username === item.username);
      if (existing) {
        existing.requests += 1;
      } else {
        acc.push({ username: item.username, requests: 1 });
      }
      return acc;
    }, []);

    // Service distribution
    const serviceData = filteredData.reduce((acc, item) => {
      const existing = acc.find((d) => d.service === item.service);
      if (existing) {
        existing.requests += 1;
      } else {
        acc.push({ service: item.service, requests: 1 });
      }
      return acc;
    }, []);

    return {
      timeline: timelineData.slice(-20), // Last 20 time points
      routes: routeData.slice(0, 10), // Top 10 routes
      users: userActivity.slice(0, 10), // Top 10 users
      services: serviceData,
    };
  }, [filteredData]);

  const setFilters = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    for (const key in newFilters) {
      if (newFilters[key] && newFilters[key] !== "all") {
        params.set(key, newFilters[key]);
      } else {
        params.delete(key);
      }
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.replace(pathname);
  };

  return (
    <>
      {/* Summary Cards */}
      <MetricsTopCards
        stats={stats}
        totalDataLength={data.length}
        filteredDataLength={filteredData.length}
      />

      {/* Filters */}
      <MetricsFilters
        filters={filters}
        setFilters={setFilters}
        uniqueOrigins={uniqueOrigins}
        uniqueUsernames={uniqueUsernames}
        clearFilters={clearFilters}
      />

      {/* Data Views */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Analysis</CardTitle>
              <CardDescription>
                Showing {filteredData.length} of {data.length} records
              </CardDescription>
            </div>
            <Tabs
              value={activeView}
              onValueChange={(value) => setActiveView(value)}
            >
              <TabsList>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <ActivityIcon className="w-4 h-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <BarChart3Icon className="w-4 h-4" />
                  Charts
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeView}
            onValueChange={(value) => setActiveView(value)}
          >
            <TabsContent value="table" className="mt-0">
              <MetricsTable data={filteredData} />
            </TabsContent>

            <TabsContent value="charts" className="mt-0">
              <MetricsCharts
                chartData={chartData}
                chartConfig={chartConfig}
                uniqueServicesForChart={uniqueServicesForChart}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
}
