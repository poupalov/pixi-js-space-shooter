import * as PIXI from "pixi.js";

import {
  getPlayerInputs,
  PlayerInput,
  getPlayerSprite,
  movePlayerSprite,
} from "./player";
import { Enemy, addRandomEnemies } from "./enemies";
import { handleCollisions } from "./collisions";

export function startGame(app: PIXI.Application) {
  console.log(app.view.height, app.view.width);
  const playerInputs: Set<PlayerInput> = getPlayerInputs();
  const playerSprite = getPlayerSprite();
  app.stage.addChild(playerSprite);
  movePlayerSprite(app, playerInputs, playerSprite);
  const enemies: { [enemyId: string]: Enemy } = addRandomEnemies(app);
  handleCollisions(app, playerSprite, enemies);
}
