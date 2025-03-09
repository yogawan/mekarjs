import { Icon } from "@iconify/react";
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message, index }) => (
  <div className={`flex m-5 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
    {message.role !== "user" && (
      <div className="text-center text-xs text-black mt-3">
        <Icon icon="line-md:chat-filled" width="16" height="16" />
      </div>
    )}
    <div className="flex-col">
      <div
        className={`w-full p-3 rounded-xl text-xs ${
          message.role === "user"
            ? "bg-black text-white"
            : "bg-background text-black"
        }`}
      >
        {message.role === "ai" ? (
          <CodeBlock content={message.content} />
        ) : (
          <p className="w-full text-xs">{message.content || "Error: No message content"}</p>
        )}
      </div>
    </div>
  </div>
);

export default ChatMessage;
