import { useRef, useState } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import { SOCKET_PATH_URL } from './path';
import UserModal from './components/UserModal';

function App() {
  const ws = useRef<WebSocket | null>(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<{ content: string; userId: string }[]>([]);

  const handleSubmit = (value: string) => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          user_id: name,
          content: value,
        })
      );
    }
  };

  const handleWebSocket = () => {
    ws.current = new WebSocket(`${SOCKET_PATH_URL}`);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, { userId: message.user_id, content: message.content }]);
      } catch (error) {
        alert('네트워크 오류가 발생했습니다');
      }
    };
  };

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.currentTarget.value);
  };
  return (
    <div className="App">
      <UserModal handleChangeInput={handleChangeName} handleModalClose={handleWebSocket} />
      <div className="message_list">
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              userId={message.userId}
              color={message.userId === name ? 'yellow' : 'white'}
              content={message.content}
            />
          );
        })}
      </div>
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
