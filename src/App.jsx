import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import ChatInput from "./components/ChatInput.jsx";
import "./App.css";

function App() {

  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [] }
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  async function getAIResponse(message) {

    const response = await fetch("http://localhost:5001/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    return data?.[0]?.generated_text || "AI could not respond.";
  }

  async function addMessage(message) {

    const updatedChats = chats.map(chat => {

      if (chat.id === currentChatId) {

        return {
          ...chat,
          messages: [...chat.messages, message]
        };

      }

      return chat;

    });

    setChats(updatedChats);

    const aiReply = await getAIResponse(message.text);

    const finalChats = updatedChats.map(chat => {

      if (chat.id === currentChatId) {

        return {
          ...chat,
          messages: [
            ...chat.messages,
            { role: "ai", text: aiReply }
          ]
        };

      }

      return chat;

    });

    setChats(finalChats);

  }

  function createNewChat() {

    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };

    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);

  }

  return (

    <div className="main-container">

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        createNewChat={createNewChat}
      />

      <div className="main-chatbox-container">

        <ChatBox messages={currentChat.messages} />

        <ChatInput addMessage={addMessage} />

      </div>

    </div>

  );
}

export default App;