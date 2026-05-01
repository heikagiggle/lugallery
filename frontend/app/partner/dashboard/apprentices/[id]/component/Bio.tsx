import { Card } from "@/components/ui/card";
import { Apprentice } from "./data";
import { capitalizeWords } from "../../../components/helper";

interface Props {
  apprentice: Apprentice;
}

const Bio = ({ apprentice }: Props) => {
  return (
    <section className="space-y-6">
      <Card className=" rounded-xl p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-base sm:text-lg font-semibold sm:whitespace-nowrap uppercase">
            Why they applied
          </h1>
          <div className="hidden sm:block flex-1 h-px bg-gray-200" />
        </div>

        {/* Reason */}
        <div className="flex items-stretch gap-3">
          {/* ✅ Dynamic height line */}
          <div className="w-0.5 bg-gray-200" />

          <p className="text-sm leading-relaxed">{apprentice.reason}</p>
        </div>

        {/* Goal */}
        <p className="text-sm ">
          <span className="font-semibold">Goal:</span> {apprentice.goal}
        </p>
      </Card>

      <Card className=" rounded-xl p-4">
        {/* Header with line */}
        <div className="flex items-center gap-4">
          <h1 className="text-base sm:text-lg font-semibold sm:whitespace-nowrap uppercase">
            Personal details
          </h1>
          <div className="hidden sm:block flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 w-full">
          <div>
            <p className="text-xs text-secondary-foreground">Email</p>
            <p className="font-medium text-foreground break-all">
              {apprentice.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-foreground">Phone</p>
            <p className="font-medium text-foreground">{apprentice.phone}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-foreground">State</p>
            <p className="font-medium text-foreground">
              {capitalizeWords(apprentice.state)}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-foreground">Address</p>
            <p className="font-medium text-foreground leading-snug">
              {apprentice.address}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-foreground">
              Languages spoken
            </p>
            <p className="font-medium text-foreground">
              {capitalizeWords(apprentice.language)}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-foreground">Age range</p>
            <p className="font-medium text-foreground leading-snug">
              {apprentice.age}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Bio;
