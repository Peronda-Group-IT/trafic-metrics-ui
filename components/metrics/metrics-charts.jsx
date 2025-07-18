"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { UsersIcon, LineChartIcon, PieChartIcon } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function MetricsCharts({ chartData, chartConfig, uniqueServicesForChart }) {
  return (
    <div className="space-y-6">
      {/* Top Row - Full Width Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            Request Timeline
          </CardTitle>
          <CardDescription>Requests over time by service</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className={"h-96"}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                {uniqueServicesForChart.map((service, index) => (
                  <Line
                    key={service}
                    type="monotone"
                    dataKey={service}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ fill: COLORS[index % COLORS.length] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Middle Row - Full Width Service Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Service Distribution
          </CardTitle>
          <CardDescription>Requests by service</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              requests: {
                label: "Requests",
                color: "hsl(var(--chart-4))",
              },
            }}
            className={"h-72"}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.services}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ service, percent }) => `${service} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="requests"
                  nameKey="service"
                >
                  {chartData.services.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent nameKey="service" />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bottom Row - Full Width User Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            User Activity
          </CardTitle>
          <CardDescription>Requests by user</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              requests: {
                label: "Requests",
                color: "hsl(var(--chart-3))",
              },
            }}
            className={"h-72"}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.users} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="username" type="category" width={120} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="requests">
                  {chartData.users.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
