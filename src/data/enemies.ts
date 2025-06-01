import type { Enemies, Enemy } from "../types";

const imp: Enemy = {
  name: "Imp",
  level: 1,
  hp: 10,
  attack: 5,
  rarityMultiplier: 0,
  quantityMultiplier: 1.3,
};

const goblin: Enemy = {
  name: "Goblin",
  level: 2,
  hp: 20,
  attack: 10,
  rarityMultiplier: 0.1,
  quantityMultiplier: 1.6,
};

const enemies: Enemies = {
  imp,
  goblin,
};

export default enemies;
