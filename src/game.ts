import * as PIXI from "pixi.js";

import { Player, addPlayer } from "./player";
import { Enemy, addRandomEnemies } from "./enemies";
import { handleCollisions } from "./collisions";

export function startGame(app: PIXI.Application) {
  console.log(app.view.height, app.view.width);
  const player: Player = addPlayer(app);
  const enemies: { [enemyId: string]: Enemy } = addRandomEnemies(app);
  handleCollisions(app, player.sprite, enemies);
}
