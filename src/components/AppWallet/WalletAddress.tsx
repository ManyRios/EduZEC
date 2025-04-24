import UnifiedAddressVisualizer from "@/components/AddressParser/UnifiedAddressVisualizer";

export default function WalletAddress() {
  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Wallet Address</h1>
      <UnifiedAddressVisualizer />
    </div>
  );
}
