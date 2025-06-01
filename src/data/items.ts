import type { Item, Items } from "../types";
import enemies from "./enemies";

export const rarities = ["common", "rare", "epic", "legendary"] as const;

const gold: Item = {
  id: "gold",
  name: "Gold",
  type: "currency",
  rarity: "common",
  scaling: true,
  scalingDropValues: {
    common: 1,
    rare: 5,
    epic: 10,
    legendary: 100,
  },
  droppedBy: [enemies.imp, enemies.goblin],
};

const silver: Item = {
  id: "silver",
  name: "Silver",
  type: "currency",
  rarity: "rare",
  droppedBy: [enemies.goblin],
};

const dagger: Item = {
  id: "dagger",
  name: "Dagger",
  type: "equipment",
  rarity: "common",
  droppedBy: [enemies.imp],
};

const sharpenedSword: Item = {
  id: "sharpenedSword",
  name: "Sharpened Sword",
  type: "equipment",
  rarity: "rare",
  droppedBy: [enemies.goblin],
};

const items: Items = {
  gold,
  silver,
  dagger,
  sharpenedSword,
};

export default items;
