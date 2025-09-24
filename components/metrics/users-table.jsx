import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { SearchBar } from "@/components/searchbar";
  
  export default function UsersTable({ data, searchTerm }) {
    // Helper function to format the date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };
  
    // Process data to get the latest entry and request count for each user
    const userData = data.reduce((acc, curr) => {
      if (!acc[curr.username]) {
        acc[curr.username] = { ...curr, requestCount: 0 };
      }
      acc[curr.username].requestCount++;
      if (new Date(curr.timestamp) > new Date(acc[curr.username].timestamp)) {
        acc[curr.username].timestamp = curr.timestamp;
        acc[curr.username].service = curr.service;
      }
      return acc;
    }, {});
  
    const filteredUserDataArray = Object.values(userData).filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const userDataArray = filteredUserDataArray.sort((a, b) => a.username.localeCompare(b.username));
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users and their metrics.</CardDescription>
          <SearchBar placeholder="Filter users by username..." buttonSearchText="Search" />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border max-h-[500px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Last Request</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead>Requests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDataArray.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.username}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">{formatDate(user.timestamp)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.service}</Badge>
                    </TableCell>
                    <TableCell>{user.requestCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }