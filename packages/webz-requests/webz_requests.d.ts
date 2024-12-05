/* tslint:disable */
/* eslint-disable */
/**
* A ZIP-321 transaction request
*/
export class PaymentRequest {
  free(): void;
/**
* Construct a new payment request
* @param {string} recipient_address
* @param {bigint} amount
* @param {Uint8Array | undefined} memo
* @param {string | undefined} label
* @param {string | undefined} message
* @param {any} other_params
*/
  constructor(recipient_address: string, amount: bigint, memo: Uint8Array | undefined, label: string | undefined, message: string | undefined, other_params: any);
/**
* Helper method to construct a simple payment request with no memo, label, message, or other parameters.
* @param {string} recipient_address
* @param {bigint} amount
* @returns {PaymentRequest}
*/
  static simple_payment(recipient_address: string, amount: bigint): PaymentRequest;
/**
* Returns the payment address to which the payment should be sent.
* @returns {string}
*/
  recipient_address(): string;
/**
* Returns the value of the payment that is being requested, in zatoshis.
* @returns {bigint}
*/
  amount(): bigint;
/**
* Returns the memo that, if included, must be provided with the payment.
* @returns {Uint8Array | undefined}
*/
  memo(): Uint8Array | undefined;
/**
* A human-readable label for this payment within the larger structure
* of the transaction request.
*
* This will not be part of any generated transactions and is just for display purposes.
* @returns {string | undefined}
*/
  label(): string | undefined;
/**
* A human-readable message to be displayed to the user describing the
* purpose of this payment.
*
* This will not be part of any generated transactions and is just for display purposes.
* @returns {string | undefined}
*/
  message(): string | undefined;
/**
* A list of other arbitrary key/value pairs associated with this payment.
*
* This will not be part of any generated transactions. How these are used is up to the wallet
* @returns {any}
*/
  other_params(): any;
}
/**
* A [ZIP-321](https://zips.z.cash/zip-0321) transaction request
*
* These can be created from a "zcash:" URI string, or constructed from an array of payment requests and encoded as a uri string
*/
export class TransactionRequest {
  free(): void;
/**
* Construct a new transaction request from a list of payment requests
* @param {(PaymentRequest)[]} payments
*/
  constructor(payments: (PaymentRequest)[]);
/**
* Construct an empty transaction request
* @returns {TransactionRequest}
*/
  static empty(): TransactionRequest;
/**
* Returns the list of payment requests that are part of this transaction request.
* @returns {(PaymentRequest)[]}
*/
  payment_requests(): (PaymentRequest)[];
/**
* Returns the total value of the payments in this transaction request, in zatoshis.
* @returns {bigint}
*/
  total(): bigint;
/**
* Decode a transaction request from a "zcash:" URI string.
*
* ## Example
*
* ```javascript
* let uri = "zcash:u1mcxxpa0wyyd3qpkl8rftsa6n7tkh9lv8u8j3zpd9f6qz37dqwur38w6tfl5rpv7m8g8mlca7nyn7qxr5qtjemjqehcttwpupz3fk76q8ft82yh4scnyxrxf2jgywgr5f9ttzh8ah8ljpmr8jzzypm2gdkcfxyh4ad93c889qv3l4pa748945c372ku7kdglu388zsjvrg9dskr0v9zj?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase"
* let request = TransactionRequest.from_uri(uri);
* request.total() == 1; // true
* request.payment_requests().length == 1; // true
* request.payment_requests()[0].recipient_address() == "u1mcxxpa0wyyd3qpk..."; // true
* ```
* @param {string} uri
* @returns {TransactionRequest}
*/
  static from_uri(uri: string): TransactionRequest;
/**
* Returns the URI representation of this transaction request.
* @returns {string}
*/
  to_uri(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_transactionrequest_free: (a: number, b: number) => void;
  readonly transactionrequest_new: (a: number, b: number, c: number) => void;
  readonly transactionrequest_empty: () => number;
  readonly transactionrequest_payment_requests: (a: number, b: number) => void;
  readonly transactionrequest_total: (a: number, b: number) => void;
  readonly transactionrequest_from_uri: (a: number, b: number, c: number) => void;
  readonly transactionrequest_to_uri: (a: number, b: number) => void;
  readonly __wbg_paymentrequest_free: (a: number, b: number) => void;
  readonly paymentrequest_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
  readonly paymentrequest_simple_payment: (a: number, b: number, c: number, d: number) => void;
  readonly paymentrequest_recipient_address: (a: number, b: number) => void;
  readonly paymentrequest_amount: (a: number) => number;
  readonly paymentrequest_memo: (a: number, b: number) => void;
  readonly paymentrequest_label: (a: number, b: number) => void;
  readonly paymentrequest_message: (a: number, b: number) => void;
  readonly paymentrequest_other_params: (a: number) => number;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
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
