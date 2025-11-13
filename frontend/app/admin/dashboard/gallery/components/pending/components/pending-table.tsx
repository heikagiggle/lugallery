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
import { capitalizeWords, formatDate } from "../../../../components/helper";
import { artisanProfiles } from "../../data";
import { useEffect } from "react";
import { useSearch } from "../../../../../../state/client/search-context";
import { Pagination } from "../../../../../dashboard/components/pagination";
import { Ellipsis } from "../../../../../dashboard/components/icons/ellipsis";
import ProfileDetailsModal from "../../modal/details-modal";

export function PendingProfileTable() {
  const { searchQuery } = useSearch();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "10");

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
        <Table className="z-0">
          <TableHeader className="stick top-0 z-0 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-[#E5E5E5] py-3">
              <TableHead className="pl-4">Artisan Name</TableHead>
              <TableHead>Artisan Title</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="lg:pl-[2.5rem]">Date Created</TableHead>

              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((data) => (
              <TableRow key={data.id} className="hover:bg-gray-50">
                <TableCell className="pl-4 text-[#0D0D0D] font-medium z-0">
                  {data.name}
                </TableCell>
                <TableCell className="z-0 text-[#666666]">
                  {data.title || "N/A"}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {capitalizeWords(data.state || "N/A")}
                </TableCell>
                <TableCell className="text-[#666666]">
                  {data.phone || "N/A"}
                </TableCell>
                <TableCell>
                  <button className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Pending
                  </button>
                </TableCell>
                <TableCell className="pr-16 text-center text-[#666666]">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell className="text-center cursor-pointer">
                  <ProfileDetailsModal
                    profile={data}
                    status="Pending"
                    trigger={
                      <button type="button">
                        <Ellipsis className="cursor-pointer text-[#63626A]" />
                      </button>
                    }
                    onApprove={() => console.log("Approved", data.id)}
                    onReject={() => console.log("Rejected", data.id)}
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
