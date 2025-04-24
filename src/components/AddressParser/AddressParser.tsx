import { useState } from "react";
import {
  is_valid_zcash_address,
  get_zcash_address_type,
  normalize_zcash_address,
  get_address_receivers,
} from "@elemental-zcash/zaddr_wasm_parser";

export default function AddressParser() {
  const [address, setAddress] = useState("");
  const [results, setResults] = useState<{
    type: string;
    normalized: string;
    receivers: { [key: string]: string | null };
  } | null>(null);
  const [error, setError] = useState("");

  const analyze = () => {
    try {
      setError("");

      if (!is_valid_zcash_address(address)) {
        setError("Invalid Zcash address.");
        setResults(null);
        return;
      }

      const type = get_zcash_address_type(address);
      const normalized = normalize_zcash_address(address);
      const receivers = get_address_receivers(address);

      setResults({ type, normalized, receivers });
    } catch (err: unknown) {
      console.error("Parsing error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Zcash Address Parser</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter a Zcash address"
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={analyze}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Parse
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {results && (
        <div className="mt-6">
          <p><strong>Type:</strong> {results.type}</p>
          <p><strong>Normalized:</strong> {results.normalized}</p>
          <div className="mt-3">
            <strong>Receivers:</strong>
            <ul className="list-disc pl-5">
              {Object.entries(results.receivers).map(([k, v]) => (
                <li key={k}>
                  {k}: {v ?? "None"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
