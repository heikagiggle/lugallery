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
import Link from "next/link";
import { capitalizeWords, formatDate } from "../../components/helper";
import { Ellipsis } from "../../components/icons/ellipsis";
import { artisans } from ".//data";
import { Pagination } from "../../components/pagination";

interface UserTableProps {
  searchQuery?: string;
}

export function PartnerTable({ searchQuery = "" }: UserTableProps) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter artisan by search query
  const filteredData = artisans?.filter((user) => {
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

  return (
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="stick top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-input py-3">
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>States</TableHead>
              <TableHead>Address</TableHead>

              <TableHead className="md:pl-[1.5rem]">Date registered</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50 z-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {user.email || "N/A"}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {capitalizeWords(user.skill || "N/A")}
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
                  <Link href={`/admin/dashboard/partners/${user.id}`}>
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
