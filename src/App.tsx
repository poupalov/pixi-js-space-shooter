import { CSSProperties, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";

import { Game, startGame } from "./game";

const NUMBER_OF_ENEMIES_TO_DESTROY = 10;

function App() {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [game, setGame] = useState<Game | undefined>(undefined);
  useEffect(() => {
    const pixiApp = new PIXI.Application({ width: 960, height: 540 });
    domRef.current?.appendChild(pixiApp.view);
    startGame(pixiApp, setGame);
  }, []);
  const numberOfDestroyedEnemies = game?.numberOfDestroyedEnemies || 0;
  return (
    <div className="App" style={style}>
      {numberOfDestroyedEnemies >= NUMBER_OF_ENEMIES_TO_DESTROY ? (
        <h1>{"You won!"}</h1>
      ) : (
        <>
          <h1>Number of destroyed enemies: {numberOfDestroyedEnemies}</h1>
          <div ref={domRef} />
        </>
      )}
    </div>
  );
}

export default App;

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100vh",
};
