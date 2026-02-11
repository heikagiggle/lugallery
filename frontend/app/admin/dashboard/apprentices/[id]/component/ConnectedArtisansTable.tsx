"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../../../components/pagination";

interface ArtisanConnection {
  id: string;
  artisanName: string;
  review: string;
  rating: number;
  skill: string;
}

interface Props {
  connectedArtisans: ArtisanConnection[];
  onView: (item: ArtisanConnection) => void;
}

const ConnectedArtisansTable: React.FC<Props> = ({
  connectedArtisans,
  onView,
}) => {
  const searchParams = useSearchParams();

  // Pagination setup
  const page = parseInt(searchParams.get("page") || "0");
  const size = parseInt(searchParams.get("size") || "5");

  const totalItems = connectedArtisans.length;
  const totalPages = Math.ceil(totalItems / size);
  const start = page * size;
  const paginatedItems = connectedArtisans.slice(start, start + size);

  return (
    <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-2">
      <h2 className="text-lg font-semibold text-gray-700 px-6 pt-4 pb-2 border-b">
        Connected Artisans
      </h2>

      <div className="text-sm text-gray-500 py-2 overflow-x-auto mobile-scrollbar">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white text-[#666666] text-sm">
            <TableRow className="border-b border-input">
              <TableHead className="pl-4">Artisan</TableHead>
              <TableHead>Skill</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="pl-4 font-medium text-gray-900">
                    {item.artisanName}
                  </TableCell>
                  <TableCell className="capitalize text-gray-600">
                    {item.skill}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.review.length > 60
                      ? `${item.review.slice(0, 60)}...`
                      : item.review}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(item)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No connected artisans found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination component (shared) */}
        <Pagination totalItems={totalItems} totalPages={totalPages} />
      </div>
    </Card>
  );
};

export default ConnectedArtisansTable;
