import * as PIXI from "pixi.js";

import { Enemy } from "./enemies";

export function handleCollisions(
  app: PIXI.Application,
  playerSprite: PIXI.Sprite,
  enemies: { [enemyId: string]: Enemy }
) {
  const detectCollision = (
    playerSprite: PIXI.Sprite,
    enemySprite: PIXI.Sprite
  ): boolean => {
    const playerBounds = playerSprite.getBounds();
    const enemyBounds = enemySprite.getBounds();
    return (
      playerBounds.left < enemyBounds.right &&
      playerBounds.right > enemyBounds.left &&
      playerBounds.top < enemyBounds.bottom &&
      playerBounds.bottom > enemyBounds.top
    );
  };
  app.ticker.add(() => {
    for (const enemy of Object.values(enemies))
      if (detectCollision(playerSprite, enemy.sprite)) enemy.delete();
  });
}
