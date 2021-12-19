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
