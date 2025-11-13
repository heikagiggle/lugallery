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
import { capitalizeWords, formatDate } from "../../../../components/helper";
import { artisanProfiles } from "../../data";
import { useEffect } from "react";
import { useSearch } from "../../../../../../state/client/search-context";
import { Pagination } from "../../../../components/pagination";
import { Ellipsis } from "../../../../components/icons/ellipsis";
import ProfileDetailsModal from "../../modal/details-modal";

export function RejectedProfileTable() {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

  // Filter artisanProfiles by search query
  const filteredData = artisanProfiles?.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.title?.toLowerCase().includes(q) ||
      user.state?.toLowerCase().includes(q)
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
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-2">
      <div className="text-sm text-gray-500 py-2 mobile-scrollbar">
        <Table>
          <TableHeader className="stick top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-[#E5E5E5] py-3">
              <TableHead className="pl-4">Artisan Name</TableHead>
              <TableHead>Artisan Title</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-gray-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium truncate w-[100px]">
                  {data.name}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {data.title || "N/A"}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {capitalizeWords(data.state || "N/A")}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {data.phone || "N/A"}
                </TableCell>
                <TableCell>
                  <button className="px-2 py-1 text-xs bg-red-100 text-red-800  rounded">
                    Rejected
                  </button>
                </TableCell>
                <TableCell className="pr-16 text-center text-[#666666]">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell className="text-center cursor-pointer">
                  <ProfileDetailsModal
                    profile={data}
                    status="Rejected"
                      rejectionReason="Incomplete profile details. Missing portfolio images."
                    trigger={
                      <button type="button">
                        <Ellipsis className="cursor-pointer text-[#63626A]" />
                      </button>
                    }
                  />
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
