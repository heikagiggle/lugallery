"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { UserButton } from "@/app/components/widgets/buttons/UserButton";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";

// Form validation schema
export const ProfileSchema = z.object({
  marquee: z.string().min(1, "Announcement is required"),
});

export type ProfileData = z.infer<typeof ProfileSchema>;

type Announcement = {
  id: string;
  announcement: string;
  isActive: boolean;
};

const AnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: "1", announcement: "Welcome to the platform!", isActive: true },
    {
      id: "2",
      announcement: "New features launching next week.",
      isActive: false,
    },
    {
      id: "3",
      announcement: "Scheduled maintenance on Sunday.",
      isActive: true,
    },
  ]);

  const [editId, setEditId] = useState<string | null>(null);

  const handler = useForm<ProfileData>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
  });

  const { control, reset, handleSubmit } = handler;

  const onSubmit = (data: ProfileData) => {
    if (editId) {
      // Update existing announcement
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, announcement: data.marquee } : item
        )
      );
    } else {
      // Add new announcement
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        announcement: data.marquee,
        isActive: false,
      };
      setAnnouncements((prev) => [...prev, newAnnouncement]);
    }

    setEditId(null);
    reset();
  };

  const handleEdit = (a: Announcement) => {
    setEditId(a.id);
    reset({ marquee: a.announcement });
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    if (editId === id) {
      setEditId(null);
      reset();
    }
  };

  return (
    <>
      <Form {...handler}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <FormField
            control={control}
            name="marquee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Announcement</FormLabel>
                <textarea
                  {...field}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none outline-none"
                  placeholder="Write your announcement..."
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <UserButton>{editId ? "Update" : "Add"} Announcement</UserButton>
          </div>
        </form>
      </Form>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-bold">Announcements List</h3>

        {announcements.map((a) => (
          <div
            key={a.id}
            className="border rounded p-4 flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {a.announcement}
              </p>

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={a.isActive}
                  onChange={() => {
                    setAnnouncements((prev) =>
                      prev.map((item) =>
                        item.id === a.id
                          ? { ...item, isActive: !item.isActive }
                          : item
                      )
                    );
                  }}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="text-sm text-gray-600">
                  {a.isActive
                    ? "Active (visible to users)"
                    : "Inactive (hidden from users)"}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(a)}
                className="text-blue-600 hover:underline"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-red-600 hover:underline"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnnouncementPage;
