import { fetchMetrics } from "@/lib/metrics";
import TableGraphContainer from "./table-graph-container";

export default async function MetricsTableLoader({ searchParams }) {
    const metrics = await fetchMetrics(searchParams);
    return <TableGraphContainer data={metrics} />;
}
