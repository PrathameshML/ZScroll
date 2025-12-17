import React, { useEffect, useState } from 'react';
import './saved.css';
import axios from 'axios';

const Saved = () => {
  const [items, setItems] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/food/saved/list', { withCredentials: true })
      .then(res => setItems(res.data.items || []))
      .catch(err => console.error('Saved fetch', err))
  },[])

  return (
    <div className="saved-page">
      <div className="saved-content">
        <h2>Saved</h2>
        {items.length === 0 ? (
          <p>No saved items yet. Your saved posts will appear here.</p>
        ) : (
          <div className="saved-grid">
            {items.map(it => (
              <div key={it._id} className="saved-card">
                <video src={it.video} muted loop playsInline className="saved-thumb" />
                <div className="saved-info">
                  <div className="saved-title">{it.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
