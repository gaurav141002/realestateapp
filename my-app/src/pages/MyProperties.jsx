// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyProperties = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get('http://localhost:5000/api/properties/mine', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => setProperties(res.data));
//   }, []);

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     await axios.delete(`http://localhost:5000/api/properties/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setProperties(properties.filter(p => p.id !== id));
//   };

//   return (
//     <div className='p-4'>
//       <h2 className='text-xl mb-4'>My Property Listings</h2>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
//         {properties.map((p) => (
//           <div key={p.id} className='border p-3 rounded'>
//             <img src={p.image} alt='Property' className='w-full h-40 object-cover mb-2' />
//             <h3 className='font-bold'>{p.title}</h3>
//             <p>{p.location}</p>
//             <p>₹{p.price}</p>
//             <button className='mt-2 bg-red-500 text-white px-2 py-1' onClick={() => handleDelete(p.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyProperties;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/api/properties/mine', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProperties(res.data))
      .catch((err) => {
        alert('Error fetching properties');
        console.error(err);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((p) => p.id !== id));
      alert('Property deleted successfully');
    } catch (err) {
      alert('Failed to delete property');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Property Listings</h2>
      <div className="row">
        {properties.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={p.image}
                alt="Property"
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.location}</p>
                <p className="card-text">₹{p.price}</p>
              </div>
              <div className="card-footer d-grid">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {properties.length === 0 && <p>You have no properties listed yet.</p>}
      </div>
    </div>
  );
};

export default MyProperties;
