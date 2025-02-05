/* tslint:disable */
/* eslint-disable */
/**
*/
export function start(): void;
/**
* Entry point for web workers
* @param {number} ptr
*/
export function wasm_thread_entry_point(ptr: number): void;
/**
* @param {number} num_threads
* @returns {Promise<any>}
*/
export function initThreadPool(num_threads: number): Promise<any>;
/**
* @param {number} receiver
*/
export function wbg_rayon_start_worker(receiver: number): void;
/**
*/
export class BlockRange {
  free(): void;
/**
*/
  0: number;
/**
*/
  1: number;
}
/**
*/
export class IntoUnderlyingByteSource {
  free(): void;
/**
* @param {ReadableByteStreamController} controller
*/
  start(controller: ReadableByteStreamController): void;
/**
* @param {ReadableByteStreamController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableByteStreamController): Promise<any>;
/**
*/
  cancel(): void;
/**
*/
  readonly autoAllocateChunkSize: number;
/**
*/
  readonly type: string;
}
/**
*/
export class IntoUnderlyingSink {
  free(): void;
/**
* @param {any} chunk
* @returns {Promise<any>}
*/
  write(chunk: any): Promise<any>;
/**
* @returns {Promise<any>}
*/
  close(): Promise<any>;
/**
* @param {any} reason
* @returns {Promise<any>}
*/
  abort(reason: any): Promise<any>;
}
/**
*/
export class IntoUnderlyingSource {
  free(): void;
/**
* @param {ReadableStreamDefaultController} controller
* @returns {Promise<any>}
*/
  pull(controller: ReadableStreamDefaultController): Promise<any>;
/**
*/
  cancel(): void;
}
/**
* A handler to an immutable proposal. This can be passed to `create_proposed_transactions` to prove/authorize the transactions
* before they are sent to the network.
*
* The proposal can be reviewed by calling `describe` which will return a JSON object with the details of the proposal.
*/
export class Proposal {
  free(): void;
/**
* Returns a JSON object with the details of the proposal.
* @returns {any}
*/
  describe(): any;
}
/**
*/
export class WalletSummary {
/**
** Return copy of self without private attributes.
*/
  toJSON(): Object;
/**
* Return stringified version of self.
*/
  toString(): string;
  free(): void;
/**
*/
  readonly account_balances: any;
/**
*/
  chain_tip_height: number;
/**
*/
  fully_scanned_height: number;
/**
*/
  next_orchard_subtree_index: bigint;
/**
*/
  next_sapling_subtree_index: bigint;
}
/**
* # A Zcash wallet
*
* This is the main entry point for interacting with this library.
* For the most part you will only need to create and interact with a Wallet instance.
*
* A wallet is a set of accounts that can be synchronized together with the blockchain.
* Once synchronized, the wallet can be used to propose, build and send transactions.
*
* Create a new WebWallet with
* ```javascript
* const wallet = new WebWallet("main", "https://zcash-mainnet.chainsafe.dev", 10);
* ```
*
* ## Adding Accounts
*
* Accounts can be added by either importing a seed phrase or a Unified Full Viewing Key (UFVK).
* If you do import via a UFVK it is important that you also have access to the Unified Spending Key (USK) for that account otherwise the wallet will not be able to create transactions.
*
* When importing an account you can also specify the block height at which the account was created. This can significantly reduce the time it takes to sync the account as the wallet will only scan for transactions after this height.
* Failing to provide a birthday height will result in extremely slow sync times as the wallet will need to scan the entire blockchain.
*
* e.g.
* ```javascript
* const account_id = await wallet.create_account("...", 1, 2657762)
*
* // OR
*
* const account_id = await wallet.import_ufvk("...", 2657762)
* ``
*
* ## Synchronizing
*
* The wallet can be synchronized with the blockchain by calling the `sync` method. This will fetch compact blocks from the connected lightwalletd instance and scan them for transactions.
* The sync method uses a built-in strategy to determine which blocks is needs to download and scan in order to gain full knowledge of the balances for all accounts that are managed.
*
* Syncing is a long running process and so is delegated to a WebWorker to prevent from blocking the main thread. It is safe to call other methods on the wallet during syncing although they may take
* longer than usual while they wait for a write-lock to be released.
*
* ```javascript
* await wallet.sync();
* ```
*
* ## Transacting
*
* Sending a transaction is a three step process: proposing, authorizing, and sending.
*
* A transaction proposal is created by calling `propose_transfer` with the intended recipient and amount. This will create a proposal object that describes which notes will be spent in order to fulfil this request.
* The proposal should be presented to the user for review before being authorized.
*
* To authorize the transaction the caller must currently provide the seed phrase and account index of the account that will be used to sign the transaction. This method also perform the SNARK proving which is an expensive operation and performed in parallel by a series of WebWorkers.
* Note: Handing the sensitive key material this way is not recommended for production applications. Upcoming changes to how proposals are authorized will allow separation of proof generation and signing but currently these are coupled.
*
* Finally, A transaction can be sent to the network by calling `send_authorized_transactions` with the list of transaction IDs that were generated by the authorization step.
*
* The full flow looks like
* ```javascript
* const proposal = wallet.propose_transfer(1, "...", 100000000);
* const authorized_txns = wallet.create_proposed_transactions(proposal, "...", 1);
* await wallet.send_authorized_transactions(authorized_txns);
* ```
*/
export class WebWallet {
  free(): void;
/**
* Create a new instance of a Zcash wallet for a given network. Only one instance should be created per page.
*
* # Arguments
*
* * `network` - Must be one of "main" or "test"
* * `lightwalletd_url` - Url of the lightwalletd instance to connect to (e.g. https://zcash-mainnet.chainsafe.dev)
* * `min_confirmations` - Number of confirmations required before a transaction is considered final
* * `db_bytes` - (Optional) UInt8Array of a serialized wallet database. This can be used to restore a wallet from a previous session that was serialized by `db_to_bytes`
*
* # Examples
*
* ```javascript
* const wallet = new WebWallet("main", "https://zcash-mainnet.chainsafe.dev", 10);
* ```
* @param {string} network
* @param {string} lightwalletd_url
* @param {number} min_confirmations
* @param {Uint8Array | undefined} [db_bytes]
*/
  constructor(network: string, lightwalletd_url: string, min_confirmations: number, db_bytes?: Uint8Array);
/**
* Add a new account to the wallet using a given seed phrase
*
* # Arguments
*
* * `seed_phrase` - 24 word mnemonic seed phrase
* * `account_hd_index` - [ZIP32](https://zips.z.cash/zip-0032) hierarchical deterministic index of the account
* * `birthday_height` - Block height at which the account was created. The sync logic will assume no funds are send or received prior to this height which can VERY significantly reduce sync time
*
* # Examples
*
* ```javascript
* const wallet = new WebWallet("main", "https://zcash-mainnet.chainsafe.dev", 10);
* const account_id = await wallet.create_account("...", 1, 2657762)
* ```
* @param {string} seed_phrase
* @param {number} account_hd_index
* @param {number | undefined} [birthday_height]
* @returns {Promise<number>}
*/
  create_account(seed_phrase: string, account_hd_index: number, birthday_height?: number): Promise<number>;
/**
* Add a new account to the wallet by directly importing a Unified Full Viewing Key (UFVK)
*
* # Arguments
*
* * `key` - [ZIP316](https://zips.z.cash/zip-0316) encoded UFVK
* * `birthday_height` - Block height at which the account was created. The sync logic will assume no funds are send or received prior to this height which can VERY significantly reduce sync time
*
* # Examples
*
* ```javascript
* const wallet = new WebWallet("main", "https://zcash-mainnet.chainsafe.dev", 10);
* const account_id = await wallet.import_ufvk("...", 2657762)
* ```
* @param {string} encoded_ufvk
* @param {number | undefined} [birthday_height]
* @returns {Promise<number>}
*/
  create_account_ufvk(encoded_ufvk: string, birthday_height?: number): Promise<number>;
/**
*
* Start a background sync task which will fetch and scan blocks from the connected lighwalletd server
*
* IMPORTANT: This will spawn a new webworker which will handle the sync task. The sync task will continue to run in the background until the sync process is complete.
* During this time the main thread will not block but certain wallet methods may temporarily block while the wallet is being written to during the sync.
* @returns {Promise<void>}
*/
  sync(): Promise<void>;
/**
* @returns {Promise<WalletSummary | undefined>}
*/
  get_wallet_summary(): Promise<WalletSummary | undefined>;
/**
* Create a new transaction proposal to send funds to a given address
*
* Not this does NOT sign, generate a proof, or send the transaction. It will only craft the proposal which designates how notes from this account can be spent to realize the requested transfer.
*
* # Arguments
*
* * `account_id` - The ID of the account in this wallet to send funds from
* * `to_address` - [ZIP316](https://zips.z.cash/zip-0316) encoded address to send funds to
* * `value` - Amount to send in Zatoshis (1 ZEC = 100_000_000 Zatoshis)
*
* # Returns
*
* A proposal object which can be inspected and later used to generate a valid transaction
*
* # Examples
*
* ```javascript
* const proposal = await wallet.propose_transfer(1, "u18rakpts0de589sx9dkamcjms3apruqqax9k2s6e7zjxx9vv5kc67pks2trg9d3nrgd5acu8w8arzjjuepakjx38dyxl6ahd948w0mhdt9jxqsntan6px3ysz80s04a87pheg2mqvlzpehrgup7568nfd6ez23xd69ley7802dfvplnfn7c07vlyumcnfjul4pvv630ac336rjhjyak5", 100000000);
* ```
* @param {number} account_id
* @param {string} to_address
* @param {bigint} value
* @returns {Promise<Proposal>}
*/
  propose_transfer(account_id: number, to_address: string, value: bigint): Promise<Proposal>;
/**
* Generate a valid Zcash transaction from a given proposal
*
* IMPORTANT: This will spawn a new webworker which will handle the proving task which may take 10s of seconds
*
* # Arguments
*
* * `proposal` - A proposal object generated by `propose_transfer`
* * `seed_phrase` - 24 word mnemonic seed phrase. This MUST correspond to the accountID used when creating the proposal.
* * `account_hd_index` - [ZIP32](https://zips.z.cash/zip-0032) hierarchical deterministic index of the account. This MUST correspond to the accountID used when creating the proposal.
*
* # Returns
*
* A list of transaction IDs which can be used to track the status of the transaction on the network.
* The transactions themselves are stored within the wallet
*
* # Examples
*
* ```javascript
* const proposal = await wallet.propose_transfer(1, "u18rakpts0de589sx9dkamcjms3apruqqax9k2s6e7zjxx9vv5kc67pks2trg9d3nrgd5acu8w8arzjjuepakjx38dyxl6ahd948w0mhdt9jxqsntan6px3ysz80s04a87pheg2mqvlzpehrgup7568nfd6ez23xd69ley7802dfvplnfn7c07vlyumcnfjul4pvv630ac336rjhjyak5", 100000000);
* const authorized_txns = await wallet.create_proposed_transactions(proposal, "...", 1);
* ```
* @param {Proposal} proposal
* @param {string} seed_phrase
* @param {number} account_hd_index
* @returns {Promise<any>}
*/
  create_proposed_transactions(proposal: Proposal, seed_phrase: string, account_hd_index: number): Promise<any>;
/**
* Serialize the internal wallet database to bytes
*
* This should be used for persisting the wallet between sessions. The resulting byte array can be used to construct a new wallet instance.
* Note this method is async and will block until a read-lock can be acquired on the wallet database
*
* # Returns
*
* A postcard encoded byte array of the wallet database
* @returns {Promise<Uint8Array>}
*/
  db_to_bytes(): Promise<Uint8Array>;
/**
* Send a list of authorized transactions to the network to be included in the blockchain
*
* These will be sent via the connected lightwalletd instance
*
* # Arguments
*
* * `txids` - A list of transaction IDs (typically generated by `create_proposed_transactions`)
*
* # Examples
*
* ```javascript
* const proposal = wallet.propose_transfer(1, "u18rakpts0de589sx9dkamcjms3apruqqax9k2s6e7zjxx9vv5kc67pks2trg9d3nrgd5acu8w8arzjjuepakjx38dyxl6ahd948w0mhdt9jxqsntan6px3ysz80s04a87pheg2mqvlzpehrgup7568nfd6ez23xd69ley7802dfvplnfn7c07vlyumcnfjul4pvv630ac336rjhjyak5", 100000000);
* const authorized_txns = wallet.create_proposed_transactions(proposal, "...", 1);
* await wallet.send_authorized_transactions(authorized_txns);
* ```
* @param {any} txids
* @returns {Promise<void>}
*/
  send_authorized_transactions(txids: any): Promise<void>;
/**
* Get the current unified address for a given account. This is returned as a string in canonical encoding
*
* # Arguments
*
* * `account_id` - The ID of the account to get the address for
* @param {number} account_id
* @returns {Promise<string>}
*/
  get_current_address(account_id: number): Promise<string>;
/**
*
* Get the hightest known block height from the connected lightwalletd instance
* @returns {Promise<bigint>}
*/
  get_latest_block(): Promise<bigint>;
}
/**
*/
export class wbg_rayon_PoolBuilder {
  free(): void;
/**
* @returns {number}
*/
  numThreads(): number;
/**
* @returns {number}
*/
  receiver(): number;
/**
*/
  build(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_proposal_free: (a: number, b: number) => void;
  readonly proposal_describe: (a: number) => number;
  readonly __wbg_webwallet_free: (a: number, b: number) => void;
  readonly webwallet_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly webwallet_create_account: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly webwallet_create_account_ufvk: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly webwallet_sync: (a: number) => number;
  readonly webwallet_get_wallet_summary: (a: number) => number;
  readonly webwallet_propose_transfer: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly webwallet_create_proposed_transactions: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly webwallet_db_to_bytes: (a: number) => number;
  readonly webwallet_send_authorized_transactions: (a: number, b: number) => number;
  readonly webwallet_get_current_address: (a: number, b: number) => number;
  readonly webwallet_get_latest_block: (a: number) => number;
  readonly __wbg_walletsummary_free: (a: number, b: number) => void;
  readonly __wbg_get_walletsummary_chain_tip_height: (a: number) => number;
  readonly __wbg_set_walletsummary_chain_tip_height: (a: number, b: number) => void;
  readonly __wbg_get_walletsummary_fully_scanned_height: (a: number) => number;
  readonly __wbg_set_walletsummary_fully_scanned_height: (a: number, b: number) => void;
  readonly __wbg_get_walletsummary_next_sapling_subtree_index: (a: number) => number;
  readonly __wbg_set_walletsummary_next_sapling_subtree_index: (a: number, b: number) => void;
  readonly __wbg_get_walletsummary_next_orchard_subtree_index: (a: number) => number;
  readonly __wbg_set_walletsummary_next_orchard_subtree_index: (a: number, b: number) => void;
  readonly walletsummary_account_balances: (a: number) => number;
  readonly start: () => void;
  readonly __wbg_blockrange_free: (a: number, b: number) => void;
  readonly __wbg_get_blockrange_0: (a: number) => number;
  readonly __wbg_set_blockrange_0: (a: number, b: number) => void;
  readonly __wbg_get_blockrange_1: (a: number) => number;
  readonly __wbg_set_blockrange_1: (a: number, b: number) => void;
  readonly __wbg_wbg_rayon_poolbuilder_free: (a: number, b: number) => void;
  readonly wbg_rayon_poolbuilder_numThreads: (a: number) => number;
  readonly wbg_rayon_poolbuilder_receiver: (a: number) => number;
  readonly wbg_rayon_poolbuilder_build: (a: number) => void;
  readonly initThreadPool: (a: number) => number;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly wasm_thread_entry_point: (a: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_type: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_start: (a: number, b: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: number) => number;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly intounderlyingsink_write: (a: number, b: number) => number;
  readonly intounderlyingsink_close: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: number) => number;
  readonly rustsecp256k1_v0_8_1_context_create: (a: number) => number;
  readonly rustsecp256k1_v0_8_1_context_destroy: (a: number) => void;
  readonly rustsecp256k1_v0_8_1_default_illegal_callback_fn: (a: number, b: number) => void;
  readonly rustsecp256k1_v0_8_1_default_error_callback_fn: (a: number, b: number) => void;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut___A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha90cf2322f80b33c: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1ce7f8b03e084418: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3d271e8f62a069ae: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h9729d990f18c9f88: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_thread_destroy: (a?: number, b?: number, c?: number) => void;
  readonly __wbindgen_start: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number }} module - Passing `SyncInitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number } | SyncInitInput, memory?: WebAssembly.Memory): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number }} module_or_path - Passing `InitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number } | InitInput | Promise<InitInput>, memory?: WebAssembly.Memory): Promise<InitOutput>;
