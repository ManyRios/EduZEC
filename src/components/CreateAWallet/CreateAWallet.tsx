import {createGuy, dash, ezcash, unstopa, ywallet, zashi, zingo} from '../../assets'


interface IButtons {
    url: string;
    pic: string;
}

const CreateAWallet = () => {

  const ButtonsOne = [
    {url: 'https://ywallet.app/installation/', pic: ywallet},
    {url: 'https://electriccoin.co/zashi/', pic: zashi},
    {url: 'https://blog.nerdbank.net/ezcash-app', pic: ezcash},
  ]

  const ButtonsTwo =[
    {url: 'https://www.zingolabs.org/', pic: zingo},
    {url: 'https://unstoppable.money/', pic: unstopa},
    {url: '', pic: dash},
  ]

  return (
    <div className="flex w-full">
    <div className="flex flex-row w-full h-auto">
      <div className="flex  justify-center items-center w-1/2">
        <img src={createGuy} alt="img" />
      </div>
      <div
        className='w-1/2 p-3'
      >
        <div className={`flex flex-row justify-end h-full items-center border-8 rounded-lg border-yellow-400 font-bold `}>
            <div className='flex flex-col'>
                {
                    ButtonsOne.map(({url, pic}: IButtons, i) => (
                        <a href={url} key={url+i} target='_blank'>
                            <img src={pic} className='w-[75%]' alt='logoButton'/>
                        </a>
                       
                    ))
                }
            </div>
            <div className='flex flex-col'>
            {
                    ButtonsTwo.map(({url, pic}: IButtons, i) => (
                        <a href={url} key={url+i} target='_blank'>
                            <img src={pic} className='w-[75%]' alt='logoButton'/>
                        </a>
                       
                    ))
                }
            </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default CreateAWallet


{/* <div
          className={`flex flex-col  w-full h-full justify-center items-start bg-cover bg-center px-20 bg-no-repeat `}
          style={{
            backgroundImage: `url(${shieldedBkg})`,
          }}
        >
         
      
        </div> */}