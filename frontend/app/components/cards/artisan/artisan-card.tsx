import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";

type Artisan = {
  id: string;
  name: string;
  image: string;
  bio: string;
  title: string;
  lga: string;
  state: string;
  rating: number;
};

const ArtisanCard = ({ artisan }: { artisan: Artisan }) => {
  return (
    <div className="rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.1)] bg-background overflow-hidden p-4 space-y-3 border border-input">
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <Image
          src={artisan.image}
          alt={artisan.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-secondary-foreground">{artisan.name}</h2>
        <p className="text-sm  text-muted-foreground line-clamp-1">
          {artisan.bio}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{artisan.title}</Badge>
        <Badge>{artisan.state}</Badge>
        <Badge variant="secondary">{artisan.lga}</Badge>
      </div>

      <div className="flex items-center text-yellow-500 text-sm font-medium">
        <Star className="w-4 h-4 fill-yellow-500" />
        <span className="ml-1">{artisan.rating.toFixed(1)} / 5</span>
      </div>
    </div>
  );
};

export default ArtisanCard;
