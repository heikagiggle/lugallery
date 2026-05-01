import { Card } from "@/components/ui/card";
import { Apprentice } from "./data";

interface Props {
  apprentice: Apprentice;
}

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Availability = ({ apprentice }: Props) => {
  return (
    <section className="space-y-6">
      <Card className=" rounded-xl p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-base sm:text-lg font-semibold sm:whitespace-nowrap uppercase">
            Availability
          </h1>
          <div className="hidden sm:block flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid md:grid-cols-7 grid-cols-3 gap-2 mt-2">
          {DAYS_OF_WEEK.map((day) => {
            const isActive = apprentice.availableDays.includes(day);

            return (
              <button
                key={day}
                className={`w-full py-2 rounded-lg text-sm border text-center transition ${
                  isActive
                    ? "bg-[#EAF3DE] border-[#CFE3B3] text-gray-800"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-2">
          <div className="bg-secondary p-2 rounded-md">
            <p className="text-sm text-secondary-foreground">Hours per day</p>
            <p className="font-medium text-foreground leading-snug">
              {apprentice.availableHours.start} -{" "}
              {apprentice.availableHours.end}
            </p>
          </div>
          <div className="bg-secondary p-2 rounded-md">
            <p className="text-sm text-secondary-foreground">Address</p>
            <p className="font-medium text-foreground leading-snug">
              {apprentice.address}
            </p>
          </div>
          <div className="bg-secondary p-2 rounded-md">
            <p className="text-sm text-secondary-foreground">Address</p>
            <p className="font-medium text-foreground leading-snug">
              {apprentice.address}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default Availability;
