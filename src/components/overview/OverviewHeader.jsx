import { Icon } from "@iconify/react";
import ProtectedImage from "../utilities/ProtectedImage";

const OverviewHeader = () => (
  <div className="pl-5 pr-5 pb-5 bg-none">
    {/* <Icon icon="fluent:bot-sparkle-48-filled" width="24" height="24" className="text-black mb-2" /> */}
    <ProtectedImage
      src="/company/MekarJS2.png"
      alt="logo"
      className="h-16 mb-3"
    />
    <p className="mb-3 text-black text-left text-xl font-medium">Statistic</p>
    <p className="text-xs text-black/50">
      Ask Anything ~ Tanya apa saja tentang MekarJS, saya adalah asisten AI berbasis LLM dari Meta yang di modifikasi oleh Yogawan. Saya siap membantu anda.
    </p>
  </div>
  );
  
export default OverviewHeader;
  