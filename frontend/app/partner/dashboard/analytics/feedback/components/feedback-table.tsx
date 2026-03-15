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
import { feedbacks } from "./data";
import { useSearch } from "../../../../../state/client/search-context";
import { useEffect } from "react";
import { Pagination } from "../../../components/pagination";
import { formatDate } from "../../../components/helper";

export function FeedbackTable() {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  const filteredData = feedbacks.filter((feedback) => {
    const q = searchQuery.toLowerCase();
    return feedback.user.toLowerCase().includes(q);
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
          <TableHeader className="sticky top-0 z-10 text-muted-foreground text-sm">
            <TableRow className="border-b border-input py-3">
              <TableHead className="pl-4">User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Recommend</TableHead>
              <TableHead>Suggestions</TableHead>
              <TableHead>Submitted At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-muted">
                <TableCell className="pl-4 text-foreground font-medium">
                  {data.user}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {data.rating}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {data.recommend ? "Yes 😃" : "No 😞"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {data.suggestions}
                </TableCell>
                <TableCell className="pr-16 text-muted-foreground">
                  {formatDate(data.submittedAt)}
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
