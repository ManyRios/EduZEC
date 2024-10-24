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
              Explore more about Zcash
            </h1>
            <br />
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-orange-300 p-5 rounded-full" />
              <a
                href="http://"
                className="text-3xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zcash Community Forum
              </a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-yellow-400 p-5 rounded-full" />
              <a
                href="http://"
                className="text-3xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Global Discord Server
              </a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-cyan-700 p-5 rounded-full" />
              <a
                href="http://"
                className="text-3xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram Group
              </a>
            </div>
            <div className="flex flex-row space-x-2 justify-end w-auto h-auto">
              <div className="w-auto bg-black p-5 rounded-full" />
              <a
                href="http://"
                className="text-3xl font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter/x
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
