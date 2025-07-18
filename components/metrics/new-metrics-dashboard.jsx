
import MetricsTopCards from "./metrics-top-cards";
import MetricsFilters from "./metrics-filters";
import TableGraphContainer from "./table-graph-container";

export default function MetricsDashboard({ data, origins, usernames }) {

  return (
    <>
      {/* Summary Cards */}
      <MetricsTopCards
        data={data}
      />

      {/* Filters */}
      <MetricsFilters
        uniqueOrigins={origins}
        uniqueUsernames={usernames}
      />

      <TableGraphContainer data={data}/>
    </>
  );
}
