import type { CurrencyState, InventoryItem } from "./types";

export default function Inventory({
  currency,
  items,
}: {
  currency: CurrencyState;
  items: InventoryItem[];
}) {
  const boxes = Array.from({ length: 100 }, (_, index) => index);

  return (
    <div className="h-full w-full bg-gray-800 p-4 rounded-lg flex flex-col items-center">
      <div className="h-1/6">
        <h2 className="text-white ">Gold: {currency.gold}</h2>
      </div>
      <div className="grid grid-cols-10 grid-rows-10 w-fit">
        {boxes.map((index) => (
          <div
            key={index}
            className="w-10 h-10  border border-gray-600  flex items-center justify-center hover:bg-gray-600 transition-colors duration-100"
          ></div>
        ))}
      </div>
    </div>
  );
}
