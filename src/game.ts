import * as PIXI from "pixi.js";

import { getPlayerInputs, PlayerInput } from "./playerInput";

export function startGame(app: PIXI.Application) {
  console.log(app.view.height, app.view.width);
  const playerInputs: Set<PlayerInput> = getPlayerInputs();
  const playerSprite = getPlayerSprite();
  app.stage.addChild(playerSprite);
  movePlayerSprite(app, playerInputs, playerSprite);
  const enemies: { [enemyId: string]: Enemy } = addRandomEnemies(app);
  handleCollisions(app, playerSprite, enemies);
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

type Enemy = {
  id: string;
  sprite: PIXI.Sprite;
  delete: () => void;
};

function addRandomEnemies(app: PIXI.Application): { [enemyId: string]: Enemy } {
  const enemies: { [enemyId: string]: Enemy } = {};
  const addEnemy = () => {
    const enemyId = (Math.random() * 1000000).toFixed(); // 6 digit
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
    const deleteEnemy = () => {
      app.ticker.remove(moveEnemy);
      enemySprite.destroy();
      delete enemies[enemyId];
    };
    app.ticker.add(moveEnemy);
    setTimeout(() => deleteEnemy, ENEMY_MAX_DURATION_IN_MILISECONDS);
    enemies[enemyId] = {
      id: enemyId,
      sprite: enemySprite,
      delete: deleteEnemy,
    };
  };
  setInterval(addEnemy, ENEMY_SPAWN_RATE_IN_MILISECONDS);
  return enemies;
}

function handleCollisions(
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
