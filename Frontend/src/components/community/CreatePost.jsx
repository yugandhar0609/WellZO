import React, { useState, useRef } from 'react';

const CreatePost = ({ onClose, onSubmit, user }) => {
  const [postType, setPostType] = useState('general');
  const [content, setContent] = useState('');
  const [media, setMedia] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({ captions: [], hashtags: [] });
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const fileInputRef = useRef(null);

  const postTypes = [
    { id: 'fitness', name: 'Fitness', icon: 'fa-dumbbell', color: 'orange', desc: 'Workouts, exercises, strength training' },
    { id: 'nutrition', name: 'Meal Tips', icon: 'fa-apple-alt', color: 'green', desc: 'Healthy recipes, meal prep, nutrition advice' },
    { id: 'wellness', name: 'Mental Wellness', icon: 'fa-spa', color: 'purple', desc: 'Meditation, therapy, stress management' },
    { id: 'routine', name: 'Daily Routine', icon: 'fa-clock', color: 'blue', desc: 'Morning routines, productivity, habits' },
    { id: 'motivation', name: 'Motivation', icon: 'fa-fire', color: 'red', desc: 'Inspiration, success stories, mindset' },
    { id: 'achievement', name: 'Achievement', icon: 'fa-trophy', color: 'yellow', desc: 'Personal records, milestones, victories' }
  ];

  const metricFields = {
    fitness: [
      { key: 'exercise', label: 'Exercise Type', placeholder: 'Deadlift, Running, HIIT' },
      { key: 'duration', label: 'Duration', placeholder: '45 minutes' },
      { key: 'intensity', label: 'Intensity/Weight', placeholder: '315 lbs, High intensity' }
    ],
    nutrition: [
      { key: 'meal_type', label: 'Meal Type', placeholder: 'Breakfast, Post-workout' },
      { key: 'calories', label: 'Calories', placeholder: '450 cal' },
      { key: 'prep_time', label: 'Prep Time', placeholder: '15 minutes' }
    ],
    wellness: [
      { key: 'activity', label: 'Activity', placeholder: 'Meditation, Journaling' },
      { key: 'duration', label: 'Duration', placeholder: '20 minutes' },
      { key: 'mood_impact', label: 'Mood Impact', placeholder: 'Stress -40%' }
    ],
    routine: [
      { key: 'time', label: 'Time of Day', placeholder: '6:00 AM' },
      { key: 'duration', label: 'Duration', placeholder: '1 hour' },
      { key: 'consistency', label: 'Streak', placeholder: '30 days' }
    ],
    achievement: [
      { key: 'milestone', label: 'Milestone', placeholder: 'First 5K, 30-day streak' },
      { key: 'improvement', label: 'Improvement', placeholder: '+25% strength' },
      { key: 'timeframe', label: 'Timeframe', placeholder: '3 months' }
    ]
  };

  const suggestedTags = {
    fitness: ['#workout', '#strength', '#cardio', '#fitness', '#personalrecord', '#gym'],
    nutrition: ['#healthyeating', '#mealprep', '#nutrition', '#recipe', '#vegmealplan', '#postworkout'],
    wellness: ['#mentalhealth', '#meditation', '#selfcare', '#mindfulness', '#therapy', '#wellness'],
    routine: ['#morningroutine', '#productivity', '#habits', '#dailyroutine', '#consistency', '#lifestyle'],
    motivation: ['#motivation', '#inspiration', '#mindset', '#goals', '#success', '#positivity'],
    achievement: ['#milestone', '#achievement', '#progress', '#success', '#proud', '#victory']
  };

  // AI Caption Suggestions
  const generateAiSuggestions = async () => {
    setShowAiSuggestions(true);
    
    // Simulate AI API call
    setTimeout(() => {
      const captionSuggestions = {
        fitness: [
          "Just crushed my workout! 💪 Remember, consistency beats perfection every time.",
          "New personal record today! The only competition is with yesterday's version of yourself.",
          "Sweat is just your fat crying 😅 What's your favorite way to stay active?"
        ],
        nutrition: [
          "Fuel your body like the amazing machine it is! 🥗 Here's my latest healthy creation.",
          "Meal prep Sunday complete! Planning ahead is the secret to eating well all week.",
          "Eating the rainbow never tasted so good! 🌈 What's your favorite colorful ingredient?"
        ],
        wellness: [
          "Taking time for my mental health today 🧘‍♀️ Self-care isn't selfish, it's essential.",
          "Progress isn't always visible, but it's always happening. Be patient with yourself.",
          "Your mind is a garden - what are you choosing to water today? 🌱"
        ]
      };

      const hashtagSuggestions = suggestedTags[postType] || [];
      
      setAiSuggestions({
        captions: captionSuggestions[postType] || captionSuggestions.fitness,
        hashtags: hashtagSuggestions
      });
    }, 1500);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mov', 'video/avi'];
    
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a supported format. Please upload images (JPG, PNG, GIF) or videos (MP4, MOV, AVI).`);
        return false;
      }
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert(`${file.name} is too large. Please upload files under 100MB.`);
        return false;
      }
      return true;
    });

    const mediaUrls = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      name: file.name
    }));
    
    setMedia([...media, ...mediaUrls]);
  };

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleMetricChange = (key, value) => {
    setMetrics({ ...metrics, [key]: value });
  };

  const addSuggestedTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags(tags ? `${tags} ${tag}` : tag);
    }
  };

  const useSuggestedCaption = (caption) => {
    setContent(caption);
    setShowAiSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPost = {
      id: Date.now(),
      user: {
        id: user?.id || 1,
        name: user?.name || 'You',
        avatar: user?.profile_picture_url || 'https://via.placeholder.com/100',
        verified: false,
        title: 'Community Member'
      },
      type: postType,
      content,
      media: media.map(m => ({ url: m.url, type: m.type })),
      metrics: Object.keys(metrics).length > 0 ? metrics : null,
      tags: tags.split(' ').filter(tag => tag.startsWith('#')),
      timestamp: 'Just now',
      likes: 0,
      loves: 0,
      motivates: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      reactions: { liked: false, loved: false, motivated: false },
      category: postType,
      views: 0
    };

    setTimeout(() => {
      onSubmit(newPost);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Share Your Journey</h2>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={generateAiSuggestions}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
              >
                <i className="fas fa-brain"></i>
                <span>AI Assist</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="fas fa-times text-gray-500"></i>
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {postTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPostType(type.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    postType === type.id
                      ? `border-${type.color}-500 bg-${type.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <i className={`fas ${type.icon} text-lg ${
                      postType === type.id ? `text-${type.color}-600` : 'text-gray-400'
                    }`}></i>
                    <div className={`font-medium ${
                      postType === type.id ? `text-${type.color}-700` : 'text-gray-600'
                    }`}>
                      {type.name}
                    </div>
                  </div>
                  <p className={`text-xs ${
                    postType === type.id ? `text-${type.color}-600` : 'text-gray-500'
                  }`}>
                    {type.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions Modal */}
          {showAiSuggestions && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-brain text-purple-600"></i>
                <h3 className="font-medium text-purple-700">AI Suggestions</h3>
                <button
                  type="button"
                  onClick={() => setShowAiSuggestions(false)}
                  className="ml-auto text-purple-400 hover:text-purple-600"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">Suggested Captions:</h4>
                  <div className="space-y-2">
                    {aiSuggestions.captions.map((caption, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => useSuggestedCaption(caption)}
                        className="w-full text-left p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 text-sm text-gray-700 transition-colors"
                      >
                        {caption}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">Suggested Hashtags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.hashtags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addSuggestedTag(tag)}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your story
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? Share your wellness journey, tips, or achievements..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add photos or videos
            </label>
            <div className="space-y-4">
              {/* Upload Button */}
              <div className="flex space-x-2">
                <label className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <i className="fas fa-camera text-gray-400 text-2xl mb-2"></i>
                    <p className="text-sm text-gray-500">Photos (JPG, PNG, GIF)</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
                
                <label className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <i className="fas fa-video text-gray-400 text-2xl mb-2"></i>
                    <p className="text-sm text-gray-500">Videos (MP4, MOV)</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleMediaUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Media Preview */}
              {media.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {media.map((item, index) => (
                    <div key={index} className="relative">
                      {item.type === 'video' ? (
                        <video
                          src={item.url}
                          className="w-full h-24 object-cover rounded-lg"
                          controls
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {item.type === 'video' ? 'VIDEO' : 'PHOTO'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          {metricFields[postType] && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Add metrics (optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metricFields[postType].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs text-gray-500 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={metrics[field.key] || ''}
                      onChange={(e) => handleMetricChange(field.key, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hashtags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="#fitness #nutrition #wellness"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            
            {/* Suggested Tags */}
            {suggestedTags[postType] && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags[postType].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addSuggestedTag(tag)}
                      className="bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner animate-spin"></i>
                  <span>Sharing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-share"></i>
                  <span>Share Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 