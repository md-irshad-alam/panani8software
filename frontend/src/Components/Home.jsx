import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../constants/api";
import "../styles/Home.css"; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentingId, setCommentingId] = useState(null); // To track which blog is being commented on

  const isLoggedIn = !!sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`${api}/blog/getLatestBlog`)
      .then((response) => {
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);
  console.log(blogs);

  const filterByTag = (tag) => {
    setSelectedTag(tag);
    if (tag === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.tags === tag));
    }
  };

  const handleLike = (id) => {
    const token = sessionStorage.getItem("token");

    axios
      .put(`${api}/blog/like/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Liked successfully", res.data);
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, likes: [...blog.likes, userId] } : blog
          )
        );
      })
      .catch((error) => {
        console.error(
          "Error liking post:",
          error.response?.data || error.message
        );
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${api}/blog/deleteBlog/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        setFilteredBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleUpdate = (id) => {
    const updatedData = {
      title: editTitle,
      content: editContent,
    };

    axios
      .patch(`${api}/blog/updateBlog/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, ...updatedData } : blog
          )
        );
        setFilteredBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, ...updatedData } : blog
          )
        );
        setEditId(null); // close the form
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const handleAddComment = async (blogId) => {
    if (!commentText.trim()) return;

    try {
      const response = await fetch(`${api}/blog/comment/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ comment: commentText }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Comment added successfully");
        setCommentText("");
        setCommentingId(null);
        // Optional: refresh blog data here
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Latest Blog Posts</h1>
      </div>
      <div className="filter-buttons">
        {[
          "all",
          "technology",
          "health",
          "lifestyle",
          "travel",
          "food",
          "others",
        ].map((tag) => (
          <button
            key={tag}
            onClick={() => filterByTag(tag)}
            className={selectedTag === tag ? "active" : ""}
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      <div className="blog-list">
        {filteredBlogs.map((blog) => (
          <div key={blog._id.$oid} className="blog-card">
            <div className="card-header">
              <div className="avatar">{blog.title[0].toUpperCase()}</div>
              <div className="title-info">
                <h2>{blog.title}</h2>
                <span className="tag">#{blog.tags}</span>
              </div>

              {isLoggedIn && (
                <div className="actions">
                  <button
                    onClick={() => {
                      setEditId(blog._id);
                      setEditTitle(blog.title);
                      setEditContent(blog.content);
                    }}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this blog?"
                        )
                      ) {
                        handleDelete(blog._id);
                      }
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            <div className="card-content">
              <p>{blog.content}</p>
              {editId === blog._id && (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Edit content"
                  />
                  <button onClick={() => handleUpdate(blog._id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              )}
            </div>

            <div className="card-footer">
              <button onClick={() => handleLike(blog._id)}>
                👍 {blog.likes.length} Likes
              </button>
              <span
                style={{ cursor: "pointer", marginLeft: "1rem" }}
                onClick={() =>
                  commentingId === blog._id
                    ? setCommentingId(null)
                    : setCommentingId(blog._id)
                }
              >
                💬 {blog.comments.length} Comments
              </span>{" "}
            </div>

            {isLoggedIn && commentingId === blog._id && (
              <div className="comment-box">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="comment-actions">
                  <button onClick={() => handleAddComment(blog._id)}>
                    Post
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setCommentingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
