import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface PortfolioProps {
  portfolio: string;
  images?: string[];
}

const PortfolioSection = ({ portfolio, images }: PortfolioProps) => {
  return (
    <Card className="p-6 rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio</h3>
      <p className="text-secondary-foreground mb-3">
        Portfolio Link:{" "}
        <a
          href={portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Visit Portfolio
        </a>
      </p>

      {images && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Work ${i + 1}`}
              width={128}
              height={128}
              className="rounded-lg w-full h-32 object-cover"
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default PortfolioSection;
