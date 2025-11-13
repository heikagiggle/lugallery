"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { capitalizeWords, formatDate } from "../../../../components/helper";
import { StudentProps } from "../../components/data";
import { StudentModal } from "./StudentModal";
import { Star } from "lucide-react";

interface StudentsTableProps {
  students: StudentProps[];
}

export function StudentsTable({ students }: StudentsTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<StudentProps | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (student: StudentProps) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  if (!students || students.length === 0) {
    return (
      <Card className="bg-white mt-6 shadow-md rounded-xl w-full py-6 text-center text-gray-500">
        No students found for this artisan.
      </Card>
    );
  }

  return (
    <div className="text-sm text-gray-500 mobile-scrollbar">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white text-[#666666] text-sm">
          <TableRow className="border-b border-[#E5E5E5]">
            <TableHead className="pl-4">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-gray-50">
              <TableCell
                className="pl-4 text-[#0D0D0D] font-medium cursor-pointer"
                onClick={() => handleView(student)}
              >
                {student.name}
              </TableCell>
              <TableCell className="text-[#666666]">{student.email}</TableCell>
              <TableCell className="text-[#666666]">
                {capitalizeWords(student.skill)}
              </TableCell>
              <TableCell className="text-center text-[#666666]">
                {student.duration_months}
              </TableCell>
              <TableCell className="text-center text-[#666666]">
                <div className="flex">
                  {Array.from({ length: student.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-[#666666] max-w-[200px] truncate">
                {student.review}
              </TableCell>
              <TableCell
                className={`text-center font-medium ${
                  student.status === "active"
                    ? "text-green-600"
                    : student.status === "completed"
                    ? "text-blue-600"
                    : "text-red-500"
                }`}
              >
                {capitalizeWords(student.status)}
              </TableCell>
              <TableCell className="text-center text-[#666666]">
                {formatDate(student.start_date)}
              </TableCell>
              <TableCell className="text-center text-[#666666]">
                {formatDate(student.end_date)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedStudent && (
        <StudentModal
          isOpen={isModalOpen}
          onClose={handleClose}
          student={selectedStudent}
        />
      )}
    </div>
  );
}
