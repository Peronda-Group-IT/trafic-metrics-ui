import { fetchOrigins, fetchUsernames } from "@/lib/metrics";
import MetricsFilters from "./metrics-filters";

export default async function MetricsFiltersLoader() {
    const [origins, usernames] = await Promise.all([
        fetchOrigins(),
        fetchUsernames()
    ]);

    return <MetricsFilters uniqueOrigins={origins} uniqueUsernames={usernames} />;
}
