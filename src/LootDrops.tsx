import { useState } from "react";
import Summoner from "./Summoner";
import EnemySelect from "./EnemySelect";
import type { Enemy, GroundItem, Item } from "./types";
import items, { rarities } from "./data/items";
import enemies from "./data/enemies";
import { v4 as uuidv4 } from "uuid";

interface LootDropsProps {
  summonLevel: number;
  onItemPickup: (item: Item, amount: number, id: string) => void;
}

export default function LootDrops({
  summonLevel,
  onItemPickup,
}: LootDropsProps) {
  const [groundItems, setGroundItems] = useState<GroundItem[]>([]);
  const [enemy, setEnemy] = useState<Enemy>(enemies.imp);

  const rarityColors: Record<Item["rarity"], string> = {
    common: "border-1 border-white text-white",
    rare: "border-1 border-blue-500 text-blue-500",
    epic: "border-1 border-yellow-500 text-yellow-500",
    legendary: "border-1 border-red-600 text-red-600",
  };

  function rollTotalDrops() {
    //1 = 1 guaranteed. 1 guaranteed and 50% chance for 1 more
    let drops = 0;
    const dropQuantity = enemy.quantityMultiplier;
    const guaranteedDrops = Math.trunc(dropQuantity);

    if (Math.random() < dropQuantity - guaranteedDrops) {
      drops += 1;
    }
    drops += guaranteedDrops;

    return drops;
  }

  function rollRarity() {
    let rarityRoll: 0 | 1 | 2 | 3 = 0;
    const rarityMultiplier = enemy.rarityMultiplier;

    const roll = Math.random();
    if (roll < 0.01 + rarityMultiplier) {
      rarityRoll = 3; // Legendary
    } else if (roll < 0.1 + rarityMultiplier) {
      rarityRoll = 2; // Epic
    } else if (roll < 0.2 + rarityMultiplier) {
      rarityRoll = 1; // Rare
    } else {
      rarityRoll = 0; // Common
    }
    return rarityRoll;
  }

  const generateItems = () => {
    // Separate currency and item drops
    const itemDrops = rollTotalDrops();
    const currencyDrops = rollTotalDrops();
    const selectedDrops: GroundItem[] = [];

    // Handle item drops
    for (let i = 0; i < itemDrops; i++) {
      const rarityRoll = rollRarity();
      const possibleItems = Object.values(items).filter(
        (item) =>
          item.type !== "currency" &&
          item.rarity === rarities[rarityRoll] &&
          item.droppedBy.includes(enemy)
      );
      if (possibleItems.length > 0) {
        const selectedItem =
          possibleItems[Math.floor(Math.random() * possibleItems.length)];
        const itemId: string = selectedItem.id;
        selectedDrops.push({
          id: uuidv4(),
          itemId: itemId,
          name: selectedItem.name,
          type: selectedItem.type,
          rarity: selectedItem.rarity,
          pickedUp: false,
          amount: 1,
        });
      }
    }

    // Handle currency drops
    for (let i = 0; i < currencyDrops; i++) {
      const rarityRoll = rollRarity();
      const possibleCurrencies = Object.values(items).filter(
        (item) =>
          item.type === "currency" &&
          item.droppedBy.includes(enemy) &&
          (item.rarity === rarities[rarityRoll] || item.scaling)
      );
      if (possibleCurrencies.length > 0) {
        const selectedCurrency =
          possibleCurrencies[
            Math.floor(Math.random() * possibleCurrencies.length)
          ];
        const itemId: string = selectedCurrency.id;
        let amount = Math.floor(Math.random() * 5 + 1); // Random amount between 1 and 5
        if (selectedCurrency.scaling && selectedCurrency.scalingDropValues) {
          // Use rarityRoll to determine the quantity for scaling currencies
          const currencyRarity = rarities[rarityRoll];
          amount = amount * selectedCurrency.scalingDropValues[currencyRarity];
        }
        selectedDrops.push({
          id: uuidv4(),
          itemId: itemId,
          name: selectedCurrency.name,
          type: selectedCurrency.type,
          rarity: selectedCurrency.rarity,
          pickedUp: false,
          amount: amount,
        });
      }
    }

    if (selectedDrops.length > 0) {
      setGroundItems((prev) => {
        const newGroundItems = prev.filter((item) => item.pickedUp === false);
        // Remove duplicate currencies by itemId and sum their amounts
        const mergedCurrencies: typeof selectedDrops = [];
        selectedDrops.forEach((drop) => {
          const existing = mergedCurrencies.find(
            (currency) =>
              currency.itemId === drop.itemId && currency.type === "currency"
          );
          if (existing) {
            existing.amount += drop.amount;
          } else {
            mergedCurrencies.push({ ...drop });
          }
        });
        return [...newGroundItems, ...mergedCurrencies];
      });
    }
  };

  const pickupItem = (id: string, itemId: string) => {
    setGroundItems((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.pickedUp) {
          return { ...item, pickedUp: true };
        }
        return item;
      })
    );
    // Find the picked up item to pass to onItemPickup
    const pickedItem = groundItems.find((item) => item.id === id);
    if (pickedItem) {
      onItemPickup(items[itemId], pickedItem.amount, pickedItem.id);
    }
  };

  function handleEnemySelect(enemy: Enemy) {}

  return (
    <div className="h-full w-full">
      <style>{`
        @keyframes dropIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative h-full bg-gray-800 rounded-lg flex items-center justify-center space-y- p-2 overflow-y-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {groundItems.map((item) => (
            <button
              key={item.id}
              onClick={() => pickupItem(item.id, item.itemId)}
              className={`px-3 py-1 bg-gray-950 ${
                rarityColors[item.rarity]
              } text-sm font-semibold transform transition-all duration-100 hover:scale-110 hover:shadow-lg cursor-pointer
              ${
                item.pickedUp ? "opacity-0 cursor-none pointer-events-none" : ""
              }`}
            >
              {item.amount + "x " + item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <EnemySelect
          summonLevel={summonLevel}
          onEnemySelect={(enemy) => handleEnemySelect(enemy)}
        />
        <Summoner onMonsterSlay={() => generateItems()} />
      </div>
    </div>
  );
}
