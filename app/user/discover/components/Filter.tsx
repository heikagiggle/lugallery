"use client";
import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { artisanTitles, FilterState, statesWithLgas } from "./data";

type StateKey = keyof typeof statesWithLgas;

interface Props {
  closeSidebar: () => void;
  onFilterChange: (filters: FilterState) => void;
}

const Sort = ({ closeSidebar, onFilterChange }: Props) => {
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLgaDropdown, setShowLgaDropdown] = useState(false);

  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLga, setSelectedLga] = useState<string | null>(null);

  const availableLgas =
    selectedState && selectedState in statesWithLgas
      ? statesWithLgas[selectedState as StateKey]
      : [];

  useEffect(() => {
    onFilterChange({
      title: selectedTitle,
      state: selectedState,
      lga: selectedLga,
    });
  }, [selectedTitle, selectedState, selectedLga, onFilterChange]);

  return (
    <div className="pl-3 pr-2 py-4">
      <div className="flex justify-between items-center border-b py-2">
        <p className="font-semibold text-lg">Discover By:</p>
        <X size={24} className="cursor-pointer" onClick={closeSidebar} />
      </div>

      {/* Artisan Title Filter */}
      <div className="my-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowTitleDropdown((prev) => !prev)}
        >
          <p className="font-medium">Type of Artisan</p>
          <ChevronDown className="w-4 h-4" />
        </div>
        {showTitleDropdown && (
          <ul className="mt-2 space-y-1 ml-2 text-sm">
            {artisanTitles.map((title) => (
              <li
                key={title}
                onClick={() => setSelectedTitle(title)}
                className={`cursor-pointer hover:text-primary ${
                  selectedTitle === title ? "font-semibold" : ""
                }`}
              >
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* State Filter */}
      <div className="my-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowStateDropdown((prev) => !prev)}
        >
          <p className="font-medium">State</p>
          <ChevronDown className="w-4 h-4" />
        </div>
        {showStateDropdown && (
          <ul className="mt-2 space-y-1 ml-2 text-sm">
            {Object.keys(statesWithLgas).map((state) => (
              <li
                key={state}
                onClick={() => {
                  setSelectedState(state);
                  setSelectedLga(null);
                  setShowLgaDropdown(true);
                  setShowStateDropdown(false); 
                }}
                className={`cursor-pointer hover:text-primary ${
                  selectedState === state ? "font-semibold" : ""
                }`}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* LGA Filter */}
      {selectedState && showLgaDropdown && (
        <div className="my-4">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowLgaDropdown((prev) => !prev)}>
            <p className="font-medium hidden md:block">Local Government</p>
             <p className="font-medium md:hidden block">L.G.A</p>
            <ChevronDown className="w-4 h-4" />
          </div>
          {availableLgas.length > 0 ? (
            <ul className="mt-2 space-y-1 ml-2 text-sm">
              {availableLgas.map((lga) => (
                <li
                  key={lga}
                  onClick={() => {
                    setSelectedLga(lga);
                    // setShowLgaDropdown(false); 
                  }}
                  className={`cursor-pointer hover:text-primary ${
                    selectedLga === lga ? "font-semibold" : ""
                  }`}
                >
                  {lga}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mt-2 ml-2">
              No artisan found here
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sort;
