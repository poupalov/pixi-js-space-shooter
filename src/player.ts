import * as PIXI from "pixi.js";

export function addPlayer(app: PIXI.Application): Player {
  const player: Player = getPlayer();
  app.stage.addChild(player.sprite);
  const { sprite: playerSprite, inputs: playerInputs } = player;
  player.sprite.x = app.view.width / 2;
  player.sprite.y = app.view.height - 150;
  app.ticker.add((timeDelta) => {
    if (playerInputs.has(PlayerInput.fire)) fireShip(app, playerSprite);
    if (playerInputs.has(PlayerInput.moveUp)) playerSprite.y -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveDown)) playerSprite.y += timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveLeft)) playerSprite.x -= timeDelta * 2;
    if (playerInputs.has(PlayerInput.moveRight))
      playerSprite.x += timeDelta * 2;
    playerSprite.x = (playerSprite.x + app.view.width) % app.view.width;
    playerSprite.y = Math.max(0, Math.min(playerSprite.y, app.view.height));
  });
  return player;
}

export type Player = {
  id: string;
  sprite: PIXI.Sprite;
  inputs: Set<PlayerInput>;
  canFire: boolean;
};

function getPlayer(): Player {
  return {
    id: (Math.random() * 1000000).toFixed(),
    sprite: getPlayerSprite(),
    inputs: getPlayerInputs(),
    canFire: true,
  };
}

function getPlayerSprite() {
  const playerSprite = PIXI.Sprite.from("sample.png");
  const spriteHeightToWidthRatio = playerSprite.height / playerSprite.width;
  playerSprite.width = 150;
  playerSprite.height = 150 * spriteHeightToWidthRatio;
  return playerSprite;
}

enum PlayerInput {
  moveUp = "moveUp",
  moveDown = "moveDown",
  moveLeft = "moveLeft",
  moveRight = "moveRight",
  fire = "fire",
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
  " ": PlayerInput.fire,
};

function getPlayerInputs(): Set<PlayerInput> {
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

const SHIP_MAX_DURATION_IN_MILISECONDS = 10 * 1000;

function fireShip(app: PIXI.Application, playerSprite: PIXI.Sprite): void {
  const shipSprite = PIXI.Sprite.from("sample.png");
  const spriteHeightToWidthRatio = shipSprite.height / shipSprite.width;
  shipSprite.x = playerSprite.x;
  shipSprite.y = playerSprite.y;
  shipSprite.width = 50;
  shipSprite.height = 50 * spriteHeightToWidthRatio;
  app.stage.addChild(shipSprite);
  const moveShip = (timeDelta: number) => {
    shipSprite.y -= timeDelta * 5;
  };
  app.ticker.add(moveShip);
  const deleteShip = () => {
    app.ticker.remove(moveShip);
    shipSprite.destroy();
  };
  setTimeout(deleteShip, SHIP_MAX_DURATION_IN_MILISECONDS);
  // return shipSprite;
}
