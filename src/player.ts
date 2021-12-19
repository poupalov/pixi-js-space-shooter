import * as PIXI from "pixi.js";

export enum PlayerInput {
  moveUp = "moveUp",
  moveDown = "moveDown",
  moveLeft = "moveLeft",
  moveRight = "moveRight",
}

const keyToMoveMap: { [key: string]: PlayerInput } = {
  z: PlayerInput.moveUp,
  ArrowUp: PlayerInput.moveUp,
  s: PlayerInput.moveDown,
  ArrowDown: PlayerInput.moveDown,
  q: PlayerInput.moveLeft,
  ArrowLeft: PlayerInput.moveLeft,
  d: PlayerInput.moveRight,
  ArrowRight: PlayerInput.moveRight,
};

export function getPlayerInputs(): Set<PlayerInput> {
  const playerInputs: Set<PlayerInput> = new Set();
  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (keyToMoveMap[key]) playerInputs.add(keyToMoveMap[key]);
  };
  const handleKeyUp = ({ key }: KeyboardEvent) => {
    if (keyToMoveMap[key]) playerInputs.delete(keyToMoveMap[key]);
  };
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  return playerInputs;
}

export function getPlayerSprite() {
  const playerSprite = PIXI.Sprite.from("sample.png");
  const spriteHeightToWidthRatio = playerSprite.height / playerSprite.width;
  playerSprite.width = 150;
  playerSprite.height = 150 * spriteHeightToWidthRatio;
  return playerSprite;
}

export function movePlayerSprite(
  app: PIXI.Application,
  playerInputs: Set<PlayerInput>,
  playerSprite: PIXI.Sprite
) {
  playerSprite.x = app.view.width / 2;
  playerSprite.y = app.view.height - 150;
  app.ticker.add((timeDelta) => {
    if (playerInputs.has(PlayerInput.moveUp)) playerSprite.y -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveDown)) playerSprite.y += timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveLeft)) playerSprite.x -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveRight))
      playerSprite.x += timeDelta * 2;
    playerSprite.x = (playerSprite.x + app.view.width) % app.view.width;
    playerSprite.y = Math.max(0, Math.min(playerSprite.y, app.view.height));
  });
}
