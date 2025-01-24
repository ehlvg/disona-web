import React from "react";

interface ChatMessageProps {
  message: string;
  isOutgoing: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOutgoing }) => {
  return (
    <div
      className={`w-full flex ${
        isOutgoing ? "justify-end" : "justify-start"
      } mb-4 animate-[slideIn_0.2s_ease-out]`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 opacity-0 animate-[fadeIn_0.2s_ease-out_forwards] ${
          isOutgoing
            ? "outgoing-bg text-white rounded-2xl rounded-tr-sm"
            : "text-gray-100 rounded-2xl rounded-tl-sm rounded-2xl border border-gray-200"
        }`}
      >
        <div
          className={`text-gray-200 text-sm italic justify-self-end mb-1 ${
            isOutgoing ? "text-right" : "text-left"
          }`}
        >
          {isOutgoing ? "You" : "Bot"}
        </div>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
