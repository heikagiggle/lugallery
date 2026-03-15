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
export const CategorySchema = z.object({
  category: z.string().min(1, "category is required"),
});

export type CategoryData = z.infer<typeof CategorySchema>;

type CategoryProps = {
  id: string;
  category: string;
};

const CategoriesComponent = () => {
  const [category, setCategory] = useState<CategoryProps[]>([
    { id: "1", category: "Pottery" },
    {
      id: "2",
      category: "Photography",
    },
    {
      id: "3",
      category: "Fashion Designing",
    },
  ]);

  const [editId, setEditId] = useState<string | null>(null);

  const handler = useForm<CategoryData>({
    resolver: zodResolver(CategorySchema),
    mode: "onChange",
  });

  const { control, reset, handleSubmit } = handler;

  const onSubmit = (data: CategoryData) => {
    if (editId) {
      // Update existing category
      setCategory((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, category: data.category } : item,
        ),
      );
    } else {
      // Add new category
      const newCategory: CategoryProps = {
        id: Date.now().toString(),
        category: data.category,
      };
      setCategory((prev) => [...prev, newCategory]);
    }

    setEditId(null);
    reset();
  };

  const handleEdit = (a: CategoryProps) => {
    setEditId(a.id);
    reset({ category: a.category });
  };

  const handleDelete = (id: string) => {
    setCategory((prev) => prev.filter((a) => a.id !== id));
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <textarea
                  {...field}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none outline-none"
                  placeholder="Write your category..."
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <UserButton>{editId ? "Update" : "Add"}Category</UserButton>
          </div>
        </form>
      </Form>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-bold">Category List</h3>

        {category.map((a) => (
          <div
            key={a.id}
            className="border border-gray-300 rounded p-4 flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-primary-foreground whitespace-pre-wrap">
                {a.category}
              </p>
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

export default CategoriesComponent;
