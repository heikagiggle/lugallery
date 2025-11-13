"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Pending from "./pending";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Approved from "./approved";
import Rejected from "./rejected";

export function ProfileTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialTab = searchParams.get("tab") || "pending";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const current = searchParams.get("tab") || "pending";
    setTab(current);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`${pathname}?tab=${value}`);
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full mt-8">
      <TabsList className="bg-[#11111114] p-1 rounded-full">
        <TabsTrigger value="pending" className="cursor-pointer">
          Pending
        </TabsTrigger>
        <TabsTrigger value="approved" className="cursor-pointer">
          Approved
        </TabsTrigger>
        <TabsTrigger value="rejected" className="cursor-pointer">
          Rejected
        </TabsTrigger>
      </TabsList>

      <TabsContent value="pending">
        <Pending />
      </TabsContent>

      <TabsContent value="approved">
        <Approved />
      </TabsContent>

      <TabsContent value="rejected">
        <Rejected />
      </TabsContent>
    </Tabs>
  );
}
