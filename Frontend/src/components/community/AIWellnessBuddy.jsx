import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AIWellnessBuddy = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const messagesEndRef = useRef(null);

  const categories = [
    { id: 'general', name: 'General', icon: 'fa-comment', color: 'emerald' },
    { id: 'nutrition', name: 'Nutrition', icon: 'fa-apple-alt', color: 'green' },
    { id: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', color: 'orange' },
    { id: 'mental', name: 'Mental Health', icon: 'fa-brain', color: 'purple' },
    { id: 'sleep', name: 'Sleep', icon: 'fa-moon', color: 'blue' }
  ];

  const quickQuestions = [
    { category: 'nutrition', question: "What's a healthy pre-workout snack?", icon: '🍎' },
    { category: 'fitness', question: "How often should I exercise per week?", icon: '💪' },
    { category: 'mental', question: "Tips for managing stress?", icon: '🧘‍♀️' },
    { category: 'sleep', question: "How to improve sleep quality?", icon: '😴' },
    { category: 'general', question: "Best morning routine for energy?", icon: '☀️' },
    { category: 'nutrition', question: "How much water should I drink daily?", icon: '💧' }
  ];

  const aiResponses = {
    nutrition: {
      "What's a healthy pre-workout snack?": "Great question! Here are some excellent pre-workout snacks:\n\n🍌 **Banana with almond butter** - Natural sugars + healthy fats\n🥨 **Greek yogurt with berries** - Protein + quick carbs\n🥜 **Small handful of nuts and dates** - Sustained energy\n🍞 **Whole grain toast with honey** - Complex carbs\n\nAim to eat 30-60 minutes before your workout for optimal energy! 💪",
      "How much water should I drink daily?": "Hydration is key to wellness! 💧\n\n**General guideline:** 8-10 glasses (64-80 oz) per day\n\n**Factors that increase needs:**\n• Exercise intensity and duration\n• Hot weather or high altitude\n• Pregnancy or breastfeeding\n• Illness with fever\n\n**Pro tip:** Check your urine color - pale yellow indicates good hydration! If you're very active, add an extra 12-16 oz for every hour of exercise. 🏃‍♀️"
    },
    fitness: {
      "How often should I exercise per week?": "Excellent question! Here's what health experts recommend:\n\n🏃‍♀️ **Cardio:** 150 minutes moderate OR 75 minutes vigorous per week\n💪 **Strength training:** 2-3 days per week, all major muscle groups\n🧘‍♀️ **Flexibility:** Daily stretching or 2-3 yoga sessions\n\n**Beginner tip:** Start with 3 days/week and gradually increase. Listen to your body and include rest days for recovery! Quality over quantity always wins. 🌟"
    },
    mental: {
      "Tips for managing stress?": "Stress management is crucial for overall wellness! 🌱\n\n**Quick techniques:**\n• 4-7-8 breathing: Inhale 4, hold 7, exhale 8\n• 5-minute meditation or mindfulness\n• Progressive muscle relaxation\n• Nature walk or outdoor time\n\n**Long-term strategies:**\n• Regular exercise routine\n• Adequate sleep (7-9 hours)\n• Healthy boundaries\n• Social connections\n• Journaling\n\nRemember: It's okay to seek professional help when needed! 💜"
    },
    sleep: {
      "How to improve sleep quality?": "Quality sleep is foundational to wellness! 😴\n\n**Sleep hygiene tips:**\n🌙 **Consistent schedule** - Same bedtime/wake time daily\n📱 **Screen curfew** - No devices 1 hour before bed\n🌡️ **Cool environment** - 65-68°F ideal temperature\n☕ **Caffeine cutoff** - None after 2 PM\n🛏️ **Comfortable space** - Dark, quiet, comfortable\n\n**Bedtime routine ideas:**\n• Warm bath or shower\n• Reading or gentle stretching\n• Herbal tea (chamomile, passionflower)\n• Meditation or breathing exercises\n\nConsistent habits = better sleep! 💤"
    },
    general: {
      "Best morning routine for energy?": "A great morning routine sets the tone for your entire day! ☀️\n\n**Energy-boosting morning routine:**\n1️⃣ **Hydrate immediately** - 16-20 oz water upon waking\n2️⃣ **Natural light exposure** - 10-15 minutes outside\n3️⃣ **Movement** - Light stretching, yoga, or walk\n4️⃣ **Mindfulness** - 5-10 minutes meditation/gratitude\n5️⃣ **Nutritious breakfast** - Protein + complex carbs\n6️⃣ **Set intentions** - 3 priorities for the day\n\n**Pro tip:** Start with just 2-3 elements and build gradually. Consistency beats perfection! 🌟"
    }
  };

  const dailyTips = [
    {
      category: 'mindfulness',
      tip: "Take 3 deep breaths right now. Notice how you feel before and after. 🌬️",
      icon: '🧘‍♀️'
    },
    {
      category: 'hydration',
      tip: "Your body is about 60% water! Have you had enough to drink today? 💧",
      icon: '💧'
    },
    {
      category: 'movement',
      tip: "Every 30 minutes, stand up and do 10 jumping jacks or stretch for 30 seconds! 🏃‍♀️",
      icon: '💪'
    },
    {
      category: 'nutrition',
      tip: "Add color to your plate! Aim for at least 3 different colored fruits/vegetables today. 🌈",
      icon: '🥗'
    },
    {
      category: 'gratitude',
      tip: "Name 3 things you're grateful for right now. Gratitude rewires your brain for positivity! 💜",
      icon: '🙏'
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Hi ${currentUser?.name?.split(' ')[0] || 'there'}! 👋 I'm your AI Wellness Buddy. I'm here to help you with nutrition, fitness, mental health, and overall wellness questions.\n\nHow can I support your wellness journey today?`,
        timestamp: new Date(),
        category: 'general'
      };
      setMessages([welcomeMessage]);
      
      // Add daily tip after welcome
      setTimeout(() => {
        const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
        const tipMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: `💡 **Daily Wellness Tip:** ${randomTip.tip}`,
          timestamp: new Date(),
          category: 'tip',
          icon: randomTip.icon
        };
        setMessages(prev => [...prev, tipMessage]);
      }, 2000);
    }
  }, [isOpen, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: question,
      timestamp: new Date(),
      category: selectedCategory
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getAIResponse(question, selectedCategory);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date(),
        category: selectedCategory
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      category: selectedCategory
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getAIResponse(inputValue, selectedCategory);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date(),
        category: selectedCategory
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question, category) => {
    // Check for exact matches first
    const categoryResponses = aiResponses[category] || {};
    for (const [key, response] of Object.entries(categoryResponses)) {
      if (question.toLowerCase().includes(key.toLowerCase().slice(0, 10))) {
        return response;
      }
    }
    
    // Fallback responses by category
    const fallbackResponses = {
      nutrition: "That's a great nutrition question! 🥗 While I'd love to give you specific advice, I recommend consulting with a registered dietitian for personalized guidance. In general, focus on whole foods, stay hydrated, and listen to your body's hunger cues!",
      fitness: "Great fitness question! 💪 Remember, the best exercise is the one you'll stick with consistently. Start slowly, listen to your body, and gradually increase intensity. Consider consulting a certified trainer for personalized workout plans!",
      mental: "Thank you for prioritizing your mental health! 🧠 While I can offer general wellness tips, please consider speaking with a licensed mental health professional for personalized support. You're taking a positive step by asking!",
      sleep: "Sleep is so important for overall health! 😴 Try maintaining a consistent sleep schedule, creating a relaxing bedtime routine, and making your bedroom cool and dark. If sleep issues persist, consider consulting a healthcare provider.",
      general: "That's a thoughtful wellness question! 🌟 Remember, small consistent changes often lead to the biggest improvements. Focus on progress, not perfection, and be kind to yourself on this journey!"
    };
    
    return fallbackResponses[category] || fallbackResponses.general;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] sm:h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-sm sm:text-lg"></i>
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold truncate">AI Wellness Buddy</h2>
                <p className="text-xs sm:text-sm opacity-90 hidden sm:block">Your personal wellness assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              title="Close (Esc)"
            >
              <i className="fas fa-times text-sm sm:text-lg"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 sm:w-1/4 bg-gray-50 border-r border-gray-200 p-2 sm:p-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Categories */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Topics</h3>
                <div className="space-y-1 sm:space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? `bg-${category.color}-100 text-${category.color}-700`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`fas ${category.icon} text-xs sm:text-sm`}></i>
                      <span className="text-xs sm:text-sm font-medium truncate">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Questions */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3">Quick Questions</h3>
                <div className="space-y-1 sm:space-y-2">
                  {quickQuestions
                    .filter(q => selectedCategory === 'general' || q.category === selectedCategory)
                    .slice(0, 4)
                    .map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(q.question)}
                      className="w-full text-left p-1 sm:p-2 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="mr-1">{q.icon}</span>
                      <span className="break-words">{q.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-emerald-500 text-white'
                      : message.category === 'tip'
                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-robot text-white text-xs"></i>
                        </div>
                        <span className="text-xs font-medium text-emerald-600">
                          AI Wellness Buddy
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-xs sm:text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-white text-xs"></i>
                      </div>
                      <span className="text-xs font-medium text-emerald-600">
                        AI Wellness Buddy
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-2 sm:p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask about ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}...`}
                  className="flex-1 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: I provide general wellness information. For specific medical advice, please consult healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWellnessBuddy; 