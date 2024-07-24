import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      navigate('/NoteListEditor', { state: { user } });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleLogin} className='w-full max-w-sm p-8 bg-white rounded shadow-md'>
        <h1 className='mb-4 text-2xl font-bold'>Login</h1>
        <div className='mb-4'>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded input input-bordered'
          />
        </div>
        <div className='mb-4'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded input input-bordered'
          />
        </div>
        <div className='flex items-center justify-between mb-4'>
          <label className='flex items-center'>
            <input type="checkbox" className='mr-2' />
            Remember me
          </label>
          <a href='#' className='text-sm text-blue-500'>Forgot Password?</a>
        </div>
        <button type="submit" className='w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 btn btn-primary'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
