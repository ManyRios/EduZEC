import {motion} from 'framer-motion'
import { exploreGuy } from "../../assets";

const ExploreMore = () => {


  return (
    <div className="flex w-full">
      <div className="flex flex-row w-full h-auto">
        <div className="flex p-5 justify-center items-center w-1/2">
          <img src={exploreGuy} alt="img" />
        </div>
        <div className="flex  justify-center w-1/2 h-full bg-yellow-500 rounded-es-full rounded-tl-full">
          <div className="flex flex-col w-1/2 justify-center items-end space-y-3 ">
            <h1 className="text-center font-bold text-3xl">
              Explore more about Zcash:
            </h1>
            <br />
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-orange-300 p-5 rounded-full" />
              <motion.a
                href="https://forum.zcashcommunity.com/"
                className="text-2xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                Zcash Community Forum
              </motion.a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-yellow-400 p-5 rounded-full" />
              <motion.a
                href="https://discord.com/invite/zcash"
                className="text-2xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                Global Discord Server
              </motion.a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-cyan-700 p-5 rounded-full" />
              <motion.a
                href="https://t.me/zcash_community"
                className="text-2xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                Telegram Group
              </motion.a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-black p-5 rounded-full" />
              <motion.a
                href="https://twitter.com/zcash"
                className="text-2xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: [1, 0.8, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                Twitter/x
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
