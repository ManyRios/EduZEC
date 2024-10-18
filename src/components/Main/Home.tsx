import { welcome } from "../../assets";
import { motion } from "framer-motion";

interface IHome {
  change: (e: number) => void;
}

const Home = ({ change }: IHome) => {
  return (
    <div className="relative ">
      <img src={welcome} className="w-full cover" alt="welcomePage" />
      <div className="flex px-10">
        <motion.button
          className="absolute top-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          animate={{ scale: [1, 1.1, 1]}}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
          onClick={() => {
            change(1);
          }}
        >
          Start Learning {`>`}
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
