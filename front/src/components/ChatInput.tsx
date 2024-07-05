import { useState } from 'react';
import './ChatInput.css';

export default function ChatInput({ handleSubmit }: { handleSubmit: (message: string) => void }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <form
      className="chat_input_box"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(inputValue);
        setInputValue('');
      }}
    >
      <input
        className="chat_input"
        name="id"
        id="chat_input"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.currentTarget.value);
        }}
      />
    </form>
  );
}
