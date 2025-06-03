import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Link } from 'react-router-dom';

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

  // Quick action suggestions
  const suggestions = [
    { id: 1, text: 'Create a workout plan', icon: 'dumbbell' },
    { id: 2, text: 'Nutrition advice', icon: 'apple-alt' },
    { id: 3, text: 'Track my progress', icon: 'chart-line' },
    { id: 4, text: 'Sleep tips', icon: 'moon' }
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
        content: 'This is a simulated AI response. In the actual implementation, this would be replaced with real AI responses based on your input.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-16 lg:pb-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <button className="lg:hidden">
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
                <span className="hidden sm:inline">Back to Dashboard</span>
              </Link>
              <h2 className="text-xl font-semibold">AI Health Assistant</h2>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)]">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-white">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSendMessage(suggestion.text)}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full whitespace-nowrap hover:bg-emerald-100"
                >
                  <i className={`fas fa-${suggestion.icon}`}></i>
                  <span>{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${message.type === 'user' ? 'bg-emerald-600 text-white' : 'bg-white'} rounded-lg shadow-sm p-4`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-emerald-600"></i>
                      </div>
                      <span className="font-semibold">AI Coach</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                  )}
                  <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                    {message.content}
                  </p>
                  {message.type === 'user' && (
                    <div className="flex justify-end">
                      <span className="text-xs text-emerald-100 mt-1">{message.timestamp}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessage)}
                  placeholder="Ask your AI coach anything..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-emerald-600"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                  <i className="fas fa-microphone"></i>
                </button>
              </div>
              <button
                onClick={() => handleSendMessage(newMessage)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default AIChat;
