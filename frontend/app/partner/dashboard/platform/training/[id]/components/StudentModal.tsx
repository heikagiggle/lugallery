"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentProps } from "../../components/data";
import { Star } from "lucide-react";
import { formatDate } from "../../../../components/helper";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProps;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-secondary-foreground">
            Student Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-muted-foreground space-y-2">
          <p>
            <span className="font-medium text-secondary-foreground">Name:</span>{" "}
            {student.name}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">Email:</span>{" "}
            {student.email}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">Skill:</span>{" "}
            {student.skill}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">State:</span>{" "}
            {student.state}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">Duration:</span>{" "}
            {student.duration_months} months
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">Status:</span>{" "}
            {student.status}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">Start Date:</span>{" "}
            {formatDate(student.start_date)}
          </p>
          <p>
            <span className="font-medium text-secondary-foreground">End Date:</span>{" "}
            {formatDate(student.end_date)}
          </p>

          <div>
            <span className="font-medium text-secondary-foreground">Rating:</span>{" "}
            <div className="flex mt-1">
              {Array.from({ length: student.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
          </div>

          <div>
            <span className="font-medium text-secondary-foreground">Review:</span>
            <p className="mt-1 text-muted-foreground">{student.review}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
