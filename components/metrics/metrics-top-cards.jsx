import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActivityIcon, GlobeIcon, TrendingUpIcon, UsersIcon } from "lucide-react"

export default function MetricsTopCards({ data }) {

  const getStats = () => {
    const totalRequests = data.length;
    const uniqueUsers = new Set(data.map((item) => item.username)).size;
    const uniqueRoutes = new Set(data.map((item) => item.route)).size;
    const uniqueServices = new Set(data.map((item) => item.service))
      .size;

    return {
      totalRequests,
      uniqueUsers,
      uniqueRoutes,
      uniqueServices,
    };
  }

  const stats = getStats();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRequests}</div>
          <p className="text-xs text-muted-foreground">
            All requests
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
          <p className="text-xs text-muted-foreground">Active users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Routes</CardTitle>
          <GlobeIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueRoutes}</div>
          <p className="text-xs text-muted-foreground">Different endpoints</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Services</CardTitle>
          <ActivityIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueServices}</div>
          <p className="text-xs text-muted-foreground">Active services</p>
        </CardContent>
      </Card>
    </div>
  )
}
