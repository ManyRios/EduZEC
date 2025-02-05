import { startWorkers } from './snippets/wasm-bindgen-rayon-3e04391371ad0a8e/src/workerHelpers.js';
import { startWorker } from './snippets/wasm_thread-8ee53d0673203880/src/wasm32/js/module_worker_start.js';
import * as __wbg_star0 from './snippets/wasm_thread-8ee53d0673203880/src/wasm32/js/module_workers_polyfill.min.js';

let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_4.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_4.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

let stack_pointer = 128;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
function __wbg_adapter_46(arg0, arg1, arg2) {
    try {
        wasm._dyn_core__ops__function__FnMut___A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__ha90cf2322f80b33c(arg0, arg1, addBorrowedObject(arg2));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

function __wbg_adapter_51(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h1ce7f8b03e084418(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_54(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h3d271e8f62a069ae(arg0, arg1, addHeapObject(arg2));
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*/
export function start() {
    wasm.start();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
* Entry point for web workers
* @param {number} ptr
*/
export function wasm_thread_entry_point(ptr) {
    wasm.wasm_thread_entry_point(ptr);
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
function __wbg_adapter_322(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h9729d990f18c9f88(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* @param {number} num_threads
* @returns {Promise<any>}
*/
export function initThreadPool(num_threads) {
    const ret = wasm.initThreadPool(num_threads);
    return takeObject(ret);
}

/**
* @param {number} receiver
*/
export function wbg_rayon_start_worker(receiver) {
    wasm.wbg_rayon_start_worker(receiver);
}

const BlockRangeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blockrange_free(ptr >>> 0, 1));
/**
*/
export class BlockRange {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlockRangeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blockrange_free(ptr, 0);
    }
    /**
    * @returns {number}
    */
    get 0() {
        const ret = wasm.__wbg_get_blockrange_0(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set 0(arg0) {
        wasm.__wbg_set_blockrange_0(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get 1() {
        const ret = wasm.__wbg_get_blockrange_1(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set 1(arg0) {
        wasm.__wbg_set_blockrange_1(this.__wbg_ptr, arg0);
    }
}

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
/**
*/
export class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
    * @returns {string}
    */
    get type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.intounderlyingbytesource_type(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {ReadableByteStreamController} controller
    */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, addHeapObject(controller));
    }
    /**
    * @param {ReadableByteStreamController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
/**
*/
export class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
    * @param {any} chunk
    * @returns {Promise<any>}
    */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, addHeapObject(chunk));
        return takeObject(ret);
    }
    /**
    * @returns {Promise<any>}
    */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return takeObject(ret);
    }
    /**
    * @param {any} reason
    * @returns {Promise<any>}
    */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
        return takeObject(ret);
    }
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
/**
*/
export class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    /**
    * @param {ReadableStreamDefaultController} controller
    * @returns {Promise<any>}
    */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, addHeapObject(controller));
        return takeObject(ret);
    }
    /**
    */
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}

const ProposalFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_proposal_free(ptr >>> 0, 1));
/**
* A handler to an immutable proposal. This can be passed to `create_proposed_transactions` to prove/authorize the transactions
* before they are sent to the network.
*
* The proposal can be reviewed by calling `describe` which will return a JSON object with the details of the proposal.
*/
export class Proposal {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Proposal.prototype);
        obj.__wbg_ptr = ptr;
        ProposalFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ProposalFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_proposal_free(ptr, 0);
    }
    /**
    * Returns a JSON object with the details of the proposal.
    * @returns {any}
    */
    describe() {
        const ret = wasm.proposal_describe(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const WalletSummaryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_walletsummary_free(ptr >>> 0, 1));
/**
*/
export class WalletSummary {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WalletSummary.prototype);
        obj.__wbg_ptr = ptr;
        WalletSummaryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    toJSON() {
        return {
            chain_tip_height: this.chain_tip_height,
            fully_scanned_height: this.fully_scanned_height,
            next_sapling_subtree_index: this.next_sapling_subtree_index,
            next_orchard_subtree_index: this.next_orchard_subtree_index,
            account_balances: this.account_balances,
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WalletSummaryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_walletsummary_free(ptr, 0);
    }
    /**
    * @returns {number}
    */
    get chain_tip_height() {
        const ret = wasm.__wbg_get_walletsummary_chain_tip_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set chain_tip_height(arg0) {
        wasm.__wbg_set_walletsummary_chain_tip_height(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get fully_scanned_height() {
        const ret = wasm.__wbg_get_walletsummary_fully_scanned_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set fully_scanned_height(arg0) {
        wasm.__wbg_set_walletsummary_fully_scanned_height(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {bigint}
    */
    get next_sapling_subtree_index() {
        const ret = wasm.__wbg_get_walletsummary_next_sapling_subtree_index(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set next_sapling_subtree_index(arg0) {
        wasm.__wbg_set_walletsummary_next_sapling_subtree_index(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {bigint}
    */
    get next_orchard_subtree_index() {
        const ret = wasm.__wbg_get_walletsummary_next_orchard_subtree_index(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * @param {bigint} arg0
    */
    set next_orchard_subtree_index(arg0) {
        wasm.__wbg_set_walletsummary_next_orchard_subtree_index(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {any}
    */
    get account_balances() {
        const ret = wasm.walletsummary_account_balances(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const WebWalletFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_webwallet_free(ptr >>> 0, 1));
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

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WebWalletFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_webwallet_free(ptr, 0);
    }
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
    constructor(network, lightwalletd_url, min_confirmations, db_bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(lightwalletd_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            var ptr2 = isLikeNone(db_bytes) ? 0 : passArray8ToWasm0(db_bytes, wasm.__wbindgen_malloc);
            var len2 = WASM_VECTOR_LEN;
            wasm.webwallet_new(retptr, ptr0, len0, ptr1, len1, min_confirmations, ptr2, len2);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            WebWalletFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
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
    create_account(seed_phrase, account_hd_index, birthday_height) {
        const ptr0 = passStringToWasm0(seed_phrase, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.webwallet_create_account(this.__wbg_ptr, ptr0, len0, account_hd_index, !isLikeNone(birthday_height), isLikeNone(birthday_height) ? 0 : birthday_height);
        return takeObject(ret);
    }
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
    create_account_ufvk(encoded_ufvk, birthday_height) {
        const ptr0 = passStringToWasm0(encoded_ufvk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.webwallet_create_account_ufvk(this.__wbg_ptr, ptr0, len0, !isLikeNone(birthday_height), isLikeNone(birthday_height) ? 0 : birthday_height);
        return takeObject(ret);
    }
    /**
    *
    * Start a background sync task which will fetch and scan blocks from the connected lighwalletd server
    *
    * IMPORTANT: This will spawn a new webworker which will handle the sync task. The sync task will continue to run in the background until the sync process is complete.
    * During this time the main thread will not block but certain wallet methods may temporarily block while the wallet is being written to during the sync.
    * @returns {Promise<void>}
    */
    sync() {
        const ret = wasm.webwallet_sync(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<WalletSummary | undefined>}
    */
    get_wallet_summary() {
        const ret = wasm.webwallet_get_wallet_summary(this.__wbg_ptr);
        return takeObject(ret);
    }
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
    propose_transfer(account_id, to_address, value) {
        const ptr0 = passStringToWasm0(to_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.webwallet_propose_transfer(this.__wbg_ptr, account_id, ptr0, len0, value);
        return takeObject(ret);
    }
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
    create_proposed_transactions(proposal, seed_phrase, account_hd_index) {
        _assertClass(proposal, Proposal);
        var ptr0 = proposal.__destroy_into_raw();
        const ptr1 = passStringToWasm0(seed_phrase, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.webwallet_create_proposed_transactions(this.__wbg_ptr, ptr0, ptr1, len1, account_hd_index);
        return takeObject(ret);
    }
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
    db_to_bytes() {
        const ret = wasm.webwallet_db_to_bytes(this.__wbg_ptr);
        return takeObject(ret);
    }
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
    send_authorized_transactions(txids) {
        const ret = wasm.webwallet_send_authorized_transactions(this.__wbg_ptr, addHeapObject(txids));
        return takeObject(ret);
    }
    /**
    * Get the current unified address for a given account. This is returned as a string in canonical encoding
    *
    * # Arguments
    *
    * * `account_id` - The ID of the account to get the address for
    * @param {number} account_id
    * @returns {Promise<string>}
    */
    get_current_address(account_id) {
        const ret = wasm.webwallet_get_current_address(this.__wbg_ptr, account_id);
        return takeObject(ret);
    }
    /**
    *
    * Get the hightest known block height from the connected lightwalletd instance
    * @returns {Promise<bigint>}
    */
    get_latest_block() {
        const ret = wasm.webwallet_get_latest_block(this.__wbg_ptr);
        return takeObject(ret);
    }
}

const wbg_rayon_PoolBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));
/**
*/
export class wbg_rayon_PoolBuilder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.__wbg_ptr = ptr;
        wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        wbg_rayon_PoolBuilderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
    }
    /**
    * @returns {number}
    */
    numThreads() {
        const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    receiver() {
        const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    */
    build() {
        wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_walletsummary_new = function(arg0) {
        const ret = WalletSummary.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_proposal_new = function(arg0) {
        const ret = Proposal.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +getObject(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_set_f975102236d3c502 = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_mark_6045ef1772587264 = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).mark(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_mark_bad820680b8580c2 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).mark(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_measure_1d846b814d43d7e1 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        getObject(arg0).measure(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
    }, arguments) };
    imports.wbg.__wbg_measure_7ca0e5cfef892340 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        getObject(arg0).measure(getStringFromWasm0(arg1, arg2), getObject(arg3));
    }, arguments) };
    imports.wbg.__wbg_performance_72f95fe5952939b5 = function() {
        const ret = globalThis.performance;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_startWorker_8b35da808c857e82 = function() {
        const ret = startWorker();
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbg_fetch_38acb46318f7afdb = function(arg0, arg1) {
        const ret = fetch(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_done_2ffa852272310e47 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_9f6eeb1e2aab8d96 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getReader_ab94afcb5cb7689a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).getReader();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_queueMicrotask_48421b3cc9052b68 = function(arg0) {
        const ret = getObject(arg0).queueMicrotask;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_link_8b58b27602368eaa = function(arg0) {
        const val = `onmessage = function (ev) {
            let [ia, index, value] = ev.data;
            ia = new Int32Array(ia.buffer);
            let result = Atomics.wait(ia, index, value);
            postMessage(result);
        };
        `;
        const ret = typeof URL.createObjectURL === 'undefined' ? "data:application/javascript," + encodeURIComponent(val) : URL.createObjectURL(new Blob([val], { type: "text/javascript" }));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_queueMicrotask_12a30234db4045d3 = function(arg0) {
        queueMicrotask(getObject(arg0));
    };
    imports.wbg.__wbg_waitAsync_cd62c81646382b45 = function() {
        const ret = Atomics.waitAsync;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_waitAsync_3ed212d5e9450545 = function(arg0, arg1, arg2) {
        const ret = Atomics.waitAsync(getObject(arg0), arg1 >>> 0, arg2);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_async_49a1efd7e3e4bd73 = function(arg0) {
        const ret = getObject(arg0).async;
        return ret;
    };
    imports.wbg.__wbg_value_96cb463707ad2f31 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_setbody_734cb3d7ee8e6e96 = function(arg0, arg1) {
        getObject(arg0).body = getObject(arg1);
    };
    imports.wbg.__wbg_setcache_c75a0b02602d486b = function(arg0, arg1) {
        getObject(arg0).cache = ["default","no-store","reload","no-cache","force-cache","only-if-cached",][arg1];
    };
    imports.wbg.__wbg_setcredentials_2b67800db3f7b621 = function(arg0, arg1) {
        getObject(arg0).credentials = ["omit","same-origin","include",][arg1];
    };
    imports.wbg.__wbg_setheaders_be10a5ab566fd06f = function(arg0, arg1) {
        getObject(arg0).headers = getObject(arg1);
    };
    imports.wbg.__wbg_setintegrity_54bb7edb99d51873 = function(arg0, arg1, arg2) {
        getObject(arg0).integrity = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setmethod_dc68a742c2db5c6a = function(arg0, arg1, arg2) {
        getObject(arg0).method = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setmode_a781aae2bd3df202 = function(arg0, arg1) {
        getObject(arg0).mode = ["same-origin","no-cors","cors","navigate",][arg1];
    };
    imports.wbg.__wbg_setredirect_e33e7153977bbd2b = function(arg0, arg1) {
        getObject(arg0).redirect = ["follow","error","manual",][arg1];
    };
    imports.wbg.__wbg_setreferrer_f7fd8739611aba35 = function(arg0, arg1, arg2) {
        getObject(arg0).referrer = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setreferrerpolicy_b3db9b9b13557412 = function(arg0, arg1) {
        getObject(arg0).referrerPolicy = ["","no-referrer","no-referrer-when-downgrade","origin","origin-when-cross-origin","unsafe-url","same-origin","strict-origin","strict-origin-when-cross-origin",][arg1];
    };
    imports.wbg.__wbg_setname_34512937225fceae = function(arg0, arg1, arg2) {
        getObject(arg0).name = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settype_4c4ad7b3603563e6 = function(arg0, arg1) {
        getObject(arg0).type = ["classic","module",][arg1];
    };
    imports.wbg.__wbg_instanceof_Window_5012736c80a01584 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_size_8bb43f42080caff8 = function(arg0) {
        const ret = getObject(arg0).size;
        return ret;
    };
    imports.wbg.__wbg_newwithstrsequence_12085f7160a356d2 = function() { return handleError(function (arg0) {
        const ret = new Blob(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_slice_1a6a4193d55f7b5f = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = getObject(arg0).slice(arg1, arg2, getStringFromWasm0(arg3, arg4));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_instanceof_DedicatedWorkerGlobalScope_a7feec288dff4a90 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof DedicatedWorkerGlobalScope;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_postMessage_815692a1ede7b5f1 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).postMessage(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_new_e27c93803e1acc42 = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_f3a4426bb50622c5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_data_5c47a6985fefc490 = function(arg0) {
        const ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_byobRequest_b32c77640da946ac = function(arg0) {
        const ret = getObject(arg0).byobRequest;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_close_aca7442e6619206b = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_view_2a901bda0727aeb3 = function(arg0) {
        const ret = getObject(arg0).view;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_respond_a799bab31a44f2d7 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).respond(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_close_cef2400b120c9c73 = function() { return handleError(function (arg0) {
        getObject(arg0).close();
    }, arguments) };
    imports.wbg.__wbg_enqueue_6f3d433b5e457aea = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).enqueue(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_read_e48a676fb81ea800 = function(arg0) {
        const ret = getObject(arg0).read();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_releaseLock_1d2d93e9dc8d76e2 = function(arg0) {
        getObject(arg0).releaseLock();
    };
    imports.wbg.__wbg_cancel_97a2795574a4f522 = function(arg0) {
        const ret = getObject(arg0).cancel();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_a31c69e4cc337183 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_status_ae8de515694c5c7c = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_5e283e8345689121 = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_body_40b0ed27714d00ce = function(arg0) {
        const ret = getObject(arg0).body;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbg_createObjectURL_ca544150f40fb1bf = function() { return handleError(function (arg0, arg1) {
        const ret = URL.createObjectURL(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_setonmessage_7cee8e224acfa056 = function(arg0, arg1) {
        getObject(arg0).onmessage = getObject(arg1);
    };
    imports.wbg.__wbg_setonmessageerror_0446a6cb0760bba3 = function(arg0, arg1) {
        getObject(arg0).onmessageerror = getObject(arg1);
    };
    imports.wbg.__wbg_setonerror_78f93b3704303a13 = function(arg0, arg1) {
        getObject(arg0).onerror = getObject(arg1);
    };
    imports.wbg.__wbg_new_25d9d4e2932d816f = function() { return handleError(function (arg0, arg1) {
        const ret = new Worker(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_postMessage_37faac1bc005e5c0 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).postMessage(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_instanceof_WorkerGlobalScope_e34c8a505711a78e = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof WorkerGlobalScope;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_fetch_cb9aad23a79a40a1 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).fetch(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_debug_5a33c41aeac15ee6 = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__wbg_debug_d7780810b3a93632 = function(arg0, arg1, arg2, arg3) {
        console.debug(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_error_09480e4aadca50ad = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__wbg_error_f02f3d66b42c6251 = function(arg0, arg1, arg2, arg3) {
        console.error(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_info_c261acb2deacd903 = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__wbg_info_123d8c35ec14384a = function(arg0, arg1, arg2, arg3) {
        console.info(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_log_b103404cc5920657 = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__wbg_warn_2b3adb99ce26c314 = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__wbg_warn_60924fcf321399f0 = function(arg0, arg1, arg2, arg3) {
        console.warn(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    };
    imports.wbg.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_process_4a72847cc503995b = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_f686565e586dd935 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_cca90b1a94a0255b = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_self_3093d5d1f7bcb682 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_3bcfc4d31bc012f8 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_86b222e13bdf32ed = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_e5a3fe56f8be9485 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_1084a111329e68ce = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_get_3baa728f9d58d3f6 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_ae22078168b726f5 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_new_a220cf903aa02ca2 = function() {
        const ret = new Array();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8608a2b51a5f6737 = function() {
        const ret = new Map();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_de3e9db4440638b2 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_f9cb570345655b9a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_bfda7aa8f252b39f = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_6d39332ab4788d86 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_888179a48810a9fe = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_224d16597dbbfd96 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_525245e2b9901204 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_eval_6e4fc17d87772f52 = function() { return handleError(function (arg0, arg1) {
        const ret = eval(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_673dda6c73d19609 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_isArray_8364a5371e9737d8 = function(arg0) {
        const ret = Array.isArray(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_of_61f336d7eeabfca8 = function(arg0, arg1, arg2) {
        const ret = Array.of(getObject(arg0), getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_push_37c89022f34c01ca = function(arg0, arg1) {
        const ret = getObject(arg0).push(getObject(arg1));
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_61dfc3198373c902 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_new_796382978dfd4fb0 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_89af060b4e1523f2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_set_49185437f0ab06f8 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_random_4a6f48b07d1eab14 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbg_isSafeInteger_7f1ed56200d90674 = function(arg0) {
        const ret = Number.isSafeInteger(getObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_getTime_91058879093a1589 = function(arg0) {
        const ret = getObject(arg0).getTime();
        return ret;
    };
    imports.wbg.__wbg_new0_65387337a95cf44d = function() {
        const ret = new Date();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_create_74febf7e6d272aa6 = function(arg0) {
        const ret = Object.create(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_toString_e17a6671146f47c1 = function(arg0) {
        const ret = getObject(arg0).toString();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_has_4bfbc01db38743f7 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_eacc7d73fefaafdf = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_b7b08af79b0b0974 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_b85e72ed1bfd57f9 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_322(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_570458cb99d56a43 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_catch_a279b1da46d132d8 = function(arg0, arg1) {
        const ret = getObject(arg0).catch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_95e6edc0f89b73b1 = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_876bb3c633745cc6 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_a0719a520adfdb99 = function(arg0) {
        const ret = new Int32Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9 = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_ea1883e1e5e86686 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_d1e79e2388520f18 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_8339fcf5d8ecd12e = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_247a91427532499e = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_ec548f448387c968 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_0710d1b9dbe2eea6 = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_7c2e3576afe181d1 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_byteLength_850664ef28f3e42f = function(arg0) {
        const ret = getObject(arg0).byteLength;
        return ret;
    };
    imports.wbg.__wbg_byteOffset_ea14c35fa6de38cc = function(arg0) {
        const ret = getObject(arg0).byteOffset;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_module = function() {
        const ret = __wbg_init.__wbindgen_wasm_module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_uint8_array_new = function(arg0, arg1) {
        var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1, 1);
        const ret = v0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_startWorkers_2ee336a9694dda13 = function(arg0, arg1, arg2) {
        const ret = startWorkers(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3968 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1589, __wbg_adapter_46);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper3970 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1589, __wbg_adapter_46);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper4190 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1680, __wbg_adapter_51);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper4289 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1716, __wbg_adapter_54);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper4291 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1716, __wbg_adapter_54);
        return addHeapObject(ret);
    };
    imports['./snippets/wasm_thread-8ee53d0673203880/src/wasm32/js/module_workers_polyfill.min.js'] = __wbg_star0;

    return imports;
}

function __wbg_init_memory(imports, memory) {
    imports.wbg.memory = memory || new WebAssembly.Memory({initial:837,maximum:16384,shared:true});
}

function __wbg_finalize_init(instance, module, thread_stack_size) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;

if (typeof thread_stack_size !== 'undefined' && (typeof thread_stack_size !== 'number' || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) { throw 'invalid stack size' }
wasm.__wbindgen_start(thread_stack_size);
return wasm;
}

function initSync(module, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (typeof module !== 'undefined' && Object.getPrototypeOf(module) === Object.prototype)
    ({module, memory, thread_stack_size} = module)
    else
    console.warn('using deprecated parameters for `initSync()`; pass a single object instead')

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports, memory);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}

async function __wbg_init(module_or_path, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (typeof module_or_path !== 'undefined' && Object.getPrototypeOf(module_or_path) === Object.prototype)
    ({module_or_path, memory, thread_stack_size} = module_or_path)
    else
    console.warn('using deprecated parameters for the initialization function; pass a single object instead')

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('webz_wallet_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports, memory);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}

export { initSync };
export default __wbg_init;
