import './App.css';
import ChatInput from './components/ChatInput';
import Message from './components/Message';

function App() {
  const handleSubmit = (value: string) => [
    // 메시지 보내는 api
    console.log(value),
  ];
  return (
    <div className="App">
      <Message color={'white'} />
      <Message color={'yellow'} />
      <ChatInput handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;
