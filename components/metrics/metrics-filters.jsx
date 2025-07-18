"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import React, { useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MetricsFilters({
  uniqueOrigins,
  uniqueUsernames,
}) {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilterIcon className="h-5 w-5" />
          Filters
        </CardTitle>
        <CardDescription>
          Filter your metrics data by origin, username, and date range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="origin">Origin</Label>
            <Select
              value={filters.origin}
              onValueChange={(value) => setFilters({ origin: value })}
            >
              <SelectTrigger className={"w-full cursor-pointer"}>
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Origins</SelectItem>
                {uniqueOrigins.map((origin) => (
                  <SelectItem key={origin} value={origin}>
                    {origin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Select
              value={filters.username}
              onValueChange={(value) => setFilters({ username: value })}
            >
              <SelectTrigger className={"w-full cursor-pointer"}>
                <SelectValue placeholder="Select username" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsernames.map((username) => (
                  <SelectItem key={username} value={username}>
                    {username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover open={open1} onOpenChange={setOpen1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal cursor-pointer"
                >
                  {filters.startDate
                    ? format(
                        new Date(filters.startDate.replace(/-/g, "/")),
                        "dd/MM/yyyy"
                      )
                    : "dd/mm/yyyy"}
                  <ChevronDownIcon className="text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={
                    filters.startDate
                      ? new Date(filters.startDate.replace(/-/g, "/"))
                      : undefined
                  }
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setFilters({
                      startDate: date ? format(date, "yyyy-MM-dd") : undefined,
                    });
                    setOpen1(false);
                  }}
                  toDate={
                    filters.endDate
                      ? new Date(filters.endDate.replace(/-/g, "/"))
                      : undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal cursor-pointer"
                >
                  {filters.endDate
                    ? format(
                        new Date(filters.endDate.replace(/-/g, "/")),
                        "dd/MM/yyyy"
                      )
                    : "dd/mm/yyyy"}
                  <ChevronDownIcon className="text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={
                    filters.endDate
                      ? new Date(filters.endDate.replace(/-/g, "/"))
                      : undefined
                  }
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setFilters({
                      endDate: date ? format(date, "yyyy-MM-dd") : undefined,
                    });
                    setOpen2(false);
                  }}
                  fromDate={
                    filters.startDate
                      ? new Date(filters.startDate.replace(/-/g, "/"))
                      : undefined
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            className={"cursor-pointer"}
          >
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
