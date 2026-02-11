"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutLugallery = () => {
  return (
    <section className="w-full py-16 px-6  text-[#1f1f1f]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl text-foreground md:text-4xl font-bold leading-snug">
            About <span className="text-brand">Lugallery</span>
          </h2>
          <p className="text-lg text-secondary-foreground">
            Lugallery is where creativity meets opportunity. We&apos;re building
            a vibrant platform for artisans and creatives to showcase their
            talents, connect with clients, and grow their craft.
          </p>
          <p className="text-base text-muted-foreground">
            Whether you&apos;re a seasoned maker or just starting out, Lugallery
            gives you the tools and visibility to succeed. Join a growing
            community that celebrates creativity, passion, and authenticity.
          </p>
        </motion.div>

        {/* Right: Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/about.jpg"
            alt="Creative artisan illustration"
            width={500}
            height={500}
            className="w-full h-auto max-w-sm md:max-w-md rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutLugallery;
