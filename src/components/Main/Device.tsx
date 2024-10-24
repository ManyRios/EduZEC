import { motion } from "framer-motion";
import mobile from "../../assets/rotate.png";

export const Device = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full p-20 space-y-10 h-full bg-[#fff1c3]">
      <motion.img
        src={mobile}
        className=" w-1/2 rounded-xl"
        animate={{ rotate: [-45, 45, 45, -45] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      ></motion.img>

      <h1 className="text-xl font-semibold">Rotate your Device</h1>
    </div>
  );
};
