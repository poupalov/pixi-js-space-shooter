import * as PIXI from "pixi.js";

import { getPlayerInputs, PlayerInput } from "./playerInput";

export function startGame(app: PIXI.Application) {
  console.log(app.view.height, app.view.width);
  const playerInputs: Set<PlayerInput> = getPlayerInputs();
  const playerSprite = getPlayerSprite();
  app.stage.addChild(playerSprite);
  movePlayerSprite(app, playerInputs, playerSprite);
}

function getPlayerSprite() {
  const playerSprite = PIXI.Sprite.from("sample.png");
  const spriteHeightToWidthRatio = playerSprite.height / playerSprite.width;
  playerSprite.width = 150;
  playerSprite.height = 150 * spriteHeightToWidthRatio;
  return playerSprite;
}

function movePlayerSprite(
  app: PIXI.Application,
  playerInputs: Set<PlayerInput>,
  playerSprite: PIXI.Sprite
) {
  app.ticker.add((timeDelta) => {
    if (playerInputs.has(PlayerInput.moveUp)) playerSprite.y -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveDown)) playerSprite.y += timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveLeft)) playerSprite.x -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveRight))
      playerSprite.x += timeDelta * 2;
    playerSprite.x = Math.max(0, Math.min(playerSprite.x, app.view.width));
    playerSprite.y = Math.max(0, Math.min(playerSprite.y, app.view.height));
  });
}
