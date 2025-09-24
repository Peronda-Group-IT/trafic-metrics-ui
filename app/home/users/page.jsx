import { fetchMetrics } from "@/lib/metrics";
import UsersTable from "@/components/metrics/users-table";

export default async function UsersPage({searchParams}) {

  const { search } = await searchParams;
  const data = await fetchMetrics();
  

  return (
    <div>
      <UsersTable data={data} searchTerm={search || ''}/>
    </div>
  );
}