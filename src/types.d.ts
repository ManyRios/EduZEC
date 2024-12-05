import { WebWallet, WalletSummary } from "@webzjs/webz-wallet";

export type State = {
  webWallet?: WebWallet;
  activeAccount?: number;
  summary?: WalletSummary;
  chainHeight?: bigint;
  accountSeeds: Map<number, string>;
  syncInProgress: boolean;
  loading: boolean;
};

export type Action =
  | { type: "set-active-account"; payload: number }
  | { type: "add-account-seed"; payload: [number, string] }
  | { type: "set-web-wallet"; payload: WebWallet }
  | { type: "set-summary"; payload: WalletSummary }
  | { type: "set-chain-height"; payload: bigint }
  | { type: "set-account-seeds"; payload: Map<number, string> }
  | { type: "set-sync-in-progress"; payload: boolean }
  | { type: "set-loading"; payload: boolean };

export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};
