import { useState } from 'react';

function AddPost() {
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    caption: '',
    like: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Post added successfully!');
      setFormData({ user_name: '', password: '', caption: '', like: '' });
    } else {
      alert('Failed to add post.');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📤 Add New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="user_name"
          placeholder="Username"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="caption"
          placeholder="What's on your mind?"
          value={formData.caption}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="like"
          placeholder="Likes"
          value={formData.like}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Post It
        </button>
      </form>
    </div>
  );
}

export default AddPost;
