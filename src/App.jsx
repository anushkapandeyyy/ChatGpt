import Sidebar from './components/Sidebar.jsx'
import ChatBox from './components/ChatBox.jsx'
import ChatInput from './components/ChatInput'

function App() {
  return (
        <div className = "main-container">

         <Sidebar />
          <div className = "main-chatbox-container">
            <ChatBox />
            <ChatInput />
            
             </div>
        </div>
  )
}

export default App