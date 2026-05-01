import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTopbar from "../../../components/widgets/topbar/dashboard-topbar";
import Pending from "./pending";
import Accepted from "./accepted";
import Rejected from "./rejected";

const ApprenticePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "news";

  const handleTabChange = (newTab: string) => {
    router.push(`?tab=${newTab}`);
  };

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace(`?tab=pending`);
    }
  }, [router, searchParams]);

  return (
    <div className="pr-2 sm:pr-6 md:pr-12 lg:pr-0">
      <DashboardTopbar />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="w-ful border-b border-[#E5E5E5] mt-3">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="pending">Pending Apprentices</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Apprentices</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Apprentices</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending">
          <Pending />
        </TabsContent>
        <TabsContent value="accepted">
          <Accepted />
        </TabsContent>
        <TabsContent value="rejected">
          <Rejected />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ApprenticePage
