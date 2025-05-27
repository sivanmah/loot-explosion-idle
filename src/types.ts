export interface Enemy {
  name: string;
  level: number;
  hp: number;
  attack: number;
  rarityMultiplier: number;
  quantityMultiplier: number;
}

export type Enemies = {
  [key: string]: Enemy;
};

export interface Item {
  id: number;
  name: string;
  type: "currency" | "equipment";
  rarity: "common" | "rare" | "epic" | "legendary";
  dropWeight: number;
  minLevel?: number;
  maxLevel?: number;
  droppedBy: Enemy[];
}

export interface Items {
  [key: string]: Item;
}

export interface GroundItem {
  id: string;
  itemId: number;
  name: string;
  rarity: Item["rarity"];
  pickedUp: boolean;
}
