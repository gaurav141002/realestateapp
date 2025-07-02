import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:5000/api/properties/mine', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setProperties(res.data))
      .catch(err => {
        console.error('Error fetching properties:', err);
        alert('Unauthorized - Please login again');
      });
  }, []);

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Welcome</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {properties.map((p) => (
          <div key={p.id} className='border p-3 rounded'>
            <img src={p.image} alt='Property' className='w-full h-40 object-cover mb-2' />
            <h3 className='font-bold'>{p.title}</h3>
            <p>{p.location}</p>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
