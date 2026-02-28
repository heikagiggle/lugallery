"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { uploadToCloudinary } from "@/app/utils/uploadToCloudinary";

interface ImageUploaderProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;

  onUploadComplete?: (fileUrl: string | null) => void;
  handler?: UseFormReturn<TFieldValues>;
  initialImageUrl?: string;
}

export const ImageUploader = <TFieldValues extends FieldValues>({
  name,
  onUploadComplete,
  handler,
  initialImageUrl,
}: ImageUploaderProps<TFieldValues>) => {
  const [image, setImage] = useState<string | null>(initialImageUrl || null);

  useEffect(() => {
    if (initialImageUrl) {
      setImage(initialImageUrl);
    }
  }, [initialImageUrl]);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file);
  //     setImage(previewUrl);

  //     handler?.setValue(
  //       name,
  //       { url: previewUrl } as PathValue<TFieldValues, typeof name>,
  //       { shouldDirty: true },
  //     );

  //     onUploadComplete?.(previewUrl);
  //   }
  // };

  const handleImageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // show preview immediately
  const previewUrl = URL.createObjectURL(file);
  setImage(previewUrl);

  handler?.setValue(
    name,
    { url: previewUrl, uploading: true } as PathValue<
      TFieldValues,
      typeof name
    >,
    { shouldDirty: true }
  );

  try {
    const data = await uploadToCloudinary(file, "profiles");

    handler?.setValue(
      name,
      { url: data.secure_url, uploading: false } as PathValue<
        TFieldValues,
        typeof name
      >,
      { shouldDirty: true }
    );

    onUploadComplete?.(data.secure_url);
  } catch (error) {
    console.error(error);
  }
};

  const handleRemove = () => {
    setImage(null);
    handler?.setValue(name, undefined as PathValue<TFieldValues, typeof name>, {
      shouldDirty: true,
    });

    onUploadComplete?.(null);
  };

  return (
    <div className="relative w-40 h-40 rounded-full border border-gray-300 overflow-hidden bg-ring">
      {image ? (
        <Image
          src={image}
          alt="profile"
          width={160}
          height={160}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-foreground text-sm">
          Upload
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        id={`imageUpload-${name}`}
        onChange={handleImageChange}
        className="hidden"
      />

      <label
        htmlFor={`imageUpload-${name}`}
        className="absolute bottom-1 left-1/2 translate-x-[-50%] bg-background shadow-md border border-ring rounded-full p-2 cursor-pointer hover:bg-ring transition"
      >
        <Camera className="text-foreground" />
      </label>

      {image && (
        <button
          onClick={handleRemove}
          className="absolute top-3 right-6 bg-white border border-red-300 text-red-500 text-xs px-2 py-1 rounded-full hover:bg-red-50 transition cursor-pointer"
        >
          Remove
        </button>
      )}
    </div>
  );
};
