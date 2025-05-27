import { useState } from "react";
import Summoner from "./Summoner";
import EnemySelect from "./EnemySelect";
import type { Enemy, GroundItem, Item } from "./types";
import items from "./data/items";
import enemies from "./data/enemies";
import { v4 as uuidv4 } from "uuid";

interface LootDropsProps {
  summonLevel: number;
}

export default function LootDrops({ summonLevel }: LootDropsProps) {
  const [pickedUpItems, setPickedUpItems] = useState<Set<number>>(new Set());
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

  const generateItems = () => {
    const currencyDrops = rollTotalDrops();
    setGroundItems((prev) => {
      let i = 0;
      const newGroundItems = prev.filter((item) => item.pickedUp === false);
      while (i < currencyDrops) {
        newGroundItems.push({
          id: uuidv4(),
          itemId: items.gold.id,
          name: items.gold.name,
          rarity: items.gold.rarity,
          pickedUp: false,
        });
        i++;
      }
      return newGroundItems;
    });
  };

  const pickupItem = (id: string) => {
    console.log(id);
    setGroundItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pickedUp: true } : item))
    );
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
      <EnemySelect
        summonLevel={summonLevel}
        onEnemySelect={(enemy) => handleEnemySelect(enemy)}
      />
      <div className="relative h-full bg-gray-800 rounded-lg flex items-center justify-center space-y- p-2 overflow-y-hidden">
        <div className="flex flex-wrap justify-center gap-1">
          {groundItems.map((item) => (
            <button
              key={item.id}
              onClick={() => pickupItem(item.id)}
              className={`px-3 py-1 bg-gray-950 ${
                rarityColors[item.rarity]
              } text-sm font-semibold transform transition-all duration-100 hover:scale-110 hover:shadow-lg cursor-pointer
              ${item.pickedUp ? "opacity-0 cursor-not-allowed" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <Summoner onMonsterSlay={() => generateItems()} />
      </div>
    </div>
  );
}
