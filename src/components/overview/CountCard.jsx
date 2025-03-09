import { Icon } from "@iconify/react";
import ProtectedImage from "../utilities/ProtectedImage";

const CountCard = ({ title, amount, icon, isPositive }) => (
  <div className="bg-black/5 rounded-3xl p-10 mb-3 flex justify-between items-start w-full h-fit">
    
    <div className="flex flex-col">
      <div className="flex justify-start items-center">
        {/* <Icon icon={icon} width="16" height="16" className="text-black mr-3" /> */}
        <p className="text-xl font-bold text-black leading-none">{title}</p>
      </div>

      <div className="m-2"></div>

      <div className="flex justify-start items-center">
        <Icon icon={icon} width="16" height="16" className="text-black mr-3" />
        {/* <p className="text-xs font-normal text-black/75">{type}</p> */}
      </div>

      <div className="m-2"></div>

      <div className="flex justify-start items-center bg-black px-10 py-3 rounded-full w-fit">
        {/* <Icon 
          icon={isPositive ? "bxs:up-arrow" : "bxs:down-arrow"} 
          width="16" 
          height="16" 
          className={isPositive ? "text-green-500 mr-2" : "text-red-500 mr-2"} 
        /> */}
        <p className={`text-3xl font-bold ${isPositive ? "text-white/75" : "text-white/75"}`}>
          {amount.toLocaleString()}
        </p>
      </div>

    </div>

    <div>
      <ProtectedImage
        src="/favicon/F1.png"
        alt="logo"
        className="w-16 animate-spin360"
      />
    </div>
  </div>
);

export default CountCard;
