import React, { useState, useRef, MouseEvent } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../App.css";

// Initialize Google Generative AI with API Key
const genAI = new GoogleGenerativeAI(process.env.KEY as string);

const ChatWidget = () => {
  // State to manage whether the chat widget is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to keep track of the messages in the chat
  const [messages, setMessages] = useState<string[]>([]);
  // State for the current input text
  const [input, setInput] = useState("");
  // Ref for the chat box element
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Toggle the chat widget's open/close state
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle input change events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the chat
    setMessages([...messages, `You: ${input}`]);

    // Call Google Generative AI API
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",

        tools: [
          {
            codeExecution: {},
          },
        ],
      });

      // Pass the user's input directly to the model
      const result = await model.generateContent(input);

      const botMessage = result.response.text();
      // Add the bot's message to the chat
      setMessages([...messages, `You: ${input}`, `ChatGPT: ${botMessage}`]);
      // Clear the input field
      setInput(" ");
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

  // Prevent closing the chat widget when clicking inside the chat box
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
              onKeyPress={handleKeyPress} // Handle enter key press
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
