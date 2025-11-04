import Link from "next/link";

const Banner = () => {
    return (
      <div className="relative bg-gradient-to-b from-[#006400] to-black min-h-[70vh] md:min-h-[90vh] overflow-hidden md:mx-10 md:rounded-md">
        {/* Text content */}
        <div className="flex flex-col space-y-4.5 items-center justify-center md:mt-[10rem] mt-[12rem] text-white px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
          Find. Connect. Explore.
          </h1>
          <h1 className="text-3xl md:text-5xl font-bold">
          Talents that Speak.
          </h1>

          <Link href='/user/discover' className="border border-white px-3 py-2 text-sm mt-2 rounded cursor-pointer">Get Started</Link>
        </div>
  
        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full h-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,160L30,165.3C60,171,120,181,180,208C240,235,300,277,360,277.3C420,277,480,235,540,192C600,149,660,107,720,112C780,117,840,171,900,170.7C960,171,1020,117,1080,101.3C1140,85,1200,107,1260,96C1320,85,1380,43,1410,21.3L1440,0L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    );
  };
  
  export default Banner;
  