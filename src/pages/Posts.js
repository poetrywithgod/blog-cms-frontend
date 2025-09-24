// src/pages/Posts.js
import React, { useState, useEffect } from "react";
import { 
  FiThumbsUp, 
  FiThumbsDown, 
  FiMessageCircle, 
  FiSearch, 
  FiBookmark,
  FiShare2,
  FiX,
  FiArrowLeft,
  FiCornerUpLeft,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiHeart,
  FiPlus,
  FiTag
} from "react-icons/fi";

// Color palette
const colors = {
  primary: { 50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
  secondary: { 50: '#fdf4ff', 100: '#fae8ff', 500: '#d946ef', 600: '#c026d3' },
  success: { 50: '#f0fdf4', 100: '#dcfce7', 500: '#22c55e', 600: '#16a34a' },
  warning: { 50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b', 600: '#d97706' },
  gray: { 
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 
    400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 
    800: '#1f2937', 900: '#111827' 
  }
};

// Extended dummy posts with full content
const dummyPosts = [
  // ... (same as before)
];

function Posts() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(dummyPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [comments, setComments] = useState({});
  const [activeReply, setActiveReply] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [userEngagement, setUserEngagement] = useState({});
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    image: '',
    currentTag: ''
  });

  // Load data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedPosts");
    if (savedBookmarks) setBookmarkedPosts(JSON.parse(savedBookmarks));

    const savedComments = localStorage.getItem("postComments");
    if (savedComments) setComments(JSON.parse(savedComments));

    const savedEngagement = localStorage.getItem("userEngagement");
    if (savedEngagement) setUserEngagement(JSON.parse(savedEngagement));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  useEffect(() => {
    localStorage.setItem("postComments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("userEngagement", JSON.stringify(userEngagement));
  }, [userEngagement]);

  // Fixed: Recursive comment count
  const getTotalComments = (postId) => {
    if (!comments[postId]) return 0;
    
    const countReplies = (commentList) => {
      return commentList.reduce((total, comment) => {
        return total + 1 + countReplies(comment.replies);
      }, 0);
    };
    
    return countReplies(comments[postId]);
  };

  // Fixed: Like/Dislike with toggle
  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    
    setPosts(posts.map(post => {
      if (post.id === id) {
        const currentEngagement = userEngagement[id];
        let newLikes = post.likes;
        let newDislikes = post.dislikes;
        
        if (currentEngagement === 'liked') {
          newLikes = Math.max(0, post.likes - 1);
        } else {
          newLikes = post.likes + 1;
          if (currentEngagement === 'disliked') {
            newDislikes = Math.max(0, post.dislikes - 1);
          }
        }
        
        return { ...post, likes: newLikes, dislikes: newDislikes };
      }
      return post;
    }));
    
    setUserEngagement(prev => ({
      ...prev,
      [id]: userEngagement[id] === 'liked' ? null : 'liked'
    }));
  };

  const handleDislike = (id, e) => {
    if (e) e.stopPropagation();
    
    setPosts(posts.map(post => {
      if (post.id === id) {
        const currentEngagement = userEngagement[id];
        let newLikes = post.likes;
        let newDislikes = post.dislikes;
        
        if (currentEngagement === 'disliked') {
          newDislikes = Math.max(0, post.dislikes - 1);
        } else {
          newDislikes = post.dislikes + 1;
          if (currentEngagement === 'liked') {
            newLikes = Math.max(0, post.likes - 1);
          }
        }
        
        return { ...post, likes: newLikes, dislikes: newDislikes };
      }
      return post;
    }));
    
    setUserEngagement(prev => ({
      ...prev,
      [id]: userEngagement[id] === 'disliked' ? null : 'disliked'
    }));
  };

  const handleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarkedPosts(prev => 
      prev.includes(id) ? prev.filter(postId => postId !== id) : [...prev, id]
    );
  };

  // Modal handlers
  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setActiveReply(null);
    setEditingComment(null);
    document.body.style.overflow = 'unset';
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewPost({ title: '', excerpt: '', content: '', tags: [], image: '', currentTag: '' });
    document.body.style.overflow = 'unset';
  };

  // Create post logic
  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.excerpt.trim() || !newPost.content.trim()) return;

    const post = {
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: `<p>${newPost.content.replace(/\n/g, '</p><p>')}</p>`,
      image: newPost.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      author: "Current User",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      dislikes: 0,
      tags: newPost.tags,
      readTime: Math.ceil(newPost.content.split(' ').length / 200)
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', excerpt: '', content: '', tags: [], image: '', currentTag: '' });
    closeCreateModal();
  };

  const addTag = () => {
    if (newPost.currentTag.trim() && !newPost.tags.includes(newPost.currentTag.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Comments logic (fixed recursive functions)
  const addComment = (postId, text, parentId = null) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now(),
      text: text.trim(),
      author: "Current User",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      replies: [],
      isEdited: false
    };

    setComments(prev => {
      const postComments = prev[postId] || [];
      
      if (parentId) {
        const addReplyToComment = (comments) => {
          return comments.map(comment => {
            if (comment.id === parentId) {
              return { ...comment, replies: [...comment.replies, newComment] };
            }
            return {
              ...comment,
              replies: addReplyToComment(comment.replies)
            };
          });
        };
        
        return { ...prev, [postId]: addReplyToComment(postComments) };
      } else {
        return { ...prev, [postId]: [...postComments, newComment] };
      }
    });

    setActiveReply(null);
  };

  const editComment = (postId, commentId, newText) => {
    if (!newText.trim()) return;

    const updateCommentText = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, text: newText.trim(), isEdited: true };
        }
        return {
          ...comment,
          replies: updateCommentText(comment.replies)
        };
      });
    };

    setComments(prev => ({
      ...prev,
      [postId]: updateCommentText(prev[postId] || [])
    }));

    setEditingComment(null);
  };

  // Fixed: Proper recursive deletion
  const deleteComment = (postId, commentId) => {
    const removeComment = (commentList) => {
      return commentList.filter(comment => comment.id !== commentId)
        .map(comment => ({
          ...comment,
          replies: removeComment(comment.replies)
        }));
    };

    setComments(prev => ({
      ...prev,
      [postId]: removeComment(prev[postId] || [])
    }));
  };

  const likeComment = (postId, commentId) => {
    const updateCommentLikes = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return {
          ...comment,
          replies: updateCommentLikes(comment.replies)
        };
      });
    };

    setComments(prev => ({
      ...prev,
      [postId]: updateCommentLikes(prev[postId] || [])
    }));
  };

  // Filter posts
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredByBookmark = activeFilter === 'bookmarked' 
    ? filteredPosts.filter(post => bookmarkedPosts.includes(post.id))
    : filteredPosts;

  // Comment Components (same as before)
  const CommentItem = ({ comment, postId, depth = 0 }) => {
    const [showOptions, setShowOptions] = useState(false);
    const isReplying = activeReply?.postId === postId && activeReply?.commentId === comment.id;
    const isEditing = editingComment?.postId === postId && editingComment?.commentId === comment.id;

    return (
      <div className={`${depth > 0 ? 'ml-6 pl-4 border-l-2' : ''} ${depth === 0 ? 'border-l-2 border-l-transparent' : ''}`} 
           style={{ borderLeftColor: depth > 0 ? colors.gray[200] : 'transparent' }}>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={comment.authorAvatar} 
                alt={comment.author}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{comment.date}</span>
                  {comment.isEdited && (
                    <span className="text-gray-400 text-xs">(edited)</span>
                  )}
                </div>
                
                {isEditing ? (
                  <textarea
                    defaultValue={comment.text}
                    className="w-full mt-2 p-2 border border-gray-300 rounded text-sm"
                    rows={3}
                    autoFocus
                    onBlur={(e) => editComment(postId, comment.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.ctrlKey) {
                        editComment(postId, comment.id, e.target.value);
                      }
                    }}
                  />
                ) : (
                  <p className="text-gray-700 mt-1 text-sm">{comment.text}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowOptions(!showOptions)}
                className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                aria-label="Comment options"
              >
                <FiMoreVertical size={14} />
              </button>
              
              {showOptions && (
                <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button 
                    onClick={() => {
                      setEditingComment({ postId, commentId: comment.id, text: comment.text });
                      setShowOptions(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <FiEdit size={14} />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => {
                      deleteComment(postId, comment.id);
                      setShowOptions(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full text-left"
                  >
                    <FiTrash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-3">
            <button 
              onClick={() => likeComment(postId, comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 text-sm"
            >
              <FiHeart size={14} />
              <span>{comment.likes || 0}</span>
            </button>
            
            <button 
              onClick={() => setActiveReply(isReplying ? null : { postId, commentId: comment.id })}
              className="flex items-center space-x-1 text-gray-500 hover:text-secondary-600 text-sm"
            >
              <FiCornerUpLeft size={14} />
              <span>Reply</span>
            </button>
          </div>

          {isReplying && (
            <CommentForm 
              postId={postId} 
              parentId={comment.id}
              onCancel={() => setActiveReply(null)}
              onSubmit={(text) => addComment(postId, text, comment.id)}
              placeholder={`Replying to ${comment.author}...`}
            />
          )}

          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  postId={postId} 
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const CommentForm = ({ postId, parentId = null, onCancel, onSubmit, placeholder = "Write a comment..." }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!text.trim()) return;
      onSubmit?.(text);
      setText("");
    };

    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex space-x-3">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
            alt="Your avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder={placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-500 resize-none"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-600 text-sm hover:text-gray-800 rounded-lg border border-gray-300"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-secondary-500 text-white text-sm hover:bg-secondary-600 rounded-lg disabled:opacity-50"
                disabled={!text.trim()}
              >
                {parentId ? 'Reply' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const CommentList = ({ commentsArr, postId }) => (
    <div className="space-y-4">
      {commentsArr.map(comment => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );

  // Create Post Modal Component
  const CreatePostModal = () => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b z-10 flex justify-between items-center p-6">
          <h3 className="text-xl font-semibold text-gray-900">Create New Post</h3>
          <button 
            onClick={closeCreateModal}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                placeholder="Enter post title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500 resize-none"
                rows={2}
                placeholder="Brief description of your post..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500 resize-none"
                rows={6}
                placeholder="Write your post content here..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newPost.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-800 text-sm rounded-full">
                    #{tag}
                    <button 
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-secondary-600"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <FiX size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newPost.currentTag}
                  onChange={(e) => setNewPost(prev => ({ ...prev, currentTag: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  placeholder="Add a tag and press Enter..."
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
                >
                  <FiTag className="mr-2" />
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
              <input
                type="url"
                value={newPost.image}
                onChange={(e) => setNewPost(prev => ({ ...prev, image: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={closeCreateModal}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePost}
              disabled={!newPost.title.trim() || !newPost.excerpt.trim() || !newPost.content.trim()}
              className="px-6 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center" 
            style={{ color: colors.gray[800] }}>
          📰 Latest Posts
        </h2>
        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors shadow-lg"
        >
          <FiPlus />
          <span>Create Post</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts by title, excerpt, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
            style={{ backgroundColor: colors.gray[50] }}
          />
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'all' 
                ? 'bg-secondary-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Posts
          </button>
          <button 
            className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
              activeFilter === 'bookmarked' 
                ? 'bg-warning-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('bookmarked')}
          >
            <FiBookmark className="mr-1" /> Saved
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredByBookmark.map((post) => (
          <div
            key={post.id}
            onClick={() => openPostModal(post)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={(e) => handleBookmark(post.id, e)}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                    bookmarkedPosts.includes(post.id) 
                      ? 'bg-warning-100 text-warning-600' 
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                  aria-label={bookmarkedPosts.includes(post.id) ? "Remove bookmark" : "Bookmark post"}
                >
                  <FiBookmark className={bookmarkedPosts.includes(post.id) ? "fill-current" : ""} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-secondary-500/90 text-white text-xs rounded-full backdrop-blur-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-secondary-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center transition-colors ${
                      userEngagement[post.id] === 'liked' 
                        ? 'text-success-600' 
                        : 'text-gray-600 hover:text-success-600'
                    }`}
                  >
                    <FiThumbsUp className="mr-1" /> {post.likes}
                  </button>
                  <button 
                    onClick={(e) => handleDislike(post.id, e)}
                    className={`flex items-center transition-colors ${
                      userEngagement[post.id] === 'disliked' 
                        ? 'text-warning-600' 
                        : 'text-gray-600 hover:text-warning-600'
                    }`}
                  >
                    <FiThumbsDown className="mr-1" /> {post.dislikes}
                  </button>
                  <span className="flex items-center text-gray-600">
                    <FiMessageCircle className="mr-1" /> {getTotalComments(post.id)}
                  </span>
                </div>
                <div className="text-secondary-600 font-medium hover:underline">
                  Read More
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredByBookmark.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">
              {activeFilter === 'bookmarked' 
                ? "You haven't saved any posts yet." 
                : `No posts found for "${query}"`}
            </p>
            {activeFilter === 'bookmarked' && (
              <p className="text-gray-400 mt-2">Click the bookmark icon on any post to save it here.</p>
            )}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b z-10 flex justify-between items-center p-6">
              <button 
                onClick={closePostModal}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="mr-2" /> Back to posts
              </button>
              <button 
                onClick={closePostModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <article>
              <div className="relative h-64 md:h-96">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-secondary-500/90 text-white text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
                  <div className="flex items-center">
                    <img src={selectedPost.authorAvatar} alt={selectedPost.author} className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="font-medium">{selectedPost.author}</div>
                      <div className="text-sm opacity-90">{selectedPost.date} • {selectedPost.readTime} min read</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>
                
                <div className="border-t mt-8 pt-8 flex flex-wrap justify-between items-center">
                  <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    <button 
                      onClick={(e) => handleLike(selectedPost.id, e)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        userEngagement[selectedPost.id] === 'liked' 
                          ? 'bg-success-50 text-success-600' 
                          : 'hover:bg-success-50 text-gray-600 hover:text-success-600'
                      }`}
                    >
                      <FiThumbsUp />
                      <span>{selectedPost.likes}</span>
                    </button>
                    <button 
                      onClick={(e) => handleDislike(selectedPost.id, e)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        userEngagement[selectedPost.id] === 'disliked' 
                          ? 'bg-warning-50 text-warning-600' 
                          : 'hover:bg-warning-50 text-gray-600 hover:text-warning-600'
                      }`}
                    >
                      <FiThumbsDown />
                      <span>{selectedPost.dislikes}</span>
                    </button>
                    <span className="flex items-center space-x-2 px-4 py-2 text-gray-600">
                      <FiMessageCircle />
                      <span>{getTotalComments(selectedPost.id)} Comments</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={(e) => handleBookmark(selectedPost.id, e)}
                      className={`p-3 rounded-full transition-colors ${
                        bookmarkedPosts.includes(selectedPost.id) 
                          ? 'bg-warning-100 text-warning-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={bookmarkedPosts.includes(selectedPost.id) ? "Remove bookmark" : "Bookmark post"}
                    >
                      <FiBookmark className={bookmarkedPosts.includes(selectedPost.id) ? "fill-current" : ""} />
                    </button>
                    <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                      <FiShare2 />
                    </button>
                  </div>
                </div>
                
                {/* Comments Section */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-6" style={{ color: colors.gray[800] }}>
                    Comments ({getTotalComments(selectedPost.id)})
                  </h3>
                  
                  <CommentForm 
                    postId={selectedPost.id}
                    onSubmit={(text) => addComment(selectedPost.id, text)}
                  />
                  
                  {comments[selectedPost.id] && comments[selectedPost.id].length > 0 ? (
                    <div className="mt-6">
                      <CommentList commentsArr={comments[selectedPost.id]} postId={selectedPost.id} />
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FiMessageCircle className="text-4xl mx-auto mb-3 opacity-50" />
                      <p>No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {isCreateModalOpen && <CreatePostModal />}
    </div>
  );
}

export default Posts;