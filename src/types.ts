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
  id: string;
  name: string;
  type: "currency" | "equipment";
  rarity: "common" | "rare" | "epic" | "legendary";
  scaling?: boolean;
  scalingDropValues?: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
  minLevel?: number;
  maxLevel?: number;
  // Optional properties for equipment
  baseAttack?: number;
  baseDefense?: number;
  droppedBy: Enemy[];
}

export interface Items {
  [key: string]: Item;
}

export interface GroundItem {
  id: string;
  itemId: string;
  name: string;
  type: Item["type"];
  rarity: Item["rarity"];
  pickedUp: boolean;
  amount: number;
}

export interface CurrencyState {
  [key: keyof Items]: number;
}
