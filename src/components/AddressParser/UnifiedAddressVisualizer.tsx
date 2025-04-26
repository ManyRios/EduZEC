import { useState } from "react";
import {
  is_valid_zcash_address,
  get_zcash_address_type,
  get_address_receivers
} from "@elemental-zcash/zaddr_wasm_parser";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { ToastContainer, toast } from 'react-toastify';
import { Icon } from "@/ui/Icon";
import { FaCopy } from "react-icons/fa";

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

  const truncate = (address: string) => {
    const start = address.substring(0, 10);
    const end = address.substring(address.length - 10);
    return `${start}...${end}`;
  }

  const copyToClipboard = (text: string) => {
    toast("Copied to Clipboard!", { className: 'bg-[#18e600] text-white font-bold' });
    navigator.clipboard.writeText(text).catch(console.error);
  };

  const receiverEntries = Object.entries(receivers).filter(([_, val]) => val);

  return (
    <div className={`p-8 max-w-6xl mx-auto  rounded-xl shadow-md space-y-6 ${showQR ? 'border-2 border-white' : ''}`}>
      <h2 className="text-2xl font-bold text-white">Unified Address Viewer</h2>

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
        <div className="flex flex-col md:flex-row gap-10  items-start">
          <div className="mx-auto space-y-2">
            <ToastContainer />
            <div style={{ height: 180, width: 180 }} className="bg-gray-500 p-2 rounded">
              <QRCode value={input} style={{ height: "100%", width: "100%" }} />
            </div>
            <div className="flex flex-row space-x-2">
              <p className="text-sm text-center mt-2  max-w-[200px] break-all text-white">
                {truncate(input)}
              </p>
              <div onClick={() => copyToClipboard(input)} className="flex justify-content-center">
                <Icon icon={FaCopy} className="w-auto h-auto text-white cursor-pointer" />
              </div>

            </div>

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
                    <div className="flex flex-row ml-2 text-xs text-blue-600 hover:underline hover:cursor-pointer space-x-1" onClick={() => copyToClipboard(value!)}>
                      <Icon icon={FaCopy} className="w-auto h-auto" />
                      <span>
                        Copy
                      </span>
                    </div>

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
