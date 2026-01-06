import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getBotanicalAdvice } from '../services/gemini';

export const BotanicalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bienvenue chez Espace Naturaē. Je suis votre guide botanique. Comment puis-je vous aider à prendre soin de votre peau aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await getBotanicalAdvice(messages, input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 h-full flex flex-col">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-light serif text-eucalyptus mb-2">Conseil Botanique</h2>
        <p className="text-gray-500 font-light font-sans">Laissez notre IA experte vous guider vers le soin idéal pour votre rituel.</p>
      </div>

      <div className="flex-1 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-eucalyptus text-white' 
                  : 'bg-ivory border border-gray-100 text-gray-800'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-ivory border border-gray-100 px-4 py-3 rounded-2xl animate-pulse text-gray-400 text-xs tracking-widest italic font-sans font-bold">
                Réflexion botanique...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ex: J'ai la peau sèche, que me conseillez-vous ?"
              className="flex-1 bg-white border border-gray-200 px-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-eucalyptus transition-all font-sans"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-eucalyptus text-white p-3 rounded-full hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};