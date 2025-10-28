interface HidingSpot {
  x: number;
  y: number;
}

const storage = new Map<string, HidingSpot>();

export const saveHidingSpot = (gameId: string, spot: HidingSpot) => {
  storage.set(gameId, spot);
};

export const getHidingSpot = (gameId: string) => {
  return storage.get(gameId);
};
