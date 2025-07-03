import { Skeleton } from "../../../../components/ui/skeleton";

export default function ArtisanCardSkeleton() {
  return (
    <div className="rounded-xl shadow-lg bg-white p-4 space-y-3">
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="w-2/3 h-5" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-1/3 h-4" />
    </div>
  );
}
