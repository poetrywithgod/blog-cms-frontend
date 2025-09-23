import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiThumbsUp,
  FiThumbsDown,
  FiMessageCircle,
  FiUser,
} from "react-icons/fi";

// Hero Images
const heroImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
];

// Trending post dummy images
const trendingPostImages = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
];

// Dummy engagement data
const initialEngagementData = [
  { likes: 142, dislikes: 8, comments: 23, userReaction: null },
  { likes: 89, dislikes: 3, comments: 15, userReaction: null },
  { likes: 256, dislikes: 12, comments: 42, userReaction: null },
  { likes: 78, dislikes: 5, comments: 18, userReaction: null },
  { likes: 321, dislikes: 15, comments: 56, userReaction: null },
  { likes: 204, dislikes: 9, comments: 31, userReaction: null },
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

  // Like handler
  const handleLike = (index) => {
    if (!isLoggedIn) return alert("Login to like posts");
    setEngagement((prev) => {
      const data = [...prev];
      const post = data[index];
      if (post.userReaction === "like") {
        post.likes--;
        post.userReaction = null;
      } else {
        if (post.userReaction === "dislike") post.dislikes--;
        post.likes++;
        post.userReaction = "like";
      }
      return data;
    });
  };

  // Dislike handler
  const handleDislike = (index) => {
    if (!isLoggedIn) return alert("Login to dislike posts");
    setEngagement((prev) => {
      const data = [...prev];
      const post = data[index];
      if (post.userReaction === "dislike") {
        post.dislikes--;
        post.userReaction = null;
      } else {
        if (post.userReaction === "like") post.likes--;
        post.dislikes++;
        post.userReaction = "dislike";
      }
      return data;
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Share Your <span className="text-yellow-400">Stories</span> with the
            World
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Publish, manage, and discover blogs that inspire millions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
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

      {/* Trending Posts */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 text-center">
          🚀 Trending Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingPostImages.map((img, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group relative hover:-translate-y-1"
            >
              <Link to={`/posts/${idx + 1}`}>
                <div className="overflow-hidden">
                  <img
                    src={img}
                    alt={`Trending Post ${idx + 1}`}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-700 filter group-hover:brightness-75"
                  />
                </div>
              </Link>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {[
                    "Understanding React Hooks",
                    "JavaScript Best Practices",
                    "CSS Grid Mastery",
                    "Web Development Trends 2025",
                    "Node.js Performance Tips",
                    "Responsive Design Patterns",
                  ][idx]}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {[
                    "Learn how to effectively use React Hooks in your applications.",
                    "Discover the best practices for writing clean JavaScript code.",
                    "Master CSS Grid layout for modern web design.",
                    "Explore the latest trends shaping web development in 2025.",
                    "Optimize your Node.js applications for better performance.",
                    "Implement responsive design patterns across devices.",
                  ][idx]}
                </p>

                {/* Engagement */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(idx)}
                      className={`flex items-center ${
                        engagement[idx].userReaction === "like"
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <FiThumbsUp className="mr-1" />
                      <span>{engagement[idx].likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(idx)}
                      className={`flex items-center ${
                        engagement[idx].userReaction === "dislike"
                          ? "text-red-600"
                          : "text-gray-600 hover:text-red-600"
                      }`}
                    >
                      <FiThumbsDown className="mr-1" />
                      <span>{engagement[idx].dislikes}</span>
                    </button>
                    <div className="flex items-center text-gray-600">
                      <FiMessageCircle className="mr-1" />
                      <span>{engagement[idx].comments}</span>
                    </div>
                  </div>
                  <Link
                    to={`/posts/${idx + 1}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:underline text-sm"
                  >
                    Read More <FiArrowRight className="ml-1" />
                  </Link>
                </div>
                {!isLoggedIn && (
                  <div className="mt-3 p-2 bg-gray-100 rounded-lg text-xs text-gray-600 flex items-center">
                    <FiUser className="mr-2" /> Login to engage with this post
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-gray-100">
            Subscribe to our newsletter for the latest posts and updates.
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
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Blog CMS. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
