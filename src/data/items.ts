import type { Item, Items } from "../types";
import enemies from "./enemies";

const gold: Item = {
  id: 1,
  name: "Gold",
  type: "currency",
  rarity: "common",
  dropWeight: 1000,
  droppedBy: [enemies.imp, enemies.goblin],
};

const items: Items = {
  gold,
};

export default items;
