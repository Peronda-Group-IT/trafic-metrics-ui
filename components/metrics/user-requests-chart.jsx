"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  requests: {
    label: "Requests",
    color: "oklch(0.6 0.118 184.704)",
  },
};

export function UserRequestsChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Requests</CardTitle>
        <CardDescription>Number of requests per user</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className={"h-96 w-full"}>
          <BarChart accessibilityLayer data={data} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="username"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
              type="category"
            />
            <XAxis type="number" dataKey="Requests" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="Requests" radius={8}>
              {data.map((entry, index) => {
                const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];
                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}