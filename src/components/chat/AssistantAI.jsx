import React, { useState, useEffect } from "react";
import { requestToGroqAI } from "@/utils/groq";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";

const AssistantAI = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!input.trim() || input.length > 500) return;
  
    const userMessage = { role: "user", content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const aiResponse = await requestToGroqAI(input);
      const aiMessage = { role: "ai", content: aiResponse };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch {
      setChatHistory((prev) => [...prev, { role: "ai", content: "Sorry, an error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="w-[610px] flex flex-col">
      <ChatHeader />
      <ChatForm input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
      <ChatHistory chatHistory={chatHistory} isLoading={isLoading} handleClearHistory={handleClearHistory} />
    </div>
  );
};

export default AssistantAI;
