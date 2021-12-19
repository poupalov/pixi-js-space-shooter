import * as PIXI from "pixi.js";

import { Player } from "./player";
import { Enemy } from "./enemies";

export function handleCollisions(
  app: PIXI.Application,
  player: Player,
  enemies: { [enemyId: string]: Enemy }
) {
  app.ticker.add(() => {
    for (const enemy of Object.values(enemies))
      destroyEnemyOnCollision(enemy, player);
  });
}

function destroyEnemyOnCollision(enemy: Enemy, player: Player) {
  if (detectCollision(player.sprite, enemy.sprite)) {
    enemy.delete();
    return;
  }
  for (const firedShot of Object.values(player.firedShots))
    if (detectCollision(firedShot.sprite, enemy.sprite)) {
      enemy.delete();
      firedShot.delete();
      return;
    }
}

function detectCollision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite): boolean {
  const playerBounds = sprite1.getBounds();
  const enemyBounds = sprite2.getBounds();
  return (
    playerBounds.left < enemyBounds.right &&
    playerBounds.right > enemyBounds.left &&
    playerBounds.top < enemyBounds.bottom &&
    playerBounds.bottom > enemyBounds.top
  );
}
