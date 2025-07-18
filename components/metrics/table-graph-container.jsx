import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MetricsCharts from "./metrics-charts";
import MetricsTable from "./metrics-table";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { ActivityIcon, BarChart3Icon } from "lucide-react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function TableGraphContainer({ data }) {
  const [activeView, setActiveView] = useState("table");

  const chartConfig = useMemo(() => {
    return uniqueServicesForChart.reduce((acc, service, index) => {
      acc[service] = {
        label: service,
        color: COLORS[index % COLORS.length],
      };
      return acc;
    }, {});
  }, [uniqueServicesForChart]);

    const uniqueServicesForChart = useMemo(
    () =>
      Array.from(
        new Set(data.map((item) => item.service || "unknown"))
      ),
    [filteredData]
  );

  // Chart data calculations
  const chartData = useMemo(() => {
    const { startDate, endDate } = filters;
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    const isSingleDay = from && to && from.toDateString() === to.toDateString();

    // Timeline data - requests per hour or day
    const timelineDataMap = data.reduce((acc, item) => {
      const date = new Date(item.timestamp);
      const timeKey = isSingleDay
        ? format(date, "HH:00")
        : format(date, "MMM dd");
      const service = item.service || "unknown";

      if (!acc[timeKey]) {
        acc[timeKey] = { time: timeKey, timestamp: date.getTime() };
        uniqueServicesForChart.forEach((s) => {
          acc[timeKey][s] = 0;
        });
      }

      acc[timeKey][service] += 1;

      return acc;
    }, {});

    const timelineData = Object.values(timelineDataMap).sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Route distribution
    const routeData = data.reduce((acc, item) => {
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
    const userActivity = data.reduce((acc, item) => {
      const existing = acc.find((d) => d.username === item.username);
      if (existing) {
        existing.requests += 1;
      } else {
        acc.push({ username: item.username, requests: 1 });
      }
      return acc;
    }, []);

    // Service distribution
    const serviceData = data.reduce((acc, item) => {
      const existing = acc.find((d) => d.service === item.service);
      if (existing) {
        existing.requests += 1;
      } else {
        acc.push({ service: item.service, requests: 1 });
      }
      return acc;
    }, []);

    return {
      timeline: timelineData,
      routes: routeData.slice(0, 10),
      users: userActivity.slice(0, 10),
      services: serviceData,
    };
  }, [data, filters]);

  return (
    <>
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
              <TabsList className={"flex items-center space-x-1"}>
                <TabsTrigger
                  value="table"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ActivityIcon className="w-4 h-4" />
                  Table
                </TabsTrigger>
                <TabsTrigger
                  value="charts"
                  className="flex items-center gap-2 cursor-pointer"
                >
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
