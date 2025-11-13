import { Card } from "@/components/ui/card";
import React from "react";

interface PortfolioProps {
  portfolio: string;
  images?: string[];
}

const PortfolioSection = ({ portfolio, images }: PortfolioProps) => {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Portfolio</h3>
      <p className="text-gray-600 mb-3">
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
            <img
              key={i}
              src={img}
              alt={`Work ${i + 1}`}
              className="rounded-lg w-full h-32 object-cover"
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default PortfolioSection;
