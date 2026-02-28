export const uploadToCloudinary = async (file: File, folder?: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "app_unsigned_upload");

  if (folder) {
    formData.append("folder", folder);
  }

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dblb77eon/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Upload failed");
  }

  return data; // contains secure_url
};
