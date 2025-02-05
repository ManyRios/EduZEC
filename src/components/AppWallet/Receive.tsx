import {useState, useEffect } from "react";
import QRCode from "react-qr-code";
import {useWebZjsContext} from '../../context/WebzjsContext' 

/* interface IWallet {
    wallet: string;
} */

export function Receive() {

   const { state } = useWebZjsContext()

    const  [unifiedAddress, setUnifiedAddress] = useState("");

   // const wallet = 'uview1lg2qmmex4ugllpprhph9ygsv0pcun9j4mcdr7scr7tykfgwkly4k8tfzxw9p0n04pmj460ns55kfmsgnu697f94wmzhhnhut59w6k4jplyzgslvkawlew7ypltzy2z4sg3xq4dggrpry39x0fat6w2su09wcshen3qtlcqlw09f6pfpq0jv3dprknals8cd309fr8gureqf70aem5hesg7f7zqunx9dfk2ak2x295e2p6tz5m48qkf5w6tkcntssfas2pcaypyzlrhrakxcxmj5pzssv27wtrc9ls6gk86f7jau9zuaz89p67d0wtwpukkhfz4zpfh7gytkhj5kq5trvcqnavlz76vda37waxn7e06542lf2crg2u0pkrwlf506e8xs8u9pjw'
    
    useEffect(() => {
        const updateUnifiedAddress = async () => {
          if (state.webWallet && state.activeAccount !== undefined) {
            const address = await state.webWallet.get_current_address(
              state.activeAccount
            );
            
            setUnifiedAddress(address);
          }
        };
        updateUnifiedAddress();
        console.log(unifiedAddress, 'trying this first')
      }, [state]);

    return (

        <div>
            <h2 className="text-2xl bold ">{'' + unifiedAddress}</h2>
            <QRCode value={unifiedAddress} />
        </div>

    )
}