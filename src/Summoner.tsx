import { useState, useEffect } from "react";

interface SummonerProps {
  onMonsterSlay: () => void;
}

export default function Summoner({ onMonsterSlay }: SummonerProps) {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const cooldownInterval = setInterval(() => {
      setCooldown((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(cooldownInterval);
  }, []);

  function handleClick() {
    setCooldown(100);
    onMonsterSlay();
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="w-1/3 group relative border-1 rounded-sm border-black bg-red-800 text-white p-2  cursor-pointer disabled:cursor-default disabled:bg-gray-500 active:bg-red-900"
        onClick={() => handleClick()}
        disabled={cooldown > 0}
      >
        {cooldown > 0 && (
          <progress
            className="absolute inset-0 w-full h-full [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-red-800 [&::-moz-progress-bar]:bg-red-800"
            max={100}
            value={100 - cooldown}
          ></progress>
        )}
        <span className="relative z-10 text-shadow-md/30 group-disabled:text-gray-300">
          Slay monster
        </span>
      </button>
    </div>
  );
}
