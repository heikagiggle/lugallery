import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#E0F7FA] to-[#E0F2F1] py-16 px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1F1F1F] leading-tight mb-4">
            Learn from the Best.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Discover a new passion or master a trade by connecting with skilled
            artisans on Lugallery. Your journey starts here.
          </p>
          <a
            href="#learn"
            className="inline-block  bg-gradient-to-r from-black to-[#006400] text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-transparent hover:border border-[#004D40] transition"
          >
            Start Learning
          </a>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
            src="/apprentice.jpg" 
            alt="Aspiring apprentice"
            width={500}
            height={500}
            className="w-full max-w-md mx-auto rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
