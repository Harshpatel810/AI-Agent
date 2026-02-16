/*'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
*/

'use client';

import { useState } from 'react';

type Message = {
  role: 'user' | 'ai';
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    // 1️⃣ Add user message
    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    // 2️⃣ Call API
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();

    // 3️⃣ Add AI message
    const aiMessage: Message = { role: 'ai', text: data.reply };
    setMessages((prev) => [...prev, aiMessage]);

    setInput('');
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === 'user' ? 'User:' : 'AI:'}</strong>
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}

        {loading && <p><strong>AI:</strong> typing...</p>}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
