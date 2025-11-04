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
   "/apprentice.jpg",
  ];

  return (
    <div className="max-w-7xl w-full mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-xs text-gray-500">
        <p>Trainers</p>
        <ChevronRight className="w-4 h-4" />
        <p className="font-medium text-gray-700">{title}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 my-6">
        {/* LEFT — Gallery */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <div className="flex md:flex-col flex-row flex-wrap gap-3 mb-3">
            {thumbnailImages.map((image, index) => (
              <div
                key={index}
                className={`border border-[#E5E5E5] bg-[#FBFBFB] p-2 rounded-lg flex justify-center items-center w-20 h-20 cursor-pointer ${
                  mainImage === image ? "border-[#006400]" : ""
                }`}
              >
                <Image
                  src={image}
                  height={55}
                  width={55}
                  alt={`thumbnail-${index}`}
                  className="rounded-sm w-[55px] h-[55px] object-cover"
                  onClick={() => setMainImage(image)}
                />
              </div>
            ))}
          </div>

          <div className="w-full bg-[#F9FAF9] rounded-md h-[300px] md:h-[460px]">
            <Image
              src={mainImage}
              alt="trainer-work"
              width={600}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>

        {/* RIGHT — Trainer Info */}
        <div className="flex flex-col gap-y-4 w-full md:max-w-sm">
          <h2 className="text-2xl font-semibold text-[#006400]">Tolu Crafts</h2>
          <p className="text-gray-600">
            Expert in woodworking and rustic design — creating functional, beautiful
            pieces and helping aspiring artisans master the craft.
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Title:</span> Furniture Designer
            </p>
            <p>
              <span className="font-semibold">Location:</span> Gwagwalada, Abuja
            </p>
            <p>
              <span className="font-semibold">Program Duration:</span> 3 Months
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +234 800 123 4567
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐⭐⭐⭐☆
            </p>

            <div className="flex items-center gap-x-3 pt-2">
              <span className="font-semibold">Socials:</span>
              <FaInstagram size={20} className="cursor-pointer hover:text-[#006400]" />
              <FaFacebook size={20} className="cursor-pointer hover:text-[#006400]" />
              <FaTiktok size={20} className="cursor-pointer hover:text-[#006400]" />
              <FaWhatsapp size={20} className="cursor-pointer hover:text-[#006400]" />
            </div>
          </div>

          <div className="pt-4">
            <UserButton className="w-full">Connect or Enroll</UserButton>
          </div>
        </div>
      </div>

      {/* Program Details */}
      <div className="mt-10 space-y-8">
        {/* Overview */}
        <section>
          <h3 className="text-xl font-semibold text-[#006400] mb-3">
            Program Overview
          </h3>
          <p className="text-gray-700 leading-relaxed">
            This hands-on program introduces participants to essential woodworking
            techniques, from material selection to finishing. Ideal for beginners or
            artisans looking to refine their craft and design skills.
          </p>
        </section>

        {/* Requirements */}
        <section>
          <h3 className="text-xl font-semibold text-[#006400] mb-3">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Basic interest or experience in woodworking</li>
            <li>Access to simple hand tools (hammer, saw, chisel, etc.)</li>
            <li>Commitment to attend scheduled sessions</li>
          </ul>
        </section>

        {/* What You’ll Learn */}
        <section>
          <h3 className="text-xl font-semibold text-[#006400] mb-3">
            What You’ll Learn
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Material selection and wood types</li>
            <li>Basic and advanced cutting techniques</li>
            <li>Finishing and polishing methods</li>
            <li>Building your first furniture piece</li>
          </ul>
        </section>

        {/* Outcomes */}
        <section>
          <h3 className="text-xl font-semibold text-[#006400] mb-3">
            By the End of This Program
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Students will gain the confidence and skill set to design, build, and
            finish their own wooden furniture projects, and may qualify to showcase
            their work on Lugallery’s artisan network.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ArtisanDetails;
