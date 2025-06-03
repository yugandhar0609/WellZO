import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, faImage, faVideo, faHashtag, faSmile, faPaperPlane,
  faDumbbell, faAppleAlt, faBrain, faCalendar, faFire, faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../../interceptor/services';

const CreatePost = ({ onClose, onPostCreated }) => {
  const [postType, setPostType] = useState('general');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const postTypes = [
    { value: 'general', label: 'General', icon: faSmile, color: 'text-gray-600' },
    { value: 'fitness', label: 'Fitness', icon: faDumbbell, color: 'text-red-600' },
    { value: 'nutrition', label: 'Nutrition', icon: faAppleAlt, color: 'text-green-600' },
    { value: 'wellness', label: 'Mental Wellness', icon: faBrain, color: 'text-purple-600' },
    { value: 'routine', label: 'Daily Routine', icon: faCalendar, color: 'text-blue-600' },
    { value: 'motivation', label: 'Motivation', icon: faFire, color: 'text-orange-600' },
    { value: 'achievement', label: 'Achievement', icon: faTrophy, color: 'text-yellow-600' }
  ];

  const getMetricFields = (type) => {
    switch (type) {
      case 'fitness':
        return [
          { key: 'exercise_type', label: 'Exercise Type', type: 'text', placeholder: 'e.g., Running, Weightlifting' },
          { key: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '30' },
          { key: 'calories_burned', label: 'Calories Burned', type: 'number', placeholder: '200' },
          { key: 'intensity', label: 'Intensity', type: 'select', options: ['Low', 'Medium', 'High'] }
        ];
      case 'nutrition':
        return [
          { key: 'meal_type', label: 'Meal Type', type: 'select', options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
          { key: 'calories', label: 'Calories', type: 'number', placeholder: '400' },
          { key: 'protein', label: 'Protein (g)', type: 'number', placeholder: '25' },
          { key: 'carbs', label: 'Carbs (g)', type: 'number', placeholder: '30' }
        ];
      case 'wellness':
        return [
          { key: 'mood_rating', label: 'Mood (1-10)', type: 'number', min: 1, max: 10, placeholder: '8' },
          { key: 'stress_level', label: 'Stress Level', type: 'select', options: ['Low', 'Medium', 'High'] },
          { key: 'sleep_hours', label: 'Sleep Hours', type: 'number', placeholder: '8' }
        ];
      case 'routine':
        return [
          { key: 'routine_type', label: 'Routine Type', type: 'select', options: ['Morning', 'Evening', 'Workout', 'Work'] },
          { key: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '60' },
          { key: 'completion_rate', label: 'Completion Rate (%)', type: 'number', min: 0, max: 100, placeholder: '90' }
        ];
      case 'achievement':
        return [
          { key: 'achievement_type', label: 'Achievement Type', type: 'text', placeholder: 'e.g., Weight Loss, PR, Habit' },
          { key: 'milestone', label: 'Milestone', type: 'text', placeholder: 'e.g., 10 lbs lost, 100 push-ups' },
          { key: 'time_period', label: 'Time Period', type: 'text', placeholder: 'e.g., 3 months, 30 days' }
        ];
      default:
        return [];
    }
  };

  const suggestedHashtags = {
    fitness: ['#workout', '#fitness', '#exercise', '#strength', '#cardio', '#gym'],
    nutrition: ['#healthy', '#nutrition', '#meal', '#diet', '#organic', '#protein'],
    wellness: ['#mentalhealth', '#mindfulness', '#meditation', '#selfcare', '#wellness'],
    routine: ['#routine', '#habits', '#productivity', '#morning', '#evening'],
    motivation: ['#motivation', '#inspiration', '#goals', '#success', '#mindset'],
    achievement: ['#achievement', '#milestone', '#progress', '#success', '#proud'],
    general: ['#community', '#sharing', '#life', '#update', '#thoughts']
  };

  const handleAddHashtag = (tag) => {
    const cleanTag = tag.startsWith('#') ? tag.slice(1) : tag;
    if (cleanTag && !hashtags.includes(cleanTag)) {
      setHashtags([...hashtags, cleanTag]);
    }
    setHashtagInput('');
  };

  const handleHashtagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAddHashtag(hashtagInput);
    }
  };

  const removeHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return (isImage || isVideo) && isValidSize;
    });
    
    setMediaFiles([...mediaFiles, ...validFiles]);
  };

  const removeMediaFile = (indexToRemove) => {
    setMediaFiles(mediaFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleMetricChange = (key, value) => {
    setMetrics({
      ...metrics,
      [key]: value
    });
  };

  const validateForm = () => {
    if (!content.trim()) {
      setError('Please write something to share!');
      return false;
    }
    if (content.length > 2000) {
      setError('Post content must be less than 2000 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const postData = {
        type: postType,
        content: content.trim(),
        hashtags: hashtags,
        metrics: Object.keys(metrics).length > 0 ? metrics : null,
        mediaFiles: mediaFiles
      };

      const result = await createPost(postData);
      
      if (result.success) {
        onPostCreated(result.data);
        onClose();
      } else {
        setError(result.message || 'Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPostType = postTypes.find(type => type.value === postType);
  const metricFields = getMetricFields(postType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Post Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Post Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {postTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setPostType(type.value)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      postType === type.value
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <FontAwesomeIcon 
                        icon={type.icon} 
                        className={`text-lg ${postType === type.value ? 'text-emerald-600' : type.color}`}
                      />
                      <span className="text-xs font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Share your ${currentPostType?.label.toLowerCase()} journey with the community...`}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                rows="4"
                maxLength="2000"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{content.length}/2000 characters</span>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Media (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Choose Images or Videos
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    Max file size: 50MB. Supported: JPG, PNG, MP4, MOV
                  </p>
                </div>
              </div>
              
              {mediaFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mediaFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            <FontAwesomeIcon icon={faVideo} className="text-2xl text-gray-400 mb-2" />
                            <p className="text-xs text-gray-500">{file.name}</p>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMediaFile(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTimes} className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Metrics */}
            {metricFields.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {currentPostType?.label} Details (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {metricFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm text-gray-600 mb-1">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={metrics[field.key] || ''}
                          onChange={(e) => handleMetricChange(field.key, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select...</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={metrics[field.key] || ''}
                          onChange={(e) => handleMetricChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hashtags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeHashtag(tag)}
                      className="text-emerald-600 hover:text-emerald-800"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyPress={handleHashtagKeyPress}
                  placeholder="Add hashtag..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddHashtag(hashtagInput)}
                  disabled={!hashtagInput.trim()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FontAwesomeIcon icon={faHashtag} />
                </button>
              </div>
              
              {/* Suggested Hashtags */}
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">Suggested:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedHashtags[postType]?.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddHashtag(tag.slice(1))}
                      disabled={hashtags.includes(tag.slice(1))}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              <FontAwesomeIcon icon={faSmile} className="mr-2" />
              Share your journey with the community
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !content.trim()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 