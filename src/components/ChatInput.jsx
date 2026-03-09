import { useState } from "react";

function ChatInput() {
  const[input, setMessage] = useState("");

  function handleSend(){
    if(!input.trim()) return;

    console.log("Message sent: ", input);
    setMessage("");
  }

  return (
    <div className="chatbox-input-container">
      <input type="text" placeholder="Type your message here..." value={input} 
      onChange={(e) => setMessage(e.target.value)} />
      <button className="send-button" onClick={handleSend}>Send</button>
    </div>
  )
}

export default ChatInput;