import { useState } from "react";

function ChatInput({ addMessage }) {

  const [input, setInput] = useState("");

  function handleSend(){

    if(!input.trim()) return;

    addMessage({
      role: "user",
      text: input
    });

    setInput("");
  }

  return (
    <div className="chatbox-input-container">

      <input
        type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            handleSend();
          }
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>
  )
}

export default ChatInput;