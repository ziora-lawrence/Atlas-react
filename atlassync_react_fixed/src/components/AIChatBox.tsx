import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const WHATSAPP_NUMBER = '+2347048385205';
const EMAIL = 'atlassync1@gmail.com';
const LOCATION = 'Ibadan, Nigeria';

const botResponses: Record<string, string> = {
  default: "I'm here to help! You can ask me about our services, pricing, or how we can automate your business. Or click the button below to chat with us on WhatsApp for faster responses.",
  services: "We offer AI Receptionists, AI Chatbots, Website Design, and Business Automation. Which service are you most interested in?",
  pricing: "Our pricing varies based on project scope. Websites start from ₦300,000. For a custom quote, please reach out on WhatsApp and we'll discuss your specific needs.",
  website: "We build fast, modern, mobile-first websites that convert. Our websites include responsive design, SEO optimization, and fast loading speeds. Would you like to see our portfolio?",
  chatbot: "Our AI chatbots handle customer inquiries 24/7 on your website or WhatsApp. They can answer FAQs, capture leads, and even book appointments automatically!",
  ai: "Our AI solutions include receptionists that handle calls and chatbots that manage customer conversations. Both work 24/7 without breaks!",
  contact: `You can reach us on WhatsApp at ${WHATSAPP_NUMBER} or email us at ${EMAIL}. We're based in ${LOCATION} and typically reply within a few hours.`,
  hello: "Hello! Welcome to AtlasSync. How can we help automate your business today?",
  hi: "Hi there! Welcome to AtlasSync. How can we help you today?",
  time: "Project timelines vary: standard websites take 5-10 days, while complex projects with AI features may take 2-3 weeks. We'll give you a clear timeline before starting.",
};

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return botResponses.hello;
  }
  if (lowerMessage.includes('service')) {
    return botResponses.services;
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return botResponses.pricing;
  }
  if (lowerMessage.includes('website')) {
    return botResponses.website;
  }
  if (lowerMessage.includes('chatbot')) {
    return botResponses.chatbot;
  }
  if (lowerMessage.includes('ai') || lowerMessage.includes('receptionist')) {
    return botResponses.ai;
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
    return botResponses.contact;
  }
  if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('duration')) {
    return botResponses.time;
  }
  
  return botResponses.default;
}

export function AIChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to AtlasSync! I'm your AI receptionist. How can we automate your business today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open chat"
        >
          <span className="absolute inset-0 rounded-full bg-cyber-cyan animate-ripple" />
          
          <div className="relative w-14 h-14 rounded-full bg-cyber-cyan flex items-center justify-center
                        shadow-neon transition-all duration-300 hover:scale-110 hover:shadow-neon-strong">
            <MessageCircle className="w-6 h-6 text-cyber-darker" />
          </div>
          
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 
                         bg-cyber-card border border-cyber-border rounded-lg text-sm text-cyber-text
                         whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity
                         pointer-events-none">
            Chat with us
          </span>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] 
                     transition-all duration-300 ${
                       isMinimized ? 'h-14' : 'h-[500px] max-h-[80vh]'
                     }`}
        >
          <div className="glass-card border-cyber-border-hover h-full flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-cyber-cyan-dim border-b border-cyber-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cyber-cyan flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyber-darker" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-cyber-text">AtlasSync AI</h4>
                  <p className="text-xs text-cyber-cyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg text-cyber-text-secondary hover:text-cyber-text 
                           hover:bg-cyber-border transition-colors"
                  aria-label={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-cyber-text-secondary hover:text-cyber-text 
                           hover:bg-cyber-border transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.isUser ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isUser
                            ? 'bg-cyber-cyan'
                            : 'bg-cyber-card border border-cyber-border'
                        }`}
                      >
                        {message.isUser ? (
                          <User className="w-4 h-4 text-cyber-darker" />
                        ) : (
                          <Bot className="w-4 h-4 text-cyber-cyan" />
                        )}
                      </div>
                      
                      <div
                        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                          message.isUser
                            ? 'bg-cyber-cyan text-cyber-darker rounded-br-sm'
                            : 'bg-cyber-card border border-cyber-border text-cyber-text rounded-bl-sm'
                        }`}
                      >
                        <p className="leading-relaxed">{message.text}</p>
                        <span
                          className={`text-[10px] mt-1 block ${
                            message.isUser ? 'text-cyber-darker/60' : 'text-cyber-text-muted'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyber-card border border-cyber-border 
                                    flex items-center justify-center">
                        <Bot className="w-4 h-4 text-cyber-cyan" />
                      </div>
                      <div className="px-4 py-3 bg-cyber-card border border-cyber-border rounded-2xl rounded-bl-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-cyber-border bg-cyber-darker/50">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 bg-cyber-card border border-cyber-border rounded-lg
                               text-sm text-cyber-text placeholder:text-cyber-text-muted
                               focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className="px-4 py-2.5 bg-cyber-cyan text-cyber-darker rounded-lg
                               transition-all duration-300 hover:shadow-neon
                               disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 px-4 py-2 
                             bg-cyber-green/10 border border-cyber-green/30 rounded-lg
                             text-xs text-cyber-green hover:bg-cyber-green/20 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Prefer WhatsApp? Chat with us there
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
