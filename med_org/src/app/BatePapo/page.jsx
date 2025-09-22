"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './style.css';

function Chat() {
  const router = useRouter();

  const [messages, setMessages] = useState([
    { from: 'system', text: 'Bom dia Narceja. Como você está se sentindo hoje?' },
    { from: 'user', text: 'Olá Dr. Henrique estou um pouco melhor' },
    { from: 'user', text: 'mas ainda com algumas dores.' }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { from: 'user', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <button className="voltar-btn" onClick={() => router.back()}>← Voltar</button>

      <div className="header">
        <span>Dr. Henrique Dias Gonçalves</span>
        <span className="hora">{time}</span>
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.from === 'system' ? 'system-message' : 'user-message'}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
