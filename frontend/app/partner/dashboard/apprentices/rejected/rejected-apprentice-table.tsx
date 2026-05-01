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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { capitalizeWords, formatDate } from "../../components/helper";
import { Ellipsis } from "../../components/icons/ellipsis";
import { apprentices } from "./data";
import { useSearch } from "../../../../state/client/search-context";
import { useEffect } from "react";
import { Pagination } from "../../components/pagination";

export function RejectedApprenticeTable() {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter apprentices by search query
  const filteredData = apprentices?.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.gender?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "0");
    replace(`${pathname}?${params.toString()}`);
  }, [searchQuery]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / size);
  const currentPage = Math.min(page, totalPages - 1);
  const start = currentPage * size;
  const paginatedItems = filteredData.slice(start, start + size);

  return (
    <Card className="mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="stick top-0 z-10 text-muted-foreground text-sm">
            <TableRow className="border-b border-input py-3">
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead className="pr-10 text-center">
                Date registered
              </TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted">
                <TableCell className="pl-4 text-foreground font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email || "N/A"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {capitalizeWords(user.gender || "N/A")}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.phone || "N/A"}
                </TableCell>
                <TableCell className="pr-16 text-center text-muted-foreground">
                  {formatDate(user.date_registered)}
                </TableCell>
                <TableCell className="text-center cursor-pointer">
                  <Link href={`/partner/dashboard/apprentices/${user.id}`}>
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
