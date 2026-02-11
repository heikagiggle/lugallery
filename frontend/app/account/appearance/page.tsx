"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setSelectedTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
              : "border-gray-300",
          )}
        >
          <div className="relative w-full h-40 md:h-48 lg:h-56">
            <Image
              src="/light.png"
              alt="light-theme-image"
              fill
              className="rounded-sm object-cover"
            />
          </div>

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
              : "border-gray-300",
          )}
        >
         <div className="relative w-full h-40 md:h-48 lg:h-56">
  <Image
    src="/dark.png"
    alt="dark-theme-image"
    fill
    className="rounded-sm object-cover"
  />
</div>

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
