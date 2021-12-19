import * as PIXI from "pixi.js";

import { getPlayerInputs, PlayerInput } from "./playerInput";

export function startGame(app: PIXI.Application) {
  console.log(app.view.height, app.view.width);
  const playerInputs: Set<PlayerInput> = getPlayerInputs();
  const playerSprite = getPlayerSprite();
  app.stage.addChild(playerSprite);
  movePlayerSprite(app, playerInputs, playerSprite);
  addRandomEnemies(app);
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

const ENEMY_SPAWN_RATE_IN_MILISECONDS = 5 * 1000;
const ENEMY_MAX_DURATION_IN_MILISECONDS = 10 * 1000;

function addRandomEnemies(app: PIXI.Application) {
  const addEnemy = () => {
    const enemySprite = PIXI.Sprite.from("sample.png");
    app.stage.addChild(enemySprite);
    const spriteHeightToWidthRatio = enemySprite.height / enemySprite.width;
    enemySprite.width = 50;
    enemySprite.height = 50 * spriteHeightToWidthRatio;
    enemySprite.angle = 180;
    enemySprite.x = Math.random() * app.view.width;
    const moveEnemy = (timeDelta: number) => {
      enemySprite.y += timeDelta * 1;
    };
    app.ticker.add(moveEnemy);
    setTimeout(() => {
      app.ticker.remove(moveEnemy);
      enemySprite.destroy();
    }, ENEMY_MAX_DURATION_IN_MILISECONDS);
  };
  setInterval(addEnemy, ENEMY_SPAWN_RATE_IN_MILISECONDS);
}
