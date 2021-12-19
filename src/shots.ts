import * as PIXI from "pixi.js";

import { Player } from "./player";

export type Shot = {
  id: string;
  sprite: PIXI.Sprite;
  delete: () => void;
};

const SHOT_MAX_DURATION_IN_MILISECONDS = 10 * 1000;

export function addShot(app: PIXI.Application, player: Player) {
  const shotSprite = PIXI.Sprite.from("sample.png");
  shotSprite.x = player.sprite.x;
  shotSprite.y = player.sprite.y;
  const spriteHeightToWidthRatio = shotSprite.height / shotSprite.width;
  shotSprite.width = 50;
  shotSprite.height = 50 * spriteHeightToWidthRatio;
  const shotId = (Math.random() * 1000000).toFixed();
  app.stage.addChild(shotSprite);
  const moveShot = (timeDelta: number) => {
    shotSprite.y -= timeDelta * 5;
  };
  app.ticker.add(moveShot);
  let timeoutToClear: NodeJS.Timeout | null;
  const deleteShot = () => {
    app.ticker.remove(moveShot);
    app.stage.removeChild(shotSprite);
    delete player.firedShots[shotId];
    shotSprite.destroy();
    if (timeoutToClear) clearTimeout(timeoutToClear);
  };
  timeoutToClear = setTimeout(deleteShot, SHOT_MAX_DURATION_IN_MILISECONDS);
  player.firedShots[shotId] = {
    id: shotId,
    sprite: shotSprite,
    delete: deleteShot,
  };
}
