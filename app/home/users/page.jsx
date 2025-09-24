import { fetchMetrics } from "@/lib/metrics";
import UsersTable from "@/components/metrics/users-table";
import { UserRequestsChart } from "@/components/metrics/user-requests-chart";

export default async function UsersPage({searchParams}) {

  const { search } = await searchParams;
  const data = await fetchMetrics();

  // Process data to get the latest entry and request count for each user
  const userData = data.reduce((acc, curr) => {
    if (!acc[curr.username]) {
      acc[curr.username] = { ...curr, Requests: 0 };
    }
    acc[curr.username].Requests++;
    if (new Date(curr.timestamp) > new Date(acc[curr.username].timestamp)) {
      acc[curr.username].timestamp = curr.timestamp;
      acc[curr.username].service = curr.service;
    }
    return acc;
  }, {});

  const usersByRequests = Object.values(userData).sort((a, b) => b.Requests - a.Requests);

  return (
    <div className="max-w-7xl mx-auto">
      <UsersTable data={data} searchTerm={search || ''}/>
      <div className="mt-8">
        <UserRequestsChart data={usersByRequests} />
      </div>
    </div>
  );
}