'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

type Chat = {
  nickname: string;
  content: string;
};

export default function ChatWrapper() {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='h-full p-3 bg-ourLightGray rounded-xl flex flex-col justify-between'>
      <div className='h-44 flex flex-col overflow-y-scroll scrollbar-hide'>
        {messages.map((m, idx) => (
          <div key={idx} className='p-1 flex gap-3'>
            <div className='text-center w-2/12'>{m.nickname}</div>
            <div className='pl-2 w-10/12 appearance-none rounded leading-tight focus:outline-none'>{m.content}</div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <div className='p-2 flex gap-3'>
        <label className='text-center w-2/12'>닉네임닉</label>
        <input
          className='px-2 w-10/12 appearance-none rounded leading-tight focus:outline-none'
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setNewMessage('');
              setMessages([...messages, { nickname: '닉네임', content: newMessage }]);
            }
          }}
        />
      </div>
    </div>
  );
}