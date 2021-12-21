import * as PIXI from "pixi.js";

import { Player } from "./player";
import { Enemy } from "./enemies";
import { Game } from "./game";

export function handleCollisions(
  app: PIXI.Application,
  player: Player,
  enemies: { [enemyId: string]: Enemy },
  game: Game,
  setGame: (newGame: Game) => void
) {
  app.ticker.add(() => {
    let shouldUpdateGameState = false;
    for (const enemy of Object.values(enemies))
      if (destroyEnemyOnCollision(enemy, player)) {
        game.numberOfDestroyedEnemies += 1;
        shouldUpdateGameState = true;
      }
    if (shouldUpdateGameState) setGame({ ...game });
  });
}

function destroyEnemyOnCollision(enemy: Enemy, player: Player): boolean {
  if (detectCollision(player.sprite, enemy.sprite)) {
    enemy.delete();
    return true;
  }
  for (const firedShot of Object.values(player.firedShots))
    if (detectCollision(firedShot.sprite, enemy.sprite)) {
      enemy.delete();
      firedShot.delete();
      return true;
    }
  return false;
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
