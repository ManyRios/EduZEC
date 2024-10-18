import { useState, useEffect } from "react";
import Home from "./components/Main/Home";
import { educationalData } from "./utils/constants";
import Loading from "./components/Loading/Loading";
import {
  FaArrowLeftLong as arrowLeft,
  FaArrowRight as arrowRight,
} from "react-icons/fa6";
import { Icon } from "./ui/Icon";
import { LuHome as home } from "react-icons/lu";
import { Device } from "./components/Main/Device";
import {whatis} from './assets/'
//import { HiDevicePhoneMobile as Device } from "react-icons/hi2";

interface INav {
  actual: number;
  setActual: (e: number) => void;
  changePage: (e: number) => void;
}

const App = () => {
  const [actual, setActual] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [winWidth, setWinWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const { id, title, data } = educationalData[actual];

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [winWidth]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [actual]);

  const changePage = (dir: number) => {
    setIsLoading(true);
    setActual((prev) => {
      const newAct = prev + dir;
      return Math.max(0, Math.min(newAct, educationalData.length - 1));
    });
  };

  console.log(actual);
  console.log(winWidth)
  return (
    <>
      {winWidth < 830 && <Device />}
      {isLoading && <Loading />}

      {actual === 0 ? (
        <Home change={changePage} />
      ) : (
        <div
          className={`w-screen h-screen bg-[${
            actual > 8 ? "#253a4d" : "#fff1c3"
          }] ${isLoading ? 'hidden': ''}`}
        >
          <div
            className={`flex w-full px-10 py-6 text-center text-2xl font-bold `}
          >
            <h1 className="">
              {id}. {title}
            </h1>
          </div>
          <div className="flex w-full">
            <div className="flex flex-row w-full h-auto">
              <div className="flex bg-black p-5 justify-center items-center w-1/2">
                <img src={whatis} alt="img" />
              </div>

              <div className="flex justify-center items-center px-10 w-1/2">
                <h1>{data[0].content}</h1>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Navigation
              actual={actual}
              setActual={setActual}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Navigation = ({ actual, setActual, changePage }: INav) => {
  return (
    <div className="flex w-full justify-center p-5 ">
      <div className="flex flex-row w-2/6 space-x-10 justify-center ">
        {actual != 1 && (
          <Icon
            name="back"
            icon={arrowLeft}
            className="md:w-10  w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125 "
            onClick={() => {
              changePage(-1);
            }}
          />
        )}
        <Icon
          icon={home}
          className="md:w-10 w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125 "
          onClick={() => {
            setActual(0);
          }}
        />
        {actual < educationalData.length - 1 && (
          <Icon
            name="forw"
            icon={arrowRight}
            className="md:w-10 w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125"
            onClick={() => {
              changePage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
