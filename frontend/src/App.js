import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ 
    name: '', 
    message: '', 
    rating: '5', 
    date: new Date().toISOString().split('T')[0] 
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/feedback', formData);
      setFormData({ 
        name: '', 
        message: '', 
        rating: '5', 
        date: new Date().toISOString().split('T')[0] 
      });
      fetchFeedbacks();
      alert('Feedback Submitted Successfully!');
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '550px', 
      margin: '40px auto', 
      padding: '30px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px' }}>
        Feedback Collector
      </h2>
      
      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '35px' }}>
        
        {/* Name Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', color: '#34495e', fontSize: '14px' }}>Name:</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={inputStyle}
          />
        </div>
        
        {/* Message Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', color: '#34495e', fontSize: '14px' }}>Message:</label>
          <textarea 
            name="message" 
            placeholder="Write your feedback here..." 
            value={formData.message} 
            onChange={handleChange} 
            required 
            rows="4" 
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* Rating Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', color: '#34495e', fontSize: '14px' }}>Rating:</label>
          <select 
            name="rating" 
            value={formData.rating} 
            onChange={handleChange} 
            style={inputStyle}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        {/* Date Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontWeight: 'bold', color: '#34495e', fontSize: '14px' }}>Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            padding: '12px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            backgroundColor: '#00a8ff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '10px',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {/* Feedbacks List */}
      <h3 style={{ color: '#2c3e50', borderBottom: '2px solid #f1f2f6', paddingBottom: '10px', marginBottom: '20px' }}>
        All Feedbacks
      </h3>
      
      <div>
        {(feedbacks || []).length === 0 ? (
          <p style={{ color: '#7f8c8d', textAlign: 'center' }}>No feedback yet.</p>
        ) : (
          (feedbacks || []).map((fb) => (
            <div 
              key={fb._id} 
              style={{ 
                border: '1px solid #e1e8ed', 
                borderRadius: '8px', 
                padding: '15px', 
                marginBottom: '12px',
                backgroundColor: '#fafafa'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, color: '#2c3e50', fontSize: '16px' }}>{fb.name}</h4>
                <span style={{ fontSize: '12px', color: '#95a5a6', backgroundColor: '#eef2f7', padding: '3px 8px', borderRadius: '4px' }}>
                  {fb.date}
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#f1c40f', fontSize: '14px' }}>
                Rating: {'⭐'.repeat(Number(fb.rating) || 5)}
              </p>
              <p style={{ margin: 0, color: '#555', fontSize: '14px', lineHeight: '1.4' }}>{fb.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Reusable Input Style Object
const inputStyle = {
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #cccccc',
  fontSize: '14px',
  outline: 'none',
  backgroundColor: '#f9f9f9',
  boxSizing: 'border-box',
  width: '100%'
};

export default App;