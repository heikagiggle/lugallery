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
import { reviews as initialReviews, ReviewsProps } from "./data";
import { useSearch } from "../../../../../state/client/search-context";
import { useEffect, useState } from "react";
import { Pagination } from "../../../components/pagination";

export function ReviewsTable() {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Local state to handle status updates
  const [reviews, setReviews] = useState<ReviewsProps[]>(initialReviews);

  // Filter reviews by search query
  const filteredData = reviews.filter((review) => {
    const q = searchQuery.toLowerCase();
    return (
      review.user.toLowerCase().includes(q) ||
      review.artisan.toLowerCase().includes(q)
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

  // Handler to update review status
  const handleStatusChange = (id: string, newStatus: "approved" | "rejected") => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-[#E5E5E5] py-3">
              <TableHead className="pl-4">User</TableHead>
              <TableHead>Artisan</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-gray-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium">
                  {data.user}
                </TableCell>
                <TableCell className="text-[#666666]">{data.artisan}</TableCell>
                <TableCell className="text-[#666666]">{data.rating}</TableCell>
                <TableCell className="text-[#666666]">{data.review}</TableCell>
                <TableCell className="text-[#666666]">
                  <span
                    className={`px-2 py-1 text-xs font-medium capitalize ${
                      data.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : data.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {data.status}
                  </span>
                </TableCell>
                <TableCell className="text-center space-x-2">
                  {data.status === "pending" && (
                    <>
                      <button
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                        onClick={() => handleStatusChange(data.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                        onClick={() => handleStatusChange(data.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {data.status === "approved" && (
                    <button
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded"
                      onClick={() => handleStatusChange(data.id, "rejected")}
                    >
                      Reject
                    </button>
                  )}
                  {data.status === "rejected" && (
                    <button
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
                      onClick={() => handleStatusChange(data.id, "approved")}
                    >
                      Approve
                    </button>
                  )}
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
