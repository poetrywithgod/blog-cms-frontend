import React, { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tech");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle image upload with preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      content,
      tags: tags.split(",").map((t) => t.trim()),
      image,
    };
    console.log("Post Created:", newPost);
    alert("🎉 Post created successfully!");
    setTitle("");
    setCategory("Tech");
    setContent("");
    setTags("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        ✍️ Create a New Post
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          {/* Title */}
          <div className="relative">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 px-2 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder=" "
              required
            />
            <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Title
            </label>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option>Tech</option>
              <option>Lifestyle</option>
              <option>Business</option>
              <option>Health</option>
              <option>Travel</option>
            </select>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer text-gray-500">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto rounded-lg max-h-48 object-cover shadow"
                  />
                ) : (
                  "Click to upload an image"
                )}
              </label>
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="peer w-full border-b-2 border-gray-300 px-2 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none resize-none"
              placeholder=" "
              required
            ></textarea>
            <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Content
            </label>
          </div>

          {/* Tags */}
          <div className="relative">
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="peer w-full border-b-2 border-gray-300 px-2 pt-5 pb-2 text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder=" "
            />
            <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              Tags (comma separated)
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-[1.02]"
          >
            🚀 Publish Post
          </button>
        </form>

        {/* Right Side - Live Preview */}
        <div className="bg-gray-50 shadow-inner rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Live Preview</h3>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow mb-4"
            />
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {title || "Post title will appear here..."}
          </h2>
          <span className="text-sm text-blue-600 font-medium mb-2 inline-block">
            {category}
          </span>
          <p className="text-gray-700 whitespace-pre-line mb-2">
            {content || "Your post content will appear here..."}
          </p>
          {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.split(",").map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
