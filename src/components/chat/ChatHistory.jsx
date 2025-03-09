import ChatMessage from "./ChatMessage";
import { Icon } from "@iconify/react";

const ChatHistory = ({ chatHistory, isLoading, handleClearHistory }) => (
  <div className="flex-col">
    {chatHistory.length === 0 ? (
      <div className="mt-5">
        <p className="text-xs text-center p-1 font-light leading-[120%] text-black/50">
          Jika ada pesan yang tidak sepantasnya, silahkan lapor <u><a href="https://github.com/yogawan/jawiraiv1.6.3">disini</a></u>
        </p>
      </div>
    ) : (
      chatHistory.map((message, index) => <ChatMessage key={index} message={message} index={index} />)
    )}

    {isLoading && (
      <div className="flex justify-start m-5">
        <Icon icon="line-md:loading-twotone-loop" width="16" height="16" className="mt-3 text-black"/>
        <div className="text-xs max-w-md p-3 rounded-lg bg-background text-black/75">
          Typing...
        </div>
      </div>
    )}

    <div className="flex justify-center p-5">
      <button onClick={handleClearHistory} className="px-5 py-3 bg-black text-xs text-white rounded-full">
        Clear History
      </button>
    </div>
  </div>
);

export default ChatHistory;
