import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, Globe, Brain, Square, Loader2 } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import Markdown from 'react-markdown';

// Initialize Gemini API lazily to prevent crash if key is missing
const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is missing. Please set GEMINI_API_KEY in your environment.');
  }
  return new GoogleGenAI({ apiKey });
};

type Mode = 'general' | 'search' | 'think';

interface Message {
  role: 'user' | 'model';
  text: string;
  groundingUrls?: { title: string; uri: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('general');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Bernard\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string, audioBase64?: string, audioMimeType?: string) => {
    if (!text.trim() && !audioBase64) return;

    const newUserMsg: Message = { role: 'user', text: text || '🎤 Audio Message' };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = getAI();
      let modelName = 'gemini-3-flash-preview';
      let config: any = {
        systemInstruction: "You are an AI assistant on the official portfolio website of Bernard Fiagbenu, a Computer Scientist. Be helpful and professional."
      };

      if (mode === 'think') {
        modelName = 'gemini-3.1-pro-preview';
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      } else if (mode === 'search') {
        config.tools = [{ googleSearch: {} }];
      }

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const currentParts: any[] = [];
      if (text) currentParts.push({ text });
      if (audioBase64 && audioMimeType) {
         currentParts.push({
           inlineData: {
             data: audioBase64,
             mimeType: audioMimeType
           }
         });
         if (!text) {
           currentParts.push({ text: "Please transcribe this audio and respond to it." });
         }
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...history, { role: 'user', parts: currentParts }],
        config
      });

      let responseText = response.text || '';
      let groundingUrls: { title: string; uri: string }[] = [];

      // Extract grounding URLs
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        chunks.forEach((chunk: any) => {
          if (chunk.web?.uri) {
            groundingUrls.push({ title: chunk.web.title || chunk.web.uri, uri: chunk.web.uri });
          }
        });
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText, groundingUrls }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, an error occurred while processing your request.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64data = (reader.result as string).split(',')[1];
            handleSend('', base64data, mediaRecorder.mimeType);
          };
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone.");
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col border border-gray-100 dark:border-gray-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#E6E2FF] dark:bg-indigo-900/40 p-5 text-gray-900 dark:text-white flex justify-between items-center border-b border-indigo-100/50 dark:border-indigo-800/50">
            <div>
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <Brain size={20} className="text-indigo-600 dark:text-indigo-400" />
                AI Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs font-medium mt-0.5">Powered by Gemini</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50 p-1.5 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Mode Selector */}
          <div className="bg-gray-50/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800 p-3 flex gap-2 overflow-x-auto scrollbar-hide">
            <button onClick={() => setMode('general')} className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${mode === 'general' ? 'bg-[#E6E2FF] dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-100 shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <MessageSquare size={14} /> General
            </button>
            <button onClick={() => setMode('search')} className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${mode === 'search' ? 'bg-[#D6EFFF] dark:bg-blue-900/60 text-blue-900 dark:text-blue-100 shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <Globe size={14} /> Search
            </button>
            <button onClick={() => setMode('think')} className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${mode === 'think' ? 'bg-[#D6FFEB] dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100 shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <Brain size={14} /> Deep Think
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-3xl px-5 py-3.5 ${msg.role === 'user' ? 'bg-gray-900 dark:bg-indigo-600 text-white rounded-br-sm shadow-md shadow-gray-900/10 dark:shadow-indigo-900/20' : 'bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-sm'}`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 dark:prose-pre:bg-gray-950 prose-pre:text-gray-100">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                  {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-700/60 flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Sources:</span>
                      {msg.groundingUrls.map((url, i) => (
                        <a key={i} href={url.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline truncate block font-medium">
                          {url.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl rounded-bl-sm px-5 py-3.5 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm font-medium">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-end gap-2 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-1.5 focus-within:border-gray-400 dark:focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-400 dark:focus-within:ring-gray-500 transition-all shadow-sm">
              <button 
                onClick={toggleRecording}
                className={`p-2.5 rounded-full flex-shrink-0 transition-colors ${isRecording ? 'bg-[#FFE2EC] dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 animate-pulse' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                title={isRecording ? "Stop recording" : "Record audio"}
              >
                {isRecording ? <Square size={18} /> : <Mic size={18} />}
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder={isRecording ? "Recording..." : "Type a message..."}
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 font-medium"
                rows={1}
                disabled={isRecording}
              />
              <button 
                onClick={() => handleSend(input)}
                disabled={(!input.trim() && !isRecording) || isLoading}
                className="p-2.5 rounded-full bg-gray-900 dark:bg-indigo-600 text-white flex-shrink-0 hover:bg-gray-800 dark:hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-0.5 mr-0.5 shadow-md"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all hover:shadow-gray-900/20 flex items-center justify-center group shine"
        >
          <MessageSquare size={24} className="group-hover:animate-pulse" />
        </button>
      )}
    </div>
  );
}
