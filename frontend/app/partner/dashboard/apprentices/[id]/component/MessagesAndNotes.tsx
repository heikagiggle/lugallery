"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { AdminButton } from "@/app/components/widgets/buttons/AdminButton";
import { Apprentice } from "./data";

export const NoteSchema = z.object({
  note: z.string().optional(),
});

export type NoteData = z.infer<typeof NoteSchema>;

interface Props {
  apprentice: Apprentice; 
}

const MessagesAndNotes = ({ apprentice }: Props) => {
  const storageKey = `partner_note_${apprentice.id}`;

  const [savedNote, setSavedNote] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handler = useForm<NoteData>({
    resolver: zodResolver(NoteSchema),
    defaultValues: { note: "" },
    mode: "onChange",
  });

  const { control, watch, reset } = handler;

  // ✅ Load saved note
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setSavedNote(stored);
      reset({ note: stored });
      setIsEditing(false);
    }
  }, [storageKey, reset]);

  // ✅ Auto-save (debounced)
  const watchedNote = watch("note");

  useEffect(() => {
    if (!isEditing) return;

    const timeout = setTimeout(() => {
      if (watchedNote !== undefined) {
        setIsSaving(true);
        localStorage.setItem(storageKey, watchedNote);
        setSavedNote(watchedNote);
        setIsSaving(false);
      }
    }, 800); // debounce delay

    return () => clearTimeout(timeout);
  }, [watchedNote, isEditing, storageKey]);

  // ✅ Manual save
  const onSubmit = (data: NoteData) => {
    const note = data.note || "";
    localStorage.setItem(storageKey, note);
    setSavedNote(note);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({ note: savedNote });
    setIsEditing(false);
  };

  return (
    <section className="space-y-6">
      {/* Messages */}
      <Card className="rounded-xl px-4 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-base sm:text-lg font-semibold sm:whitespace-nowrap uppercase">
            Last message
          </h1>
          <div className="hidden sm:block flex-1 h-px bg-gray-200" />
        </div>

        <div>
          <div className="border rounded-md p-2">
            <Link href={"/partner/dashboard/support"}>
              Good morning ma. I just wanted to say thank you for reviewing my
              application. I am very serious about this...
            </Link>
          </div>

          <p className="text-xs text-secondary-foreground mt-2">
            Sent April 27, 2026 · Not yet replied
          </p>
        </div>
      </Card>

      {/* Notes */}
      <Card className="rounded-xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-base sm:text-lg font-semibold sm:whitespace-nowrap uppercase">
              Partner notes (private)
            </h1>
            <div className="hidden sm:block flex-1 h-px bg-gray-200" />
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div className="mt-4 border rounded-lg p-3 text-sm whitespace-pre-wrap">
            {savedNote || "No note added yet."}
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <Form {...handler}>
            <form onSubmit={handler.handleSubmit(onSubmit)}>
              <FormField
                control={control}
                name="note"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <textarea
                      {...field}
                      placeholder="Add your private notes about this applicant — e.g. 'Seems very serious. Follow up after May 1."
                      className="w-full border border-gray-300 rounded-lg p-3 resize-none text-sm outline-none"
                      rows={3}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer */}
              <div className="flex items-center justify-between mt-5">
                <span className="text-xs text-gray-400">
                  {isSaving ? "Saving..." : "Auto-saved"}
                </span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-sm text-gray-500"
                  >
                    Cancel
                  </button>

                  <AdminButton type="submit">Save Note</AdminButton>
                </div>
              </div>
            </form>
          </Form>
        )}
      </Card>
    </section>
  );
};

export default MessagesAndNotes;
