import type { CurrencyState } from "./types";

export default function Inventory({ currency }: { currency: CurrencyState }) {
  return (
    <div className="h-full w-full bg-gray-800 p-4 rounded-lg ">
      <div className="h-1/6">
        <h2 className="text-white ">Gold: {currency.gold}</h2>
      </div>
    </div>
  );
}
