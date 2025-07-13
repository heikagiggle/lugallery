import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatProps {
  label: string;
  value: string | number;
  className?: string;
}

export function CardComponent(props: StatProps) {
  return (
    <Card
      className={cn(
        "gap-5 rounded-lg bg-white flex flex-col p-3 shadow-sm",
        props.className
      )}
    >
      <p className="text-[#666666] font-semibold">{props.label}</p>
      <p className={"text-2xl font-semibold"}>{props.value}</p>
    </Card>
  );
}
