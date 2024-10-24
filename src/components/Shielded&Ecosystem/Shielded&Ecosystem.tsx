import { motion } from "framer-motion";
import EcoGif from "../../assets/page6/Ecosystem_gif.webp";
import { shieldedBkg } from "../../assets";
import { freeZ, zecPages, zecHub, zkRadio, zkav, flexa, coinsbee, zpayments, zgo } from "../../assets";

interface IButtons {
  url: string;
  bkg: string;
  name: string;
}

interface IPayment {
  url: string;
  bkg: string;
}

interface IContent {
  id: number
}

const Ecosystem = ({id}: IContent) => {
  const zecButtonsEco = [
    { url: "https://free2z.cash/", bkg: freeZ, name: "Free2Z" },
    { url: "https://zecpages.com/", bkg: zecPages, name: "ZECPages" },
    { url: "https://www.zkav.club/", bkg: zkav, name: "ZKAV Club" },
    { url: "https://zechub.wiki/dao", bkg: zecHub, name: "ZecHub DAO" },
    { url: "https://zcashesp.com/zk-radio/", bkg: zkRadio, name: "zk Radio" },
  ];

  const zecButtonsPay = [
    { url: "https://zgo.cash/", bkg: zgo },
    { url: "https://www.coinsbee.com/", bkg: coinsbee },
    { url: "https://app.flexa.network/", bkg: flexa },
    { url: "https://z.cash/", bkg: zpayments },
  ]
  return (
    <div className="flex w-full">
      <div className="flex flex-row w-full h-auto">
        <div className="flex p-5 justify-center items-center w-1/2">
          <img src={id === 5 ? EcoGif : EcoGif} alt="img" />
        </div>
        <div
          className={`flex justify-center items-center p-2  font-bold w-1/2`}
        >
          <div
            className={`flex flex-col ${id === 5 ? 'space-y-3' : 'space-y-0'} w-full h-full justify-center items-start bg-cover bg-center px-20 bg-no-repeat `}
            style={{
              backgroundImage: `url(${shieldedBkg})`,
            }}
          >
            { id === 5 ? zecButtonsEco.map(({ url, bkg, name }: IButtons, i) => (
              <div key={name + i} className=" w-auto">
                <motion.div
                  
                  className={`flex flex-row w-50 p-2 h-auto items-center justify-start hover:cursor-pointer text-left px-40 bg-cover `}
                  whileHover={{
                    scale: [1, 0.8, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                  }}
                >
                  <motion.img className="w-24" src={bkg} alt="logos" />
                  <motion.a
                    className={` w-auto font-bold text-lg `}
                    href={url}
                    target="_blank"
                  >
                    {name}
                  </motion.a>
                </motion.div>
              </div>
            )) :
            zecButtonsPay.map(({ url, bkg }: IPayment, i) => (
              <div key={url + i} className="flex justify-center items-center w-full px-20">
                <motion.img
                  src={bkg}
                  className={`flex w-[50%] items-center justify-start hover:cursor-pointer text-left  bg-cover `}
                  whileHover={{
                    scale: [1, 0.8, 1, 1.1],
                  }}
                  transition={{
                    repeat: Infinity,
                  }}

                />
                 
          
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecosystem;
