"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadToCloudinary } from "@/app/utils/uploadToCloudinary";

export interface UploadedImage {
  id: string;
  previewUrl: string;
  secureUrl?: string;
  uploading: boolean;
  file?: File;
}

interface MultiImageUploaderProps {
  maxImages?: number;
  onChange?: (images: UploadedImage[]) => void;
  initialImages?: UploadedImage[];
}

export const MultiImageUploader = ({
  maxImages = 4,
  onChange,
  initialImages = [],
}: MultiImageUploaderProps) => {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateImages = (updated: UploadedImage[]) => {
    setImages(updated);
  };

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxImages - images.length;
      const toProcess = fileArray.slice(0, remaining);

      if (toProcess.length === 0) return;

      // Create previews immediately
      const newImages: UploadedImage[] = toProcess.map((file) => ({
        id: crypto.randomUUID(),
        previewUrl: URL.createObjectURL(file),
        uploading: true,
        file,
      }));

      const updated = [...images, ...newImages];
      setImages(updated);
      onChange?.(updated);

      // Upload each to Cloudinary
      const uploadPromises = newImages.map(async (img) => {
        try {
          const data = await uploadToCloudinary(img.file!, "artisan_gallery");
          return { ...img, secureUrl: data.secure_url, uploading: false };
        } catch (err) {
          console.error("Upload failed for", img.id, err);
          return { ...img, uploading: false };
        }
      });

      const resolved = await Promise.all(uploadPromises);

      setImages((prev) => {
        const map = new Map(resolved.map((r) => [r.id, r]));
        return prev.map((img) => map.get(img.id) ?? img);
      });
    },
    [images, maxImages, onChange],
  );

  useEffect(() => {
    onChange?.(images);
  }, [images, onChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const canUploadMore = images.length < maxImages;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Drop Zone */}
      {canUploadMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center gap-2
            w-full h-36 rounded-xl border-2 border-dashed cursor-pointer
            transition-all duration-200 select-none
            ${
              isDragging
                ? "border-green-500 bg-green-50 scale-[1.01]"
                : "border-gray-300 bg-gray-50 hover:border-green-400 hover:bg-green-50/40"
            }
          `}
        >
          <div
            className={`
            p-3 rounded-full transition-colors duration-200
            ${isDragging ? "bg-green-100" : "bg-gray-100"}
          `}
          >
            <Upload
              className={`w-5 h-5 ${isDragging ? "text-green-600" : "text-gray-400"}`}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600">
              {isDragging ? "Drop images here" : "Drag & drop images here"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              or{" "}
              <span className="text-green-600 font-medium underline underline-offset-2">
                browse to upload
              </span>
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {images.length}/{maxImages} images uploaded
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) processFiles(e.target.files);
              // reset so same file can be re-selected
              e.target.value = "";
            }}
          />
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            >
              <Image
                src={img.previewUrl}
                alt="gallery upload"
                fill
                className="object-cover"
              />

              {/* Uploading spinner overlay */}
              {img.uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Delete button — visible on hover */}
              {!img.uploading && (
                <button
                  type="button"
                  onClick={() => handleRemove(img.id)}
                  className="
                    absolute top-1.5 right-1.5 z-10
                    w-6 h-6 rounded-full bg-white shadow-md
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-150
                    hover:bg-red-50 border border-gray-200
                  "
                  aria-label="Remove image"
                >
                  <X className="w-3.5 h-3.5 text-red-500" />
                </button>
              )}
            </div>
          ))}

          {/* Add more slot if under limit */}
          {canUploadMore && images.length > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="
                aspect-square rounded-lg border-2 border-dashed border-gray-300
                flex flex-col items-center justify-center gap-1
                text-gray-400 hover:border-green-400 hover:text-green-500
                transition-colors duration-150 cursor-pointer
              "
            >
              <Upload className="w-4 h-4" />
              <span className="text-xs font-medium">Add more</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
