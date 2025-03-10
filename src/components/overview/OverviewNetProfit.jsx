import { useState } from "react";
import { Icon } from "@iconify/react";

const OverviewNetProfit = ({ summary, type, height, background, color }) => {
  const [isHidden, setIsHidden] = useState(true);

  if (!summary) return null;

  return (
    <div className={`${background} ${height} mb-3 rounded-3xl p-10 flex flex-col justify-between items-start`}>
      <div className="flex items-center justify-between w-full">
        <p className={`text-3xl font-bold ${color}`}>Net Profit</p>
        <Icon icon="iconoir:wallet-solid" width="24" className={color} height="24" />
      </div>

      <p className={color}>{type}</p>

      <p className={`text-3xl font-bold ${color}`}>
        {isHidden ? "***************" : `Rp ${summary.net_profit.toLocaleString()},00`}
      </p>

      <button
        onClick={() => setIsHidden(!isHidden)}
        className={`mt-2 flex items-center justify-center bg-transparent ${color}`}
      >
        <Icon
          icon={isHidden ? "mdi:eye-off" : "mdi:eye"}
          width="20"
          height="20"
        />
      </button>
    </div>
  );
};

export default OverviewNetProfit;
