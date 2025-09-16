import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-yellow-300">Your Blog CMS</span>
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
            Create, manage, and share your stories with the world.  
            Beautiful, fast, and fully responsive blogging made easy.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/posts"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Explore Posts
            </Link>
            <Link
              to="/create-post"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white text-white px-6 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Create a Post
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
          Trending Posts
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/600x400/?technology,blog,${id}`}
                alt="Trending Post"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Blog Post Title {id}
                </h3>
                <p className="text-gray-600 mt-2">
                  A short description about this trending article. Learn, grow,
                  and explore with our blog.
                </p>
                <Link
                  to={`/posts/${id}`}
                  className="inline-flex items-center text-blue-600 mt-4 font-medium hover:underline"
                >
                  Read More <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Technology", "Design", "Business", "Lifestyle"].map((cat) => (
              <div
                key={cat}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
              >
                <span className="text-lg font-semibold text-gray-800">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-gray-100">
            Subscribe to our newsletter for the latest posts, tips, and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full sm:w-auto sm:flex-1 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="mt-4 sm:mt-0 sm:ml-4 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-300 transition"
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
