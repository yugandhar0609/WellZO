import React, { useState, useRef, useEffect } from 'react';
import PageLayout from '../../components/layout/PageLayout';

// AI Chat Icon Component
const AIChatIcon = ({ size = 6, animate = true }) => {
  const sizeClasses = {
    4: 'w-4 h-4',
    5: 'w-5 h-5',
    6: 'w-6 h-6',
    8: 'w-8 h-8',
    10: 'w-10 h-10'
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <svg
        className={`w-full h-full ${animate ? 'animate-pulse' : ''}`}
        viewBox="0 0 100 100"
        style={{
          filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))',
        }}
      >
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#chatGradient1)"
          strokeWidth="2"
          strokeDasharray="6,3"
          className={animate ? 'animate-spin' : ''}
          style={{ transformOrigin: '50px 50px', animationDuration: '3s' }}
        />
        
        {/* Inner core */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="url(#chatCoreGradient)"
          className={animate ? 'animate-pulse' : ''}
        />
        
        {/* Chat bubble icon */}
        <g className={animate ? 'animate-pulse' : ''} style={{ animationDuration: '2s' }}>
          <path
            d="M35 35 L65 35 Q70 35 70 40 L70 55 Q70 60 65 60 L45 60 L35 70 L35 60 Q30 60 30 55 L30 40 Q30 35 35 35 Z"
            fill="white"
            stroke="none"
          />
          <circle cx="42" cy="47" r="2" fill="rgba(16, 185, 129, 0.8)" />
          <circle cx="50" cy="47" r="2" fill="rgba(16, 185, 129, 0.8)" />
          <circle cx="58" cy="47" r="2" fill="rgba(16, 185, 129, 0.8)" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="chatGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="chatCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.9)" />
            <stop offset="70%" stopColor="rgba(5, 150, 105, 0.7)" />
            <stop offset="100%" stopColor="rgba(4, 120, 87, 0.5)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI Health Coach. How can I help you today?',
      timestamp: '9:00 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Quick action suggestions - responsive
  const suggestions = [
    { id: 1, text: 'Create a workout plan', shortText: 'Workout', icon: 'dumbbell' },
    { id: 2, text: 'Nutrition advice', shortText: 'Nutrition', icon: 'apple-alt' },
    { id: 3, text: 'Track my progress', shortText: 'Progress', icon: 'chart-line' },
    { id: 4, text: 'Sleep tips', shortText: 'Sleep', icon: 'moon' }
  ];

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'This is a simulated AI response. In the actual implementation, this would be replaced with real AI responses based on your input about health, nutrition, workouts, and wellness.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <PageLayout title="AI Health Assistant">
      <div className="flex flex-col h-[calc(100vh-9rem)] bg-gradient-to-br from-gray-50 to-emerald-50/30 -mt-4">
        {/* Header - Responsive */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4">
            <AIChatIcon size={window.innerWidth < 640 ? 6 : 8} animate={true} />
            <div className="text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">AI Health Assistant</h2>
              <p className="text-xs sm:text-sm text-emerald-600 font-medium">Your personal wellness coach</p>
            </div>
          </div>
        </div>

        {/* Quick Actions - Responsive */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-2 sm:p-3 lg:p-4">
          <div className="flex overflow-x-auto space-x-2 sm:space-x-3 pb-2 scrollbar-hide">
            {suggestions.map(suggestion => (
              <button
                key={suggestion.id}
                onClick={() => handleSendMessage(suggestion.text)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-50 text-emerald-600 rounded-full whitespace-nowrap hover:bg-emerald-100 transition-colors duration-200 text-xs sm:text-sm font-medium shadow-sm"
              >
                <i className={`fas fa-${suggestion.icon} text-xs sm:text-sm`}></i>
                <span className="hidden sm:inline">{suggestion.text}</span>
                <span className="sm:hidden">{suggestion.shortText}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages - Responsive */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-emerald-50/20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-200'
              } rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4`}>
                
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AIChatIcon size={window.innerWidth < 640 ? 4 : 5} animate={false} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">AI Coach</span>
                        <span className="text-xs text-gray-500 ml-2">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <p className={`${
                  message.type === 'user' ? 'text-white' : 'text-gray-800'
                } text-sm sm:text-base leading-relaxed`}>
                  {message.content}
                </p>
                
                {message.type === 'user' && (
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-emerald-100">{message.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator - Responsive */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <AIChatIcon size={window.innerWidth < 640 ? 4 : 5} animate={true} />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">AI Coach</span>
                  <span className="text-xs text-emerald-600">thinking...</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input - Responsive */}
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage(newMessage))}
                placeholder="Ask your AI coach anything about health, nutrition, workouts..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-white/80 backdrop-blur-sm text-sm sm:text-base placeholder-gray-500 shadow-sm"
                rows="1"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button className="text-gray-400 hover:text-emerald-600 transition-colors p-1">
                  <i className="fas fa-microphone text-sm sm:text-base"></i>
                </button>
                <button className="text-gray-400 hover:text-emerald-600 transition-colors p-1">
                  <i className="fas fa-paperclip text-sm sm:text-base"></i>
                </button>
              </div>
            </div>
            <button
              onClick={() => handleSendMessage(newMessage)}
              disabled={!newMessage.trim() || isTyping}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium text-sm sm:text-base shadow-md hover:shadow-lg"
            >
              {isTyping ? (
                <>
                  <AIChatIcon size={4} animate={true} />
                  <span className="hidden sm:inline">Thinking...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane text-sm sm:text-base"></i>
                  <span className="hidden sm:inline">Send</span>
                </>
              )}
            </button>
          </div>
          
          {/* Input Helper Text - Responsive */}
          <div className="flex items-center justify-between mt-2 sm:mt-3 text-xs text-gray-500">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">AI Coach Online</span>
                <span className="sm:hidden">Online</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AIChat;
