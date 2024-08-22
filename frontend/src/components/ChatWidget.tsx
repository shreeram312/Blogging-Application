import React, { useState, useRef, MouseEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../App.css";

// Ensure APIKEY is defined
//@ts-ignore
const apiKey = import.meta.env.VITE_API_KEY || "";

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(apiKey);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<string[]>([]);

  const [input, setInput] = useState("");
  // Ref for the chat box element
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages([...messages, `You: ${input}`]);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",

        tools: [
          {
            codeExecution: {},
          },
        ],
      });

      setInput(" ");
      const result = await model.generateContent(input);
      console.log(result.response.text());

      const botMessage = result.response.text();

      setMessages([...messages, `You: ${input}`, `ChatGPT: ${botMessage}`]);
      // Clear the input field
    } catch (error: any) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  // Handle enter key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleChatBoxClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`} onClick={toggleChat}>
      <div className="chat-icon">{isOpen ? "×" : "💬"}</div>
      {isOpen && (
        <div className="chat-box" ref={chatBoxRef} onClick={handleChatBoxClick}>
          <div className="chat-header">Chat with us</div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.startsWith("You:") ? "user-message" : "bot-message"
                }`}
              >
                {msg}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
