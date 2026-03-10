import { useState } from "react";

function ChatInput({ addMessage }) {

  const [input, setInput] = useState("");

  function handleSend() {

    const trimmed = input.trim();

    if (!trimmed) return;

    addMessage({
      role: "user",
      text: trimmed
    });

    setInput("");

  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (

    <div className="chatbox-input-container">

      <input
        type="text"
        placeholder="Send a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>

  );

}

export default ChatInput;