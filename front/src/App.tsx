import { useRef, useState } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import Modal from 'react-modal';
import { SOCKET_PATH_URL } from './path';

function App() {
  const ws = useRef<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState(true);
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

  const handleModalClose = () => {
    setIsOpen(false);
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
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        style={{
          content: {
            width: '32%',
            height: '32%',
            zIndex: '150',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}
      >
        <div>이름 입력</div>
        <input onChange={handleChangeName} />
        <button onClick={handleModalClose}>완료</button>
      </Modal>
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
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
