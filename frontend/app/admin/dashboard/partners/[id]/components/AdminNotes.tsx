"use client";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const AdminNotes = () => {
  const [notes, setNotes] = useState("");

  return (
    <Card className="p-6 rounded-lg shadow-sm my-6">
      <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
        Admin Notes
      </h3>
      <Textarea
        placeholder="Add comments or reasons for rejection..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mb-4 resize-none outline-none"
      />
      <div className="flex justify-end">
        <Button variant="outline" className="text-sm cursor-pointer">
          Save Notes
        </Button>
      </div>
    </Card>
  );
};

export default AdminNotes;
