"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { UserButton } from "../../../components/widgets/buttons/UserButton";
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa";

const ArtisanDetails = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [mainImage, setMainImage] = useState("/apprentice.jpg");

  const thumbnailImages = [
    "/artist.jpg",
    "/apprentice.jpg",
    "/mua.jpg",
    "/fashion.jpg",
  ];

  return (
    <div className="max-w-7xl w-full mx-auto py-12 px-4">
      <div className="flex items-center text-xs">
        <p>Artisan</p>
        <ChevronRight className="w-4 h-4" />
        <p className="font-medium">{title}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 my-6">
        {/* Left side */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <div className="flex md:flex-col flex-row flex-wrap gap-3 mb-3">
            {thumbnailImages.map((image, index) => (
              <div
                key={index}
                className="border border-[#E5E5E5] bg-[#FBFBFB] p-2 rounded-lg flex justify-center items-center w-20 h-20"
              >
                <Image
                  src={image}
                  height={55}
                  width={55}
                  alt={`thumbnail-${index}`}
                  className="cursor-pointer rounded-sm w-[55px] h-[55px]"
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>

          <div className="w-full bg-[#F9FAF9] rounded-md h-[300px] md:h-[460px]">
            <div className="flex justify-center items-center h-full">
              <Image
                src={mainImage}
                alt="product-image"
                width={600}
                height={400}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-y-4 w-full md:max-w-sm">
          <h2 className="text-2xl font-semibold text-[#006400]">Tolu Crafts</h2>
          <p className="text-gray-600">
            Woodworking and rustic designs tailored for home and office spaces.
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Title:</span> Furniture Designer
            </p>
            <p>
              <span className="font-semibold">State:</span> Abuja
            </p>
            <p>
              <span className="font-semibold">Local Government:</span>{" "}
              Gwagwalada
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +234 800 123 4567
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐⭐⭐⭐☆
            </p>
       
            <div className="flex gap-x-3">
              <span className="font-semibold">Social Media Handles:</span>
              <FaInstagram size={20} className="cursor-pointer" />
              <FaFacebook size={20} className="cursor-pointer" />
              <FaTiktok size={20} className="cursor-pointer" />
              <FaWhatsapp size={20} className="cursor-pointer" />
            </div>
          </div>

          <div className="pt-4">
            <UserButton className="wful">Connect</UserButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetails;
