import { motion } from "framer-motion";
import { eduzecLogo } from "../../assets";

const Loading = () => {
    
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
    <div className={`flex flex-col items-center w-full h-screen justify-center `}>
        <motion.img
            src={eduzecLogo}
            alt="logoLoading"
            className={''}
            variants={variants}
            animate="animate"
        />
        <h1 className="text-4xl font-bold">EduZec</h1>
    </div>
  );
};



export default Loading;
