export const CONTRACTS = {
  FROTH: "0x894C458dc459EFA5e06C46E0CAbF85358414a8bB" as `0x${string}`,
  KittyLette: "0xcf34fBc80aadCA902e0256fFB92a9BA722C9fD93" as `0x${string}`,
} as const;

export const CONTRACT_ADDRESSES = {
  [84532]: {
    FROTH: CONTRACTS.FROTH,
    KittyLette: CONTRACTS.KittyLette,
  },
} as const;
