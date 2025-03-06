import React, { useState, useEffect } from "react";
import { requestToGroqAI } from "@/utils/groq";
import { Icon } from "@iconify/react/dist/iconify.js";

const ChatAIOrganism = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("chatHistory"));
      if (Array.isArray(savedHistory)) {
        setChatHistory(savedHistory);
      }
    } catch {
      setChatHistory([]);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) {
      alert("Please enter a message within 500 characters.");
      return;
    }

    const userMessage = { role: "user", content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await requestToGroqAI(input);
      const aiMessage = { role: "ai", content: aiResponse };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { role: "ai", content: "Sorry, an error occurred. Please try again." };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderContent = (content) =>
    content.split(/(\`\`\`[\s\S]*?\`\`\`)/g).map((part, index) => {
      if (part.startsWith("```")) {
        const code = part.replace(/```[a-z]*\n?/i, "").replace(/```$/, "");

        return (
          <div
            key={index}
            className="flex-col w-[320px] xl:w-full relative border border-white/15 mb-5 bg-gray-900 pt-10 rounded-2xl"
          >
            <button
              onClick={() => handleCopyCode(code, index)}
              className="absolute top-3 right-2 z-10 bg-transparent text-white border text-[8px] border-white/15 px-3 py-1 text-sm rounded-full hover:bg-gray-300 transition"
            >
              {copiedIndex === index ? "Copied!" : "Copy"}
            </button>

            <pre className="bg-black text-white border-t border-white/15 text-[8px] p-4 rounded-b-2xl overflow-x-auto mt-2">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <p key={index} className="mb-2">
          {part
            .split(/(\*\*.*?\*\*)/g)
            .map((subPart, subIndex) =>
              subPart.startsWith("**") && subPart.endsWith("**") ? (
                <strong key={subIndex} className="font-bold">
                  {subPart.replace(/\*\*/g, "")}
                </strong>
              ) : (
                subPart
              )
            )}
        </p>
      );
    });

  return (
    <div>
      <div className="">
        
        <div>
          {/* Headline */}
          <div className="pl-5 pr-5 pb-5 bg-none">
            <Icon icon="fluent:bot-sparkle-48-filled" width="24" height="24" className="text-black mb-5" />
            <p className="mb-3 text-black text-left text-xl font-medium">TanyaAI</p>
            {/* <p className="text-xl font-thin text-white/75"><u><a href="https://github.com/yogawan/jawiraiv1.6.3">Open Source</a></u> <i className="text-white">User Interface</i> to interact with AI Model.</p> */}
            <p className="text-xs text-black/50">Ask Anything ~ Tanya apa saja tentang MekarJS, saya adalah asisten AI berbasis LLM dari Meta yang di modifikasi oleh Yogawan. Saya siap membantu anda.</p>
          </div>

          {/* Form */}
          <div className="bg-transparent border border-black/15 rounded-3xl">
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="bg-transparent text-black rounded-3xl w-full h-20 p-5 resize-none focus:outline-none"
              disabled={isLoading}
            />

            <div className="flex justify-end items-center p-3 rounded-3xl">


              <button
                onClick={handleSend}
                className={`p-5 w-[64px] font-semibold rounded-full transition ${
                  isLoading
                    ? "bg-black text-white cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                disabled={isLoading}
              >
                <Icon icon={ isLoading ? "line-md:loading-twotone-loop" : "line-md:arrow-small-right"} width="24" height="24" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex-col">
            {chatHistory.length === 0 ? (
              <div className="mt-5">
                <p className="text-xs text-center p-1 font-light leading-[120%] text-black/50">Jika ada pesan yang tidak sepantasnya, silahkan lapor disini <u><a href="https://github.com/yogawan/jawiraiv1.6.3">disini</a></u></p>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex m-5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role !== "user" && (
                    <div className="text-center text-xs text-black mt-3">
                      <Icon icon="line-md:chat-filled" width="16" height="16" />
                    </div>
                  )}
                  <div className="flex-col">
                    <div
                      className={`w-fit p-3 rounded-xl ${
                        message.role === "user"
                          ? "text-xs bg-background text-black/75"
                          : "text-xs bg-background text-black/75"
                      }`}
                    >
                      {message.role === "ai"
                        ? renderContent(message.content)
                        : <p className="text-xs">{message.content}</p>}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start m-5">
                <Icon icon="line-md:loading-twotone-loop" width="16" height="16" className="mt-3 text-black"/>
                <div className="text-xs max-w-md p-3 rounded-lg bg-background text-black/75">
                  Typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center p-5">
          <button
            onClick={handleClearHistory}
            className="px-6 py-3 bg-black text-white rounded-full"
          >
            Clear History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAIOrganism;