import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="py-10 bg-black text-white px-12">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <div>
          <Link
            href="/"
            className="font-bold logo-font md:text-2xl text-lg cursor-pointer"
          >
            Lugallery
          </Link>
          <div className="flex gap-x-2 pt-2 items-center text-white text-sm">
            <svg
              width="15"
              height="15"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0002 35.6668C28.2049 35.6668 35.6668 28.2049 35.6668 19.0002C35.6668 9.79542 28.2049 2.3335 19.0002 2.3335C9.79542 2.3335 2.3335 9.79542 2.3335 19.0002C2.3335 28.2049 9.79542 35.6668 19.0002 35.6668Z"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25.6667 13.6819C24.9183 12.1569 22.6725 9.48944 18.1808 9.87027C13.6892 10.2519 10.32 14.4453 10.695 19.7811C11.07 25.1178 15.1867 28.1669 18.9292 28.1669C23.4208 28.1669 25.6667 24.5078 25.6667 24.5078"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs">Heika Giggle</p>
          </div>
        </div>

        <ul className="space-y-2">
          <li>
            {" "}
            <Link href="/user/faqs" className=" text-sm  cursor-pointer">
              Faqs
            </Link>
          </li>

          <Link href="/user/contact" className="text-sm cursor-pointer">
            Contact us
          </Link>
        </ul>
             <ul className="space-y-2">
          <li>
            {" "}
            <Link href="/user/faqs" className=" text-sm  cursor-pointer">
              Terms & conditions
            </Link>
          </li>

          <Link href="/user/contact" className="text-sm cursor-pointer">
            Privacy Policy
          </Link>
        </ul>
        <div className="flex gap-x-3">
          <FaInstagram size={20} className="cursor-pointer" />
          <FaFacebook size={20} className="cursor-pointer" />
          <FaTiktok size={20} className="cursor-pointer" />
          <FaWhatsapp size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
