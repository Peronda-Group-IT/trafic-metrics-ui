"use client"

import { useState } from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Loader } from "lucide-react"

export default function MetricsTable({ data }) {
  const [visibleRequests, setVisibleRequests] = useState(100)
  const [isLoading, setIsLoading] = useState(false)

  const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), "MMM dd, yyyy HH:mm:ss")
  }

  const getRouteColor = (route) => {
    if (route.includes("/settings")) return "bg-orange-100 text-orange-800"
    if (route.includes("/stock")) return "bg-blue-100 text-blue-800"
    if (route.includes("/home")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const sortedData = data.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  const handleShowMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleRequests((prev) => prev + 100)
      setIsLoading(false)
    }, 500) // Simulate a network request
  }

  return (
    <div className="rounded-md border max-h-[500px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                No data matches your current filters
              </TableCell>
            </TableRow>
          ) : (
            sortedData.slice(0, visibleRequests).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate" title={item.origin}>
                    {item.origin}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.service}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getRouteColor(item.route)}>{item.route}</Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{item.username}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-muted-foreground" suppressHydrationWarning>
                    {formatTimestamp(item.timestamp)}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {visibleRequests < sortedData.length && (
        <div className="flex justify-center py-4">
          <Button onClick={handleShowMore} size={"sm"} className="cursor-pointer" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" />
              </div>
            ) : (
              "Show 100 more"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
