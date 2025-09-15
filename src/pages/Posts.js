import React from "react";
import { Link } from "react-router-dom";

function Posts() {
  // Later this will be replaced with posts fetched from backend
  const dummyPosts = [
    { id: 1, title: "First Post" },
    { id: 2, title: "Second Post" },
  ];

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {dummyPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
