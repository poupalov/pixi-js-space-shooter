import { CSSProperties, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import { startGame } from "./game";

function App() {
  const domRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const pixiApp = new PIXI.Application({ width: 960, height: 540 });
    domRef.current?.appendChild(pixiApp.view);
    startGame(pixiApp);
  }, []);
  return (
    <div className="App" style={style}>
      <h1>Welcome</h1>
      <div ref={domRef} />;
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
