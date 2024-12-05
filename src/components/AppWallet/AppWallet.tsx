import initWasm,{ initThreadPool, WebWallet } from "@webzjs/webz-wallet";

export async function AppWallet() {
  const MAINNET_LIGHTWALLETD_PROXY = "https://zcash-mainnet.chainsafe.dev"
  await initWasm();
  await initThreadPool(10); 

  const wallet = new WebWallet("main", MAINNET_LIGHTWALLETD_PROXY, 10)
  wallet.sync()
  console.log(wallet, 'Wallet')
};