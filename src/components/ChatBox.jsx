function ChatBox({ messages }) {
  return (
    <div className="chatbox-response-container">

      {messages.map((msg, index) => (
        <div key={index}>
          {msg.text}
        </div>
      ))}

    </div>
  );
}

export default ChatBox;