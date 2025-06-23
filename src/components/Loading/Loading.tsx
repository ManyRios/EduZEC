import { motion } from "framer-motion";
import { eduzecLogo } from "../../assets";

interface ILoading {
    actual: number
}

const Loading = ({actual}: ILoading) => {
    
    const variants = { 
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 2
            }
        }
    };
  return (
    <div className={`relative flex flex-col items-center w-full h-screen justify-center z-50`}>
        <motion.img
            src={eduzecLogo}
            alt="logoLoading"
            className={''}
            variants={variants}
            animate="animate"
        />
        <h1 className={`text-4xl font-bold ${actual < 7 ? 'text-black' : 'text-white'}`}>EduZec</h1>
    </div>
  );
};



export default Loading;
