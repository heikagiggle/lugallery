"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { ArtisanProfileData, ArtisanProfileSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { AdminButton } from "../../../components/widgets/buttons/AdminButton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SocialLink,
  SocialLinksInput,
} from "../components/social-links/social-links-input";
import { useState } from "react";
import {
  MultiImageUploader,
  UploadedImage,
} from "@/app/components/widgets/uploader/multi-image-uploader";
import {
  artisanTitles,
  statesWithLgas,
} from "@/app/user/discover/components/data";
import { ImageUploader } from "@/app/components/widgets/uploader/image-uploader";

const ListingForm = () => {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState<UploadedImage[]>([]);

  const handler = useForm<ArtisanProfileData>({
    resolver: zodResolver(ArtisanProfileSchema),

    mode: "onChange",
  });
  const { control, watch } = handler;
  const selectedState = watch("state");
  const lgas = selectedState
    ? statesWithLgas[selectedState as keyof typeof statesWithLgas]
    : [];

  const onSubmit = (data: ArtisanProfileData) => {
    console.log(data);
  };

  return (
    <div>
      <div className={"cursor-pointer flex"} onClick={() => router.back()}>
        <ChevronLeft /> <span className="pl-1">back</span>
      </div>
      <Form {...handler}>
        <form
          onSubmit={handler.handleSubmit(onSubmit)}
          className="space-y-5 w-full md:w-1/2 mx-auto flex flex-col justify-center p-4 rounded-md my-5 border border-input"
        >
          <h1 className="text-xl md:text-2xl  font-semibold text-center">
            Create artisan profile
          </h1>
          <FormField
            control={control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <Input {...field} placeholder="Enter your business name" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Business Bio</FormLabel>
                <textarea
                  {...field}
                  placeholder="Describe your business..."
                  className="w-full border border-gray-300 rounded-lg p-2 resize-none text-sm mt-1"
                  rows={3}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="galleryImages"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Gallery</FormLabel>
                <MultiImageUploader
                  maxImages={4}
                  initialImages={field.value || []}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {artisanTitles.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <Select
                  value={field.value || ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    handler.setValue("lga", ""); // reset LGA when state changes
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statesWithLgas).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="lga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LGA</FormLabel>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  disabled={!selectedState || lgas.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select LGA" />
                  </SelectTrigger>
                  <SelectContent>
                    {lgas.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <Input {...field} placeholder="Enter your phone number" />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="socialLinks"
            render={({ field }) => (
              <SocialLinksInput value={field.value} onChange={field.onChange} />
            )}
          />

          <div className="flex gap-x-3 justify-end mt-5">
            <AdminButton type="submit" className="bg-gray-400">
              Save as draft
            </AdminButton>

            <AdminButton type="submit">Submit</AdminButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ListingForm;
