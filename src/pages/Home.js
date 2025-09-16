import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiThumbsUp, FiThumbsDown, FiMessageCircle, FiUser } from "react-icons/fi";

// Direct image URLs from Unsplash
const heroImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800&q=80",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800&q=80"
];

// Direct image URLs for trending posts
const trendingPostImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
];

// Sample engagement data for each post
const initialEngagementData = [
  { 
    likes: 142, 
    dislikes: 8, 
    comments: 23,
    userReaction: null // null, 'like', or 'dislike'
  },
  { 
    likes: 89, 
    dislikes: 3, 
    comments: 15,
    userReaction: null
  },
  { 
    likes: 256, 
    dislikes: 12, 
    comments: 42,
    userReaction: null
  },
  { 
    likes: 78, 
    dislikes: 5, 
    comments: 18,
    userReaction: null
  },
  { 
    likes: 321, 
    dislikes: 15, 
    comments: 56,
    userReaction: null
  },
  { 
    likes: 204, 
    dislikes: 9, 
    comments: 31,
    userReaction: null
  }
];

function Home({ isLoggedIn }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [engagement, setEngagement] = useState(initialEngagementData);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle likes
  const handleLike = (index) => {
    if (!isLoggedIn) {
      alert("Please log in to like posts");
      return;
    }
    
    setEngagement(prev => {
      const newEngagement = [...prev];
      const currentReaction = newEngagement[index].userReaction;
      
      if (currentReaction === 'like') {
        // If already liked, remove the like
        newEngagement[index] = {
          ...newEngagement[index],
          likes: newEngagement[index].likes - 1,
          userReaction: null
        };
      } else if (currentReaction === 'dislike') {
        // If disliked, switch to like
        newEngagement[index] = {
          ...newEngagement[index],
          likes: newEngagement[index].likes + 1,
          dislikes: newEngagement[index].dislikes - 1,
          userReaction: 'like'
        };
      } else {
        // If no reaction, add like
        newEngagement[index] = {
          ...newEngagement[index],
          likes: newEngagement[index].likes + 1,
          userReaction: 'like'
        };
      }
      
      return newEngagement;
    });
  };

  // Function to handle dislikes
  const handleDislike = (index) => {
    if (!isLoggedIn) {
      alert("Please log in to dislike posts");
      return;
    }
    
    setEngagement(prev => {
      const newEngagement = [...prev];
      const currentReaction = newEngagement[index].userReaction;
      
      if (currentReaction === 'dislike') {
        // If already disliked, remove the dislike
        newEngagement[index] = {
          ...newEngagement[index],
          dislikes: newEngagement[index].dislikes - 1,
          userReaction: null
        };
      } else if (currentReaction === 'like') {
        // If liked, switch to dislike
        newEngagement[index] = {
          ...newEngagement[index],
          likes: newEngagement[index].likes - 1,
          dislikes: newEngagement[index].dislikes + 1,
          userReaction: 'dislike'
        };
      } else {
        // If no reaction, add dislike
        newEngagement[index] = {
          ...newEngagement[index],
          dislikes: newEngagement[index].dislikes + 1,
          userReaction: 'dislike'
        };
      }
      
      return newEngagement;
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Slideshow */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Share Your <span className="text-yellow-400">Stories</span> with the World
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            A modern platform to publish, manage, and discover blogs that inspire.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/posts"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Explore Posts
            </Link>
            {isLoggedIn ? (
              <Link
                to="/create-post"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
              >
                Create a Post
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
              >
                Login to Contribute
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
          Trending Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingPostImages.map((img, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              <div className="overflow-hidden">
                <img
                  src={img}
                  alt={`Trending Post ${index + 1}`}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-700 filter group-hover:grayscale group-hover:brightness-75"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {[
                    "Understanding React Hooks",
                    "JavaScript Best Practices",
                    "CSS Grid Mastery",
                    "Web Development Trends 2025",
                    "Node.js Performance Tips",
                    "Responsive Design Patterns"
                  ][index]}
                </h3>
                <p className="text-gray-600 mt-2">
                  {[
                    "Learn how to effectively use React Hooks in your applications.",
                    "Discover the best practices for writing clean JavaScript code.",
                    "Master CSS Grid layout for modern web design.",
                    "Explore the latest trends shaping web development in 2025.",
                    "Optimize your Node.js applications for better performance.",
                    "Implement responsive design patterns that work across all devices."
                  ][index]}
                </p>
                
                {/* Engagement Metrics */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(index)}
                      className={`flex items-center transition-colors ${
                        engagement[index].userReaction === 'like' 
                          ? 'text-blue-600' 
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                      disabled={!isLoggedIn}
                      title={isLoggedIn ? "Like this post" : "Login to like"}
                    >
                      <FiThumbsUp className="mr-1" />
                      <span className="text-sm font-medium">{engagement[index].likes}</span>
                    </button>
                    <button 
                      onClick={() => handleDislike(index)}
                      className={`flex items-center transition-colors ${
                        engagement[index].userReaction === 'dislike' 
                          ? 'text-red-600' 
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                      disabled={!isLoggedIn}
                      title={isLoggedIn ? "Dislike this post" : "Login to dislike"}
                    >
                      <FiThumbsDown className="mr-1" />
                      <span className="text-sm font-medium">{engagement[index].dislikes}</span>
                    </button>
                    <div className="flex items-center text-gray-600">
                      <FiMessageCircle className="mr-1" />
                      <span className="text-sm font-medium">{engagement[index].comments}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/posts/${index + 1}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:underline text-sm"
                  >
                    Read More <FiArrowRight className="ml-1" />
                  </Link>
                </div>
                
                {/* Login prompt for engagement */}
                {!isLoggedIn && (
                  <div className="mt-3 p-2 bg-gray-100 rounded-lg text-xs text-gray-600 flex items-center">
                    <FiUser className="mr-2" />
                    <span>Login to engage with this post</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-gray-100">
            Subscribe to our newsletter for the latest posts, tips, and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full sm:flex-1 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Blog CMS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;