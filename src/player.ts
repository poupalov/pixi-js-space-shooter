import * as PIXI from "pixi.js";

import { getMutexLock, MutexLock } from "./lock";
import { Shot, addShot } from "./shots";

const PLAYER_SPEED = 3;

export function addPlayer(app: PIXI.Application): Player {
  const player: Player = getPlayer();
  app.stage.addChild(player.sprite);
  const { sprite: playerSprite, inputs: playerInputs } = player;
  player.sprite.x = app.view.width / 2;
  player.sprite.y = app.view.height - 150;
  app.ticker.add((timeDelta) => {
    if (playerInputs.has(PlayerInput.fire)) fireShot(app, player);
    if (playerInputs.has(PlayerInput.moveUp))
      playerSprite.y -= timeDelta * PLAYER_SPEED;
    if (playerInputs.has(PlayerInput.moveDown))
      playerSprite.y += timeDelta * PLAYER_SPEED;
    if (playerInputs.has(PlayerInput.moveLeft))
      playerSprite.x -= timeDelta * PLAYER_SPEED;
    if (playerInputs.has(PlayerInput.moveRight))
      playerSprite.x += timeDelta * PLAYER_SPEED;
    playerSprite.x = (playerSprite.x + app.view.width) % app.view.width;
    playerSprite.y = Math.max(0, Math.min(playerSprite.y, app.view.height));
  });
  return player;
}

export type Player = {
  id: string;
  sprite: PIXI.Sprite;
  inputs: Set<PlayerInput>;
  canFireLock: MutexLock;
  firedShots: { [shotId: string]: Shot };
};

function getPlayer(): Player {
  return {
    id: (Math.random() * 1000000).toFixed(),
    sprite: getPlayerSprite(),
    inputs: getPlayerInputs(),
    canFireLock: getMutexLock(),
    firedShots: {},
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

const FIRE_RELOAD_TIME_IN_MILISECONDS = 1 * 1000;

function fireShot(app: PIXI.Application, player: Player): void {
  if (player.canFireLock.tryToAcquire()) {
    setTimeout(player.canFireLock.release, FIRE_RELOAD_TIME_IN_MILISECONDS);
    addShot(app, player);
  }
}
