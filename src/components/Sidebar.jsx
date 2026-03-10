function Sidebar({ chats, currentChatId, setCurrentChatId, createNewChat }) {

  return (

    <div className="sidebar">

      <button className="new-chat-btn" onClick={createNewChat}>
        + New Chat
      </button>

      <div className="chat-history">

        {chats.map(chat => (

          <div
            key={chat.id}
            className={
              chat.id === currentChatId
                ? "chat-item active-chat"
                : "chat-item"
            }
            onClick={() => setCurrentChatId(chat.id)}
          >

            {chat.title}

          </div>

        ))}

      </div>

    </div>

  );

}

export default Sidebar;