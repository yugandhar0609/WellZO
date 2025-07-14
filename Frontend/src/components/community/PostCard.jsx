import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faCommentDots, faBookmark, faShare, faEllipsisH,
  faFire, faStar, faBolt, faExpand, faEye, faFlag
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { toggleReaction, toggleBookmark, sharePost, getPostComments, createComment } from '../../interceptor/services';

const PostCard = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments_preview || []);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [reactions, setReactions] = useState(post.reactions || { liked: false, loved: false, motivated: false });
  const [counts, setCounts] = useState({
    likes: post.likes_count || 0,
    loves: post.loves_count || 0,
    motivates: post.motivates_count || 0,
    comments: post.comments_count || 0,
    shares: post.shares_count || 0,
    bookmarks: post.bookmarks_count || 0,
    views: post.views_count || 0
  });
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false);

  useEffect(() => {
    setReactions(post.reactions || { liked: false, loved: false, motivated: false });
    setBookmarked(post.bookmarked || false);
    setCounts({
      likes: post.likes_count || 0,
      loves: post.loves_count || 0,
      motivates: post.motivates_count || 0,
      comments: post.comments_count || 0,
      shares: post.shares_count || 0,
      bookmarks: post.bookmarks_count || 0,
      views: post.views_count || 0
    });
  }, [post]);

  const handleReaction = async (reactionType) => {
    const wasActive = reactions[reactionType];
    
    // Optimistic update
    const newReactions = { liked: false, loved: false, motivated: false };
    if (!wasActive) {
      newReactions[reactionType] = true;
    }
    setReactions(newReactions);
    
    // Update counts optimistically
    const newCounts = { ...counts };
    
    // Remove previous reaction count
    if (reactions.liked) newCounts.likes -= 1;
    if (reactions.loved) newCounts.loves -= 1;
    if (reactions.motivated) newCounts.motivates -= 1;
    
    // Add new reaction count
    if (!wasActive) {
      if (reactionType === 'liked') newCounts.likes += 1;
      if (reactionType === 'loved') newCounts.loves += 1;
      if (reactionType === 'motivated') newCounts.motivates += 1;
    }
    
    setCounts(newCounts);

    try {
      const result = await toggleReaction(post.id, reactionType);
      if (!result.success) {
        // Revert on error
        setReactions(post.reactions);
        setCounts({
          likes: post.likes_count,
          loves: post.loves_count,
          motivates: post.motivates_count,
          comments: post.comments_count,
          shares: post.shares_count,
          bookmarks: post.bookmarks_count,
          views: post.views_count
        });
        console.error('Failed to update reaction:', result.message);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      // Revert on error
      setReactions(post.reactions);
      setCounts({
        likes: post.likes_count,
        loves: post.loves_count,
        motivates: post.motivates_count,
        comments: post.comments_count,
        shares: post.shares_count,
        bookmarks: post.bookmarks_count,
        views: post.views_count
      });
    }
  };

  const handleBookmark = async () => {
    const wasBookmarked = bookmarked;
    
    // Optimistic update
    setBookmarked(!wasBookmarked);
    setCounts(prev => ({
      ...prev,
      bookmarks: wasBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1
    }));

    try {
      const result = await toggleBookmark(post.id);
      if (result.success) {
        setBookmarked(result.bookmarked);
      } else {
        // Revert on error
        setBookmarked(wasBookmarked);
        setCounts(prev => ({
          ...prev,
          bookmarks: post.bookmarks_count
        }));
        console.error('Failed to update bookmark:', result.message);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
      // Revert on error
      setBookmarked(wasBookmarked);
      setCounts(prev => ({
        ...prev,
        bookmarks: post.bookmarks_count
      }));
    }
  };

  const handleShare = async () => {
    try {
      const result = await sharePost(post.id);
      if (result.success) {
        setCounts(prev => ({
          ...prev,
          shares: prev.shares + 1
        }));
        // Show success message or copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
      } else {
        console.error('Failed to share post:', result.message);
      }
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const result = await getPostComments(post.id);
      if (result.success) {
        setComments(result.data.results || []);
      } else {
        console.error('Failed to load comments:', result.message);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const result = await createComment(post.id, newComment.trim());
      if (result.success) {
        setComments(prev => [result.data, ...prev]);
        setCounts(prev => ({
          ...prev,
          comments: prev.comments + 1
        }));
        setNewComment('');
      } else {
        console.error('Failed to create comment:', result.message);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const toggleComments = () => {
    if (!showComments && comments.length === 0) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  const getPostTypeColor = (type) => {
    const colors = {
      fitness: 'bg-red-100 text-red-800 border-red-200',
      nutrition: 'bg-green-100 text-green-800 border-green-200',
      wellness: 'bg-purple-100 text-purple-800 border-purple-200',
      routine: 'bg-blue-100 text-blue-800 border-blue-200',
      motivation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      achievement: 'bg-orange-100 text-orange-800 border-orange-200',
      general: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || colors.general;
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header - Responsive */}
      <div className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-3 lg:pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-emerald-100 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {post.user.first_name} {post.user.last_name}
                </h3>
                {post.user.verified && (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                <span className="truncate">@{post.user.username}</span>
                <span className="hidden sm:inline">•</span>
                <span className="truncate">{post.timestamp}</span>
                <span className="hidden sm:inline">•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getPostTypeColor(post.type)}`}>
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faFlag} className="text-xs sm:text-sm" />
            </button>
            <button className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faEllipsisH} className="text-xs sm:text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Responsive */}
      <div className="px-3 sm:px-4 lg:px-6 pb-2 sm:pb-3 lg:pb-4">
        <div className={`text-gray-900 leading-relaxed text-sm sm:text-base break-words ${showExpanded ? '' : 'line-clamp-3'}`}>
          {post.content}
        </div>
        
        {post.content.length > 200 && (
          <button
            onClick={() => setShowExpanded(!showExpanded)}
            className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium mt-2 flex items-center space-x-1"
          >
            <span>{showExpanded ? 'Show less' : 'Read more'}</span>
            <FontAwesomeIcon icon={faExpand} className="text-xs" />
          </button>
        )}

        {/* Media - Responsive */}
        {post.media && post.media.length > 0 && (
          <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-xl overflow-hidden">
            {post.media[0].media_type === 'image' ? (
              <img
                src={post.media[0].file_url}
                alt="Post media"
                className="w-full max-h-64 sm:max-h-80 lg:max-h-96 object-cover"
              />
            ) : (
              <video
                src={post.media[0].file_url}
                controls
                className="w-full max-h-64 sm:max-h-80 lg:max-h-96"
                poster={post.media[0].thumbnail_url}
              />
            )}
          </div>
        )}

        {/* Hashtags - Responsive */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-emerald-600 hover:text-emerald-700 cursor-pointer text-xs sm:text-sm font-medium break-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Metrics - Responsive */}
        {post.metrics && Object.keys(post.metrics.data).length > 0 && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
              {Object.entries(post.metrics.data).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 capitalize truncate">{key.replace('_', ' ')}:</span>
                  <span className="font-medium text-gray-900 ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats - Responsive */}
      <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center space-x-1">
              <FontAwesomeIcon icon={faEye} className="text-xs" />
              <span>{formatCount(counts.views)} views</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {(counts.likes > 0 || counts.loves > 0 || counts.motivates > 0) && (
              <span className="truncate">{formatCount(counts.likes + counts.loves + counts.motivates)} reactions</span>
            )}
            {counts.comments > 0 && (
              <button
                onClick={toggleComments}
                className="hover:text-gray-700 transition-colors truncate"
              >
                {formatCount(counts.comments)} {counts.comments === 1 ? 'comment' : 'comments'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Actions - Responsive */}
      <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 overflow-x-auto">
            {/* Reactions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => handleReaction('liked')}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                  reactions.liked
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-red-600'
                }`}
              >
                <FontAwesomeIcon icon={reactions.liked ? faHeart : faHeartRegular} className="text-xs sm:text-sm" />
                <span className="font-medium">{formatCount(counts.likes)}</span>
              </button>
              
              <button
                onClick={() => handleReaction('loved')}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                  reactions.loved
                    ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-yellow-600'
                }`}
              >
                <FontAwesomeIcon icon={faStar} className="text-xs sm:text-sm" />
                <span className="font-medium">{formatCount(counts.loves)}</span>
              </button>
              
              <button
                onClick={() => handleReaction('motivated')}
                className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                  reactions.motivated
                    ? 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                }`}
              >
                <FontAwesomeIcon icon={faBolt} className="text-xs sm:text-sm" />
                <span className="font-medium">{formatCount(counts.motivates)}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 overflow-x-auto">
            <button
              onClick={toggleComments}
              className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200 text-xs sm:text-sm"
            >
              <FontAwesomeIcon icon={faCommentDots} className="text-xs sm:text-sm" />
              <span className="font-medium hidden sm:inline">Comment</span>
            </button>
            
            <button
              onClick={handleBookmark}
              className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                bookmarked
                  ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
              }`}
            >
              <FontAwesomeIcon icon={bookmarked ? faBookmark : faBookmarkRegular} className="text-xs sm:text-sm" />
              <span className="font-medium hidden sm:inline">Save</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 text-gray-600 hover:bg-gray-50 hover:text-green-600 rounded-lg transition-all duration-200 text-xs sm:text-sm"
            >
              <FontAwesomeIcon icon={faShare} className="text-xs sm:text-sm" />
              <span className="font-medium hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section - Responsive */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="p-3 sm:p-4 lg:p-6 border-b border-gray-100">
            <div className="flex space-x-2 sm:space-x-3">
              <img
                src="https://ui-avatars.com/api/?name=You&background=10b981&color=ffffff"
                alt="Your avatar"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-sm sm:text-base"
                  rows="2"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!newComment.trim() || submittingComment}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
                  >
                    {submittingComment ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto">
            {loadingComments ? (
              <div className="p-4 sm:p-6 text-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-gray-600 mt-2 text-xs sm:text-sm">Loading comments...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="p-4 sm:p-6 text-center text-gray-500 text-xs sm:text-sm">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 lg:p-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-2 sm:space-x-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                            {comment.user.first_name} {comment.user.last_name}
                          </span>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 text-xs sm:text-sm break-words">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-4 mt-2 text-xs text-gray-500">
                        <button className="hover:text-red-600 transition-colors">
                          <FontAwesomeIcon icon={faHeart} className="mr-1" />
                          {comment.likes_count || 0}
                        </button>
                        <button className="hover:text-blue-600 transition-colors">Reply</button>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-2 sm:ml-4 mt-2 sm:mt-3 space-y-2 sm:space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-2 sm:space-x-3">
                              <img
                                src={reply.user.avatar}
                                alt={reply.user.username}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="bg-gray-50 rounded-lg p-2">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900 text-xs truncate">
                                      {reply.user.first_name} {reply.user.last_name}
                                    </span>
                                    <span className="text-xs text-gray-500 flex-shrink-0">
                                      {new Date(reply.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-gray-800 text-xs break-words">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard; 