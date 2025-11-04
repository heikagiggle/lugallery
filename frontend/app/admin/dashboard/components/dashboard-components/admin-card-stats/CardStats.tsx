import { CardComponent } from ".";

export function CardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
      <CardComponent label={"Active Partners"} value={"1000"} />
      <CardComponent label={"Active Users"} value={"4000"} />
      <CardComponent label={"New Users"} value={`300`} />
    </div>
  );
}
