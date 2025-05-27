import { useState } from "react";
import LootDrops from "./LootDrops";

function App() {
  const [summonLeveL, setSummonLevel] = useState(1);
  return (
    <div className="h-screen w-screen bg-gray-900 flex justify-center items-center">
      <div className="w-1/4 h-1/2">
        <LootDrops summonLevel={summonLeveL} />
      </div>
    </div>
  );
}

export default App;
