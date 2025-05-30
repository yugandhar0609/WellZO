import React, { useState } from 'react';

const PostCard = ({ post, onInteraction }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);

  const handleReaction = (reactionType) => {
    onInteraction(post.id, 'reaction', reactionType);
    setShowReactions(false);
  };

  const handleComment = () => {
    setShowComments(!showComments);
    if (!showComments) {
      onInteraction(post.id, 'comment');
    }
  };

  const handleShare = () => {
    onInteraction(post.id, 'share');
  };

  const handleBookmark = () => {
    onInteraction(post.id, 'bookmark');
  };

  const handleReport = (reason) => {
    onInteraction(post.id, 'report', reason);
    setShowReportMenu(false);
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'achievement': return 'fa-trophy';
      case 'fitness': return 'fa-dumbbell';
      case 'nutrition': return 'fa-apple-alt';
      case 'wellness': return 'fa-spa';
      case 'routine': return 'fa-clock';
      case 'motivation': return 'fa-fire';
      default: return 'fa-heart';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      case 'fitness': return 'bg-orange-100 text-orange-600';
      case 'nutrition': return 'bg-green-100 text-green-600';
      case 'wellness': return 'bg-purple-100 text-purple-600';
      case 'routine': return 'bg-blue-100 text-blue-600';
      case 'motivation': return 'bg-red-100 text-red-600';
      default: return 'bg-emerald-100 text-emerald-600';
    }
  };

  const reactions = [
    { type: 'liked', icon: 'fa-heart', color: 'text-red-500', bgColor: 'bg-red-100', label: 'Like', count: post.likes },
    { type: 'loved', icon: 'fa-star', color: 'text-yellow-500', bgColor: 'bg-yellow-100', label: 'Love', count: post.loves },
    { type: 'motivated', icon: 'fa-bolt', color: 'text-blue-500', bgColor: 'bg-blue-100', label: 'Motivate', count: post.motivates }
  ];

  const totalReactions = post.likes + post.loves + post.motivates;
  const activeReactions = reactions.filter(r => post.reactions[r.type]);

  const truncatedContent = post.content.length > 200 
    ? post.content.substring(0, 200) + '...' 
    : post.content;

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.reaction-menu') && !event.target.closest('.reaction-button')) {
        setShowReactions(false);
      }
      if (!event.target.closest('.report-menu') && !event.target.closest('.report-button')) {
        setShowReportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 relative">
      {/* Post Header */}
      <div className="p-4 sm:p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-200"
              />
              {post.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{post.user.name}</h3>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{post.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{post.user.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Post Type Badge */}
            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
              <i className={`fas ${getPostTypeIcon(post.type)} mr-1`}></i>
              <span className="hidden sm:inline">{post.type.charAt(0).toUpperCase() + post.type.slice(1)}</span>
            </div>
            
            {/* More Options */}
            <div className="relative">
              <button
                onClick={() => setShowReportMenu(!showReportMenu)}
                className="report-button p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-ellipsis-h"></i>
              </button>
              
              {showReportMenu && (
                <div className="report-menu absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 min-w-[160px]">
                  <button
                    onClick={() => handleBookmark()}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <i className={`fas fa-bookmark ${post.bookmarked ? 'text-emerald-600' : ''}`}></i>
                    <span>{post.bookmarked ? 'Remove Bookmark' : 'Bookmark'}</span>
                  </button>
                  <button
                    onClick={() => handleReport('inappropriate')}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <i className="fas fa-flag"></i>
                    <span>Report</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
            {showFullContent ? post.content : truncatedContent}
          </p>
          {post.content.length > 200 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-emerald-600 text-sm font-medium mt-2 hover:text-emerald-700"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Post Media */}
        {post.media && post.media.length > 0 && (
          <div className="mb-4 rounded-xl overflow-hidden relative">
            {post.media[0].type === 'video' ? (
              <video
                src={post.media[0].url}
                className="w-full max-h-80 object-cover"
                controls
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EVideo%3C/text%3E%3C/svg%3E"
              />
            ) : (
              <img
                src={post.media[0].url || post.images?.[0]}
                alt="Post content"
                className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            )}
            {post.media.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                +{post.media.length - 1} more
              </div>
            )}
          </div>
        )}

        {/* Metrics Card */}
        {post.metrics && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 sm:p-4 mb-4">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {Object.entries(post.metrics).map(([key, value], index) => (
                <div key={index} className="text-center">
                  <div className="text-sm sm:text-lg font-bold text-emerald-700">{value}</div>
                  <div className="text-xs text-emerald-600 capitalize">{key.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 5).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 5 && (
              <span className="text-gray-400 text-xs sm:text-sm">
                +{post.tags.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Interaction Bar */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-50">
        {/* Reaction Summary */}
        {totalReactions > 0 && (
          <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              {activeReactions.map(reaction => (
                <span key={reaction.type} className={`w-5 h-5 rounded-full ${reaction.bgColor} flex items-center justify-center`}>
                  <i className={`fas ${reaction.icon} ${reaction.color} text-xs`}></i>
                </span>
              ))}
              <span className="ml-2">{totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}</span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              {post.comments > 0 && <span>{post.comments} comments</span>}
              {post.shares > 0 && <span>{post.shares} shares</span>}
              {post.views > 0 && <span>{post.views} views</span>}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-4">
            {/* Reaction Button */}
            <div className="relative">
              <button
                onClick={() => setShowReactions(!showReactions)}
                className={`reaction-button flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                  activeReactions.length > 0
                    ? 'text-emerald-600 bg-emerald-50' 
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <i className="fas fa-heart text-sm sm:text-base"></i>
                <span className="font-medium text-xs sm:text-sm">{totalReactions || 'React'}</span>
              </button>

              {/* Reaction Popup */}
              {showReactions && (
                <div className="reaction-menu absolute bottom-12 left-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex space-x-2 z-20">
                  {reactions.map((reaction) => (
                    <button
                      key={reaction.type}
                      onClick={() => handleReaction(reaction.type)}
                      className={`p-2 rounded-lg transition-all hover:scale-110 ${
                        post.reactions[reaction.type] 
                          ? `${reaction.bgColor} ${reaction.color}` 
                          : 'hover:bg-gray-100 text-gray-400'
                      }`}
                      title={reaction.label}
                    >
                      <i className={`fas ${reaction.icon} text-lg`}></i>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Comment Button */}
            <button
              onClick={handleComment}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <i className="far fa-comment text-sm sm:text-base"></i>
              <span className="font-medium text-xs sm:text-sm">{post.comments || 'Comment'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <i className="far fa-share text-sm sm:text-base"></i>
              <span className="font-medium text-xs sm:text-sm hidden sm:inline">{post.shares || 'Share'}</span>
            </button>
          </div>

          {/* Bookmark Button */}
          <button 
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${
              post.bookmarked 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <i className={`${post.bookmarked ? 'fas' : 'far'} fa-bookmark text-sm sm:text-base`}></i>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-50">
          <div className="mt-4 space-y-3">
            {/* Mock Comments */}
            <div className="flex space-x-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                alt="Commenter"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="font-medium text-sm text-gray-900">Lisa Park</div>
                  <div className="text-sm text-gray-700">Amazing progress! Keep it up! 💪</div>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-gray-500">2 hours ago</span>
                  <button className="text-xs text-gray-500 hover:text-emerald-600">Reply</button>
                  <button className="text-xs text-gray-500 hover:text-red-600">
                    <i className="far fa-heart mr-1"></i>12
                  </button>
                </div>
              </div>
            </div>

            {/* Add Comment */}
            <div className="flex space-x-3 mt-4">
              <img
                src={post.user.avatar || 'https://via.placeholder.com/32'}
                alt="You"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-50 border-0 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
                  />
                  <button className="text-emerald-600 hover:text-emerald-700 px-3 py-2 text-sm font-medium">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard; 