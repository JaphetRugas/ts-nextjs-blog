"use client"
import { useState } from 'react';

export default function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement logic to submit new post data
    const postData = { title, content };
    console.log(postData);
    // Reset form fields
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Create a New Post</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 font-medium mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-300 font-medium mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
    </form>
  );
}
