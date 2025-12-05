import { fetchMetrics } from "@/lib/metrics";
import MetricsTopCards from "./metrics-top-cards";

export default async function MetricsCardsLoader({ searchParams }) {
    const metrics = await fetchMetrics(searchParams);
    return <MetricsTopCards data={metrics} />;
}
