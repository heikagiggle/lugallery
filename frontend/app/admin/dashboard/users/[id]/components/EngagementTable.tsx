"use client";
import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "../../../components/helper";
import { engagementData } from "./data";
import { useSearch } from "../../../../../state/client/search-context";
import { useEffect } from "react";
import { Pagination } from "../../../components/pagination";
import { Star } from "lucide-react";

const EngagementTable = () => {
  const renderStars = (count: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter users by search query
  const filteredData = engagementData?.filter((user) => {
    const q = searchQuery.toLowerCase();
    return user.artisanName?.toLowerCase().includes(q);
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
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="stick top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-[#E5E5E5] py-3">
              <TableHead className="pl-4">Artisan Name</TableHead>
              <TableHead>Artisan Title</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead className="md:pl-14">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-gray-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium">
                  {data.artisanName}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {data.artisanTitle || "N/A"}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {renderStars(data.rating)}
                </TableCell>
                <TableCell className="text-[#666666] max-w-[200px] truncate cursor-pointer">
                  {data.review && data.review.length > 50 ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="hover:underline">
                          {data.review.slice(0, 60)}...
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Full Review</DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {data.review}
                        </p>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span>{data.review || "N/A"}</span>
                  )}
                </TableCell>

                <TableCell className="pr-16 text-center text-[#666666]">
                  {formatDate(data.date)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination totalItems={totalItems} totalPages={totalPages} />
      </div>
    </Card>
  );
};

export default EngagementTable;
