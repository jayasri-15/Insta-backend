// import { useEffect, useState } from 'react';

// function Home() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/posts/')
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data.results); // DRF pagination support
//       })
//       .catch((error) => {
//         console.error("Error fetching posts:", error);
//       });
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">📸 InstaZone Posts</h1>
//       {posts.length === 0 ? (
//         <p className="text-gray-600">No posts found.</p>
//       ) : (
//         <ul>
//           {posts.map((post) => (
//             <li key={post.id} className="mb-4 border p-4 rounded-lg shadow-sm bg-white">
//               <h2 className="text-xl font-semibold">@{post.user_name}</h2>
//               <p className="text-gray-700">{post.caption}</p>
//               <p className="text-red-500 font-medium">❤️ {post.like}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Home;
// import { useState, useEffect } from 'react';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [formData, setFormData] = useState({
//     user_name: '',
//     password: '',
//     caption: '',
//     like: ''
//   });

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/posts/')
//       .then((res) => res.json())
//       .then((data) => setPosts(data.results || []))
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch('http://127.0.0.1:8000/posts/', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(formData)
//     })
//       .then((res) => res.json())
//       .then((newPost) => {
//         setPosts([...posts, newPost]);
//         setFormData({ user_name: '', password: '', caption: '', like: '' });
//       })
//       .catch((error) => console.error("Error adding post:", error));
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">📸 InstaZone Posts</h1>

//       {/* Form to Add Post */}
//       <form onSubmit={handleSubmit} className="mb-6 space-y-3">
//         <input name="user_name" value={formData.user_name} onChange={handleChange} placeholder="Username" className="border p-2 w-full" required />
//         <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full" required />
//         <input name="caption" value={formData.caption} onChange={handleChange} placeholder="Caption" className="border p-2 w-full" required />
//         <input name="like" value={formData.like} onChange={handleChange} placeholder="Likes" type="number" className="border p-2 w-full" required />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
//       </form>

//       {/* Display Posts */}
//       {posts.length === 0 ? (
//         <p className="text-gray-600">No posts found.</p>
//       ) : (
//         <ul>
//           {posts.map((post) => (
//             <li key={post.id} className="mb-4 border p-4 rounded-lg shadow-sm bg-white">
//               <h2 className="text-xl font-semibold">@{post.user_name}</h2>
//               <p>{post.caption}</p>
//               <p>❤️ {post.like}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Home;
import { useState, useEffect } from 'react';

function Home() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    caption: '',
    like: ''
  });

  const [editingPost, setEditingPost] = useState(null); // post currently being edited

  // Load posts on mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/posts/')
      .then((res) => res.json())
      .then((data) => setPosts(data.results || []))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new post
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((newPost) => {
        setPosts([...posts, newPost]);
        setFormData({ user_name: '', password: '', caption: '', like: '' });
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  // Start editing a post
  const startEditing = (post) => {
    setEditingPost(post.id);
    setFormData({
      user_name: post.user_name,
      password: post.password || '',
      caption: post.caption,
      like: post.like
    });
  };

  // Submit updated post
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/posts/${editingPost}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        const updatedList = posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedList);
        setEditingPost(null);
        setFormData({ user_name: '', password: '', caption: '', like: '' });
      })
      .catch((error) => console.error("Error updating post:", error));
  };
  const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this post?")) {
    fetch(`http://127.0.0.1:8000/posts/${id}/`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 204) {
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          console.error("Failed to delete post");
        }
      })
      .catch((error) => console.error("Error deleting post:", error));
  }
};


  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📸 InstaZone Posts</h1>

      {/* Form to Add or Edit Post */}
      <form onSubmit={editingPost ? handleUpdate : handleSubmit} className="mb-6 space-y-3">
        <input name="user_name" value={formData.user_name} onChange={handleChange} placeholder="Username" className="border p-2 w-full" required />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full" required />
        <input name="caption" value={formData.caption} onChange={handleChange} placeholder="Caption" className="border p-2 w-full" required />
        <input name="like" value={formData.like} onChange={handleChange} placeholder="Likes" type="number" className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingPost ? 'Update Post' : 'Add Post'}
        </button>
      </form>

      {/* Posts List */}
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold">@{post.user_name}</h2>
              <p>{post.caption}</p>
              <p>❤️ {post.like}</p>
              <button
                onClick={() => startEditing(post)}
                className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded ml-2"

              >
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
