import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NutritionAI = () => {
  const [messages, setMessages] = useState([
    {
      type: 'system',
      content: 'Hello! I\'m your Nutrition AI assistant. I can help you with meal planning, nutrition advice, and analyzing food data. You can send me text, images, or other files.',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() && !selectedFiles.length) return;

    const newMessage = {
      type: 'user',
      content: inputText,
      timestamp: new Date(),
      attachments: selectedFiles,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setSelectedFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'assistant',
        content: 'I\'ve analyzed your input. Here\'s my nutrition recommendation...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg hidden lg:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-600">HealthAI Coach</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
            <Link to="/workouts" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-dumbbell"></i>
              <span>Workouts</span>
            </Link>
            <Link to="/meals" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-utensils"></i>
              <span>Meal Plan</span>
            </Link>
            <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <i className="fas fa-users"></i>
              <span>Community</span>
            </Link>
            <div className="pt-4 border-t border-gray-200 mt-4">
              <h4 className="text-xs font-semibold text-gray-500 mb-2 px-3">AI ASSISTANTS</h4>
              <Link to="/nutrition-agent" className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 text-emerald-600">
                <i className="fas fa-apple-alt"></i>
                <span>Nutrition Agent</span>
              </Link>
              <Link to="/fitness-agent" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <i className="fas fa-running"></i>
                <span>Fitness Agent</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 lg:mr-80 min-h-screen pb-16 lg:pb-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <button className="lg:hidden">
                <i className="fas fa-bars text-gray-600"></i>
              </button>
              <h2 className="text-xl font-semibold">Nutrition AI Assistant</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100"
              >
                <img
                  src="https://via.placeholder.com/50"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Chat Interface */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : message.type === 'system'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-white shadow-md text-gray-800'
                  }`}
                >
                  {message.type !== 'user' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <i className={`fas ${message.type === 'system' ? 'fa-robot' : 'fa-apple-alt'} text-emerald-600 text-xs`}></i>
                      </div>
                      <span className="font-semibold text-sm">
                        {message.type === 'system' ? 'System' : 'Nutrition AI'}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  {message.attachments?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((file, fileIndex) => (
                        <div key={fileIndex} className="flex items-center space-x-2 text-sm">
                          <i className="fas fa-paperclip"></i>
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-md rounded-lg p-4 max-w-[80%] sm:max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t">
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center bg-white rounded-lg px-3 py-1 text-sm">
                    <span className="truncate max-w-[150px]">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full border rounded-lg px-4 py-2 pr-12 resize-none focus:outline-none focus:border-emerald-600"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '120px' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                ></textarea>
                <button
                  onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                  className="absolute right-2 bottom-2 text-gray-400 hover:text-emerald-600"
                >
                  <i className="fas fa-paperclip"></i>
                </button>
                {isAttachmentMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          fileInputRef.current.click();
                          setIsAttachmentMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                      >
                        <i className="fas fa-image text-emerald-600"></i>
                        <span>Image</span>
                      </button>
                      <button
                        onClick={() => {
                          fileInputRef.current.click();
                          setIsAttachmentMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                      >
                        <i className="fas fa-file-excel text-emerald-600"></i>
                        <span>Excel</span>
                      </button>
                      <button
                        onClick={() => {
                          fileInputRef.current.click();
                          setIsAttachmentMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                      >
                        <i className="fas fa-microphone text-emerald-600"></i>
                        <span>Audio</span>
                      </button>
                      <button
                        onClick={() => {
                          fileInputRef.current.click();
                          setIsAttachmentMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full text-left"
                      >
                        <i className="fas fa-video text-emerald-600"></i>
                        <span>Video</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-emerald-600 text-white rounded-lg p-2 hover:bg-emerald-700"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
          </div>
        </div>
      </main>

      {/* Right Sidebar - Context Panel */}
      <aside className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg hidden lg:block overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutrition Context</h3>
          
          {/* User's Nutrition Profile */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">YOUR PROFILE</h4>
            <div className="space-y-2">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Daily Calorie Goal</div>
                <div className="text-lg font-semibold text-emerald-600">2,200 kcal</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Macros Split</div>
                <div className="flex justify-between mt-1">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Protein</div>
                    <div className="font-semibold text-emerald-600">30%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Carbs</div>
                    <div className="font-semibold text-emerald-600">50%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Fats</div>
                    <div className="font-semibold text-emerald-600">20%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 mb-3">DIETARY PREFERENCES</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                Vegetarian
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                Low Carb
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                High Protein
              </span>
            </div>
          </div>

          {/* Recent Analysis */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-3">RECENT ANALYSIS</h4>
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-pie text-emerald-600"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Nutrient Analysis</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-camera text-emerald-600"></i>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Meal Photo Analysis</div>
                    <div className="text-xs text-gray-500">5 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg lg:hidden z-50">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-home text-lg mb-1"></i>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/workouts" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-dumbbell text-lg mb-1"></i>
            <span className="text-xs">Workouts</span>
          </Link>
          <Link to="/meals" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-utensils text-lg mb-1"></i>
            <span className="text-xs">Meals</span>
          </Link>
          <Link to="/progress" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-chart-line text-lg mb-1"></i>
            <span className="text-xs">Progress</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center justify-center text-gray-600 hover:text-emerald-600">
            <i className="fas fa-users text-lg mb-1"></i>
            <span className="text-xs">Community</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Profile Menu */}
      {showProfileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-gray-500">Premium Member</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileMenu(false)}
                  className="text-gray-500"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              {/* Mobile Profile Settings */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">NUTRITION CONTEXT</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium">Daily Calorie Goal</div>
                      <div className="text-lg font-semibold text-emerald-600">2,200 kcal</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm font-medium">Macros Split</div>
                      <div className="flex justify-between mt-1">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Protein</div>
                          <div className="font-semibold text-emerald-600">30%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Carbs</div>
                          <div className="font-semibold text-emerald-600">50%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Fats</div>
                          <div className="font-semibold text-emerald-600">20%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">DIETARY PREFERENCES</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                      Vegetarian
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                      Low Carb
                    </span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm">
                      High Protein
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionAI; 