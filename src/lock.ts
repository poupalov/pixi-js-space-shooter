export type MutexLock = {
  tryToAcquire: () => boolean;
  release: () => void;
};

const LOCKED_VALUE = 1;
const UNLOCKED_VALUE = 0;

export function getMutexLock(): MutexLock {
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const mutexValue = new Int32Array(sharedArrayBuffer);
  const tryToAcquire = () =>
    Atomics.compareExchange(mutexValue, 0, UNLOCKED_VALUE, LOCKED_VALUE) ===
    UNLOCKED_VALUE;
  const release = () => {
    Atomics.compareExchange(mutexValue, 0, LOCKED_VALUE, UNLOCKED_VALUE);
  };
  return { tryToAcquire, release };
}
