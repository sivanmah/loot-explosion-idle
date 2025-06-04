import { useState } from "react";
import LootDrops from "./LootDrops";
import Inventory from "./Inventory";
import type { CurrencyState, InventoryItem, Item } from "./types";

function App() {
  const [summonLeveL, setSummonLevel] = useState(1);
  const [currency, setCurrency] = useState<CurrencyState>({
    gold: 0,
  });
  const [items, setItems] = useState<InventoryItem[]>([]);

  function handleItemPickup(item: Item, amount: number, id: string) {
    if (item.type === "currency") {
      setCurrency((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] ?? 0) + amount,
      }));
    } else {
      setItems((prev) => [
        ...prev,
        {
          itemId: item.id,
          id: id,
        },
      ]);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-900 flex justify-evenly items-center">
      <div className="w-1/4 h-1/2">Monster selector placeholder</div>
      <div className="w-1/4 h-1/2">
        <LootDrops
          summonLevel={summonLeveL}
          onItemPickup={(item, amount, id) =>
            handleItemPickup(item, amount, id)
          }
        />
      </div>
      <div className="w-1/4 h-1/2">
        <Inventory currency={currency} items={items} />
      </div>
    </div>
  );
}

export default App;
