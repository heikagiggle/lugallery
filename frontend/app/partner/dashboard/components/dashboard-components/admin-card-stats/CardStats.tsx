import { CardComponent } from ".";

export function CardStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      <CardComponent label={"Portfolio Views"} value={"100"} />
      <CardComponent label={"Active Clients"} value={"4000"} />
      <CardComponent label={"New Clients"} value={`300`} />
      <CardComponent label={"Active Apprentices"} value={"1000"} />
      <CardComponent label={"Reviews"} value={`30`} />
    </div>
  );
}
