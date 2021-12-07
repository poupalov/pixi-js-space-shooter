import { CSSProperties, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import { startGame } from "./game";

function App() {
  const domRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const pixiApp = new PIXI.Application({ width: 640, height: 360 });
    domRef.current?.appendChild(pixiApp.view);
    startGame(pixiApp);
  }, []);
  return (
    <div className="App" style={style}>
      <div ref={domRef} />;
    </div>
  );
}

export default App;

const style: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
