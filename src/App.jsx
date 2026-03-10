import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import ChatInput from "./components/ChatInput.jsx";

function App() {

  const [messages, setMessages] = useState([]);

  async function getAIResponse(message) {

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    return data[0]?.generated_text || "AI could not respond.";
  }

  async function addMessage(message) {

    setMessages(prev => [...prev, message]);

    const aiReply = await getAIResponse(message.text);

    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        text: aiReply
      }
    ]);
  }

  return (
    <div className="main-container">

      <Sidebar />

      <div className="main-chatbox-container">

        <ChatBox messages={messages} />

        <ChatInput addMessage={addMessage} />

      </div>

    </div>
  );
}

export default App;