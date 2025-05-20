import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#FFE3E0] to-[#FFF5F3] py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text */}
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1F1F1F] leading-tight mb-4">
            Artistry Meets Opportunity.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Join the platform where your skills shine. Whether you&apos;re
            styling, snapping, painting, or crafting — Lugallery is for you.
          </p>
          <a
            href="#signup"
            className="inline-block bg-gradient-to-r from-black to-[#006400] text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-transparent hover:border border-black transition"
          >
            Become a Partner
          </a>
        </div>

        <div className="flex-1">
          <Image
            src="/artisan.jpg"
            alt="Creative artisan"
            width={500}
            height={500}
            className="w-full max-w-md mx-auto rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
