import { Icon } from "@iconify/react";
import ProtectedImage from "../utilities/ProtectedImage";

const ChatHeader = () => (
  <div className="pl-5 pr-5 pb-5 bg-none">
    <ProtectedImage
      src="/company/JawirAI.png"
      alt="logo"
      className="h-16 mb-3"
    />
    {/* <Icon icon="fluent:bot-sparkle-48-filled" width="24" height="24" className="text-black mb-2" /> */}
    <p className="mb-3 text-black text-left text-xl font-medium">Ask JawirAI</p>
    <p className="text-xs text-black/50">
      Ask Anything ~ Tanya apa saja tentang MekarJS, saya adalah asisten AI berbasis LLM dari Meta yang di modifikasi oleh Yogawan. Saya siap membantu anda.
    </p>
  </div>
);

export default ChatHeader;
