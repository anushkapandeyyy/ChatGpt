import { useEffect, useRef } from "react";

function ChatBox({ messages }) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbox">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={
            msg.role === "user"
              ? "message user-message"
              : "message ai-message"
          }
        >
          {msg.text}
        </div>

      ))}

      <div ref={bottomRef}></div>

    </div>
  );
}

export default ChatBox;