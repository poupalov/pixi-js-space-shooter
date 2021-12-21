import * as PIXI from "pixi.js";

import { Player, addPlayer } from "./player";
import { Enemy, addRandomEnemies } from "./enemies";
import { handleCollisions } from "./collisions";

export type Game = {
  numberOfDestroyedEnemies: number;
};

export function startGame(
  app: PIXI.Application,
  setGame: (newGame: Game) => void
): Game {
  const player: Player = addPlayer(app);
  const enemies: { [enemyId: string]: Enemy } = addRandomEnemies(app);
  const game: Game = { numberOfDestroyedEnemies: 0 };
  handleCollisions(app, player, enemies, game, setGame);
  return game;
}
