import { useEffect, useRef } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import { PATH_URL } from './path';

function App() {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(PATH_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };
    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log(message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
  }, []);

  const handleSubmit = (value: string) => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          sender: 2,
          content: value,
        })
      );
    }
  };
  // 메시지 보내는 api

  return (
    <div className="App">
      <Message color={'white'} />
      <Message color={'yellow'} />
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
