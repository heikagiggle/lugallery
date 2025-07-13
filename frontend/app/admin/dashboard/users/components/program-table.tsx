"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Pagination } from "./pagination";
import Link from "next/link";
import { capitalizeWords, formatDate } from "./helper";
// import { Loader } from "../../../../components/widgets/loader";
import { Ellipsis } from "../../components/icons/ellipsis";
import { users } from "./data";

interface UserTableProps {
  searchQuery?: string;
}

export function UserTable({ searchQuery = "" }: UserTableProps) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter users by search query
  const filteredData = users?.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.state?.toLowerCase().includes(q)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / size);
  const start = page * size;
  const paginatedItems = filteredData.slice(start, start + size);

  // Default status

  return (
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full">
      <div className="text-sm text-gray-500 py-8">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-[#E5E5E5] py-3">
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>States</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="pl-[2rem]">Date</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {user.email || "N/A"}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {capitalizeWords(user.state || "N/A")}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {user.address || "N/A"}
                </TableCell>
                <TableCell className="pr-16 text-center text-[#666666]">
                   {formatDate(user.date_registered)}
                </TableCell>
                <TableCell className="text-center cursor-pointer">
                  <Link href={`/partner-dashboard/users/${user.id}`}>
                    <Ellipsis />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination totalItems={totalItems} totalPages={totalPages} />
      </div>
    </Card>
  );
}
