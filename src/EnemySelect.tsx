import enemies from "./data/enemies";
import type { Enemy } from "./types";

interface EnemySelectProps {
  summonLevel: number;
  onEnemySelect: (enemy: Enemy) => void;
}

export default function EnemySelect({
  summonLevel,
  onEnemySelect,
}: EnemySelectProps) {
  return (
    <select onChange={(e) => onEnemySelect(enemies[e.target.value])}>
      {Object.entries(enemies)
        .filter(([, enemy]) => enemy.level <= summonLevel)
        .map(([key, enemy]) => (
          <option key={key} value={key}>
            {enemy.name}
          </option>
        ))}
    </select>
  );
}
