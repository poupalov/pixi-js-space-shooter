import * as PIXI from "pixi.js";

const ENEMY_SPAWN_RATE_IN_MILISECONDS = 5 * 1000;
const ENEMY_MAX_DURATION_IN_MILISECONDS = 10 * 1000;

export type Enemy = {
  id: string;
  sprite: PIXI.Sprite;
  delete: () => void;
};

export function addRandomEnemies(
  app: PIXI.Application
): { [enemyId: string]: Enemy } {
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
