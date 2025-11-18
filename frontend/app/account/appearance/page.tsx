'use client'
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx"; 

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = (theme:string) => {
    setSelectedTheme(theme);
    // Optionally apply theme here
    // e.g. document.documentElement.classList.add(theme)
    // localStorage.setItem('theme', theme)
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Theme preferences</h1>
      <p className="py-2">
        Choose how Lugallery looks to you. Select a single theme. Selections are
        applied immediately and saved automatically.
      </p>

      {/* Themes */}
      <div className="grid md:grid-cols-2 px-1 gap-4">
        {/* Light Theme Option */}
        <div
          onClick={() => handleThemeChange("light")}
          className={clsx(
            "space-y-2 cursor-pointer rounded border p-2",
            selectedTheme === "light"
              ? "border-[#006400] ring-2 ring-[#006400]"
              : "border-gray-300"
          )}
        >
          <Image
            src="/light.png"
            width={500}
            height={500}
            alt="light-theme-image"
            className="rounded-sm"
          />
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              checked={selectedTheme === "light"}
              readOnly
              className="accent-[#006400] w-4 h-4 scale-125"
            />
            <p>Light default</p>
          </div>
        </div>

        {/* Dark Theme Option */}
        <div
          onClick={() => handleThemeChange("dark")}
          className={clsx(
            "space-y-2 cursor-pointer rounded border p-2",
            selectedTheme === "dark"
              ? "border-[#006400] ring-2 ring-[#006400]"
              : "border-gray-300"
          )}
        >
          <Image
            src="/dark.png"
            width={500}
            height={500}
            alt="dark-theme-image"
            className="rounded-sm"
          />
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              checked={selectedTheme === "dark"}
              readOnly
              className="accent-[#006400] w-4 h-4 scale-125"
            />
            <p>Dark default</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
