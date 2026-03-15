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
import { capitalizeWords, formatDate } from "../../../components/helper";
import { Ellipsis } from "../../../components/icons/ellipsis";
import { artisansWithStudents } from "./data";
import { Pagination } from "../../../components/pagination";

interface TrainingTableProps {
  searchQuery?: string;
}

export function TrainingTable({ searchQuery = "" }: TrainingTableProps) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter artisansWithStudents by search query
  const filteredData = artisansWithStudents?.filter((data) => {
    const q = searchQuery.toLowerCase();
    return (
      data.name?.toLowerCase().includes(q) ||
      data.email?.toLowerCase().includes(q) ||
      data.state?.toLowerCase().includes(q)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / size);
  const start = page * size;
  const paginatedItems = filteredData.slice(start, start + size);

  return (
    <Card className="mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="stick top-0 z-10 text-muted-foreground text-sm">
            <TableRow className="border-b border-input py-3">
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="md:pl-[1.5rem]">Date registered</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-muted">
                <TableCell className="pl-4 text-foreground font-medium">
                  {data.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {data.email || "N/A"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {capitalizeWords(data.skill || "N/A")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {capitalizeWords(data.state || "N/A")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {data.address || "N/A"}
                </TableCell>
                <TableCell className="pr-16 text-center text-muted-foreground">
                  {formatDate(data.date_registered)}
                </TableCell>
                <TableCell className="text-center cursor-pointer">
                  <Link href={`/admin/dashboard/platform/training/${data.id}`}>
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
