import { useState } from "react";
import {
  is_valid_zcash_address,
  get_zcash_address_type,
  get_address_receivers,
} from "@elemental-zcash/zaddr_wasm_parser";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

export default function UnifiedAddressVisualizer() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [receivers, setReceivers] = useState<{ [k: string]: string | null }>({});
  const [showQR, setShowQR] = useState(false);

  const handleAnalyze = () => {
    setError("");
    setShowQR(false);
    setReceivers({});

    if (!is_valid_zcash_address(input)) {
      setError("Invalid Zcash address.");
      return;
    }

    const type = get_zcash_address_type(input);
    if (type !== "unified") {
      setError("Only Unified Addresses are supported in this view.");
      return;
    }

    const parsed = get_address_receivers(input);
    setReceivers(parsed);
    setShowQR(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(console.error);
  };

  const receiverEntries = Object.entries(receivers).filter(([_, val]) => val);

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Unified Address Viewer</h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <input
          type="text"
          placeholder="Enter a Unified Address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded text-sm"
        />
        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Analyze
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {showQR && (
  <div className="flex flex-col md:flex-row gap-10 mt-6 items-start">
    <div className="mx-auto">
      <div style={{ height: 180, width: 180 }}>
        <QRCode value={input} style={{ height: "100%", width: "100%" }} />
      </div>
      <p className="text-sm text-center mt-2 text-gray-500 max-w-[200px] break-all">
        {input}
      </p>
    </div>

          <div className="flex flex-col gap-4">
            {receiverEntries.map(([key, value], i) => {
              const colorMap = {
                p2pkh: "border-blue-500 bg-blue-50",
                p2sh: "border-blue-500 bg-blue-50",
                sapling: "border-orange-500 bg-orange-50",
                orchard: "border-green-500 bg-green-50",
              };

              const color = colorMap[key as keyof typeof colorMap] ?? "border-gray-300 bg-gray-50";

              return (
                <motion.div
                  key={key}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className={`border rounded-lg p-4 w-full max-w-md shadow-sm ${color}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{key.toUpperCase()}</p>
                      <p className="text-xs mt-1 break-all text-gray-700">{value}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(value!)}
                      className="ml-2 text-xs text-blue-600 hover:underline"
                    >
                      Copy
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
