import Image from "next/image";
import React from "react";
import { UserButton } from "../../widgets/buttons/UserButton";
import Link from "next/link";

const CareersAndPartners = () => {
  return (
    <div className="py-10 px-12">
      <div className="text-center space-y-2.5">
        <h1 className="text-3xl md:text-5xl font-semibold">Craft Your Path</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          From Learner to Leader in the Artisan World
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Partner Card */}
        <div className="rounded-3xl border border-input shadow-md overflow-hidden p-5 flex flex-col bg-background h-[500px]">
          <div className="flex flex-col items-center text-center flex-grow">
            <Image
              src="/partner.jpg"
              alt="Join as an artisan"
              height={400}
              width={400}
              className="rounded-xl object-cover w-full h-64"
            />
            <div className="space-y-3 mt-5 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-foreground">
                Join as an Artisan
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Expand your reach with Lugallery by connecting with clients
                across the country.
              </p>
              <div className="mt-auto flex justify-center items-center">
                <Link href="/user/partner">
                  <UserButton>Get Started</UserButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Career Card */}
        <div className="rounded-3xl border border-input shadow-md overflow-hidden p-5 flex flex-col bg-background h-[500px]">
          <div className="flex flex-col items-center text-center flex-grow">
            <Image
              src="/career.jpg"
              alt="Start a career"
              height={400}
              width={400}
              className="rounded-xl object-cover w-full h-64"
            />
            <div className="space-y-3 mt-5 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold">Start a Career</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Learn a skill and grow into a pro by training with experienced
                artisans.
              </p>
              <div className="mt-auto flex justify-center items-cente">
                <Link href="/user/become-artisan">
                  <UserButton>Get Started</UserButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersAndPartners;
