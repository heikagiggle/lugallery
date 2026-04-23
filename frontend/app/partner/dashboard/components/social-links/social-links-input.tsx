"use client";
import React, { useState } from "react";
import { Plus, X, Link2 } from "lucide-react";
import { SOCIAL_PLATFORMS } from "./social-platforms";
import { AdminButton } from "@/app/components/widgets/buttons/AdminButton";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialLinksInputProps {
  value?: SocialLink[];
  onChange?: (links: SocialLink[]) => void;
}

export const SocialLinksInput = ({
  value = [],
  onChange,
}: SocialLinksInputProps) => {
  const [links, setLinks] = useState<SocialLink[]>(value);
  const [selectedPlatform, setSelectedPlatform] = useState(
    SOCIAL_PLATFORMS[0].id
  );
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");

  const update = (next: SocialLink[]) => {
    setLinks(next);
    onChange?.(next);
  };

const addLink = () => {
  setError("");

  if (!urlInput.trim()) {
    setError("Please enter a URL.");
    return;
  }

  try {
    new URL(urlInput.trim());
  } catch {
    setError("Please enter a valid URL (include https://).");
    return;
  }

  const alreadyAdded = links.find((l) => l.platform === selectedPlatform);
  if (alreadyAdded) {
    setError(`You've already added a ${selectedPlatform} link.`);
    return;
  }

  const next: SocialLink[] = [
    ...links,
    {
      id: crypto.randomUUID(),
      platform: selectedPlatform,
      url: urlInput.trim(),
    },
  ];

  update(next);
  setUrlInput("");

  // ✅ FIX: move to next available platform
  const remaining = SOCIAL_PLATFORMS.filter(
    (p) => !next.find((l) => l.platform === p.id)
  );

  if (remaining.length > 0) {
    setSelectedPlatform(remaining[0].id);
  }
};

  const removeLink = (id: string) => {
    update(links.filter((l) => l.id !== id));
  };

  const activePlatform = SOCIAL_PLATFORMS.find(
    (p) => p.id === selectedPlatform
  )!;

  const availablePlatforms = SOCIAL_PLATFORMS.filter(
    (p) => !links.find((l) => l.platform === p.id)
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Input Row */}
      <div className="flex gap-2">
        {/* Platform selector */}
        <div className="relative">
          <select
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setError("");
            }}
            className="
              appearance-none pl-9 pr-8 py-2.5 rounded-lg border border-gray-300
              bg-white text-sm font-medium text-gray-700
            
              cursor-pointer
            "
          >
            {availablePlatforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
          {/* Platform icon inside select */}
          <span
            className={`absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${activePlatform.color}`}
          >
            {activePlatform.icon}
          </span>
        </div>

        {/* URL input */}
        <div className="flex-1 relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLink())}
            placeholder={activePlatform.placeholder}
            className="
              w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 outline-none text-sm
           
              placeholder:text-gray-400
            "
          />
        </div>

        {/* Add button */}
        <AdminButton
          type="button"
          onClick={addLink}
          disabled={availablePlatforms.length === 0}
          className="
          px-4 
           
          "
        >
          <Plus className="w-4 h-4" />
          Add
        </AdminButton>
      </div>

      {error && <p className="text-xs text-red-500 -mt-1">{error}</p>}

      {/* Added links list */}
      {links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const platform = SOCIAL_PLATFORMS.find(
              (p) => p.id === link.platform
            )!;
            return (
              <div
                key={link.id}
                className="
                  group flex items-center gap-2 pl-3 pr-2 py-1.5
                  rounded-full border border-gray-200 bg-gray-50
                  text-sm text-gray-700 max-w-xs
                "
              >
                <span className={platform.color}>{platform.icon}</span>
                <span className="truncate max-w-[160px] text-xs text-gray-600">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
                <button
                  type="button"
                  onClick={() => removeLink(link.id)}
                  className="
                    ml-1 w-4 h-4 rounded-full flex items-center justify-center
                    text-gray-400 hover:text-red-500 hover:bg-red-50
                    transition-colors duration-150 flex-shrink-0
                  "
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {links.length === SOCIAL_PLATFORMS.length && (
        <p className="text-xs text-gray-500">All social platforms added.</p>
      )}
    </div>
  );
};