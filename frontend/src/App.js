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

  const API_URL =
    'https://feedback-collector-fl8l.onrender.com/api/feedback';

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data?.data || res.data || []);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(API_URL, formData);

      setFormData({
        name: '',
        message: '',
        rating: '5',
        date: new Date().toISOString().split('T')[0]
      });

      await fetchFeedbacks();

      alert('Feedback Submitted Successfully!');
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const value = Number(rating) || 0;

    return (
      <span className="stars">
        {'★'.repeat(value)}
        {'☆'.repeat(5 - value)}
      </span>
    );
  };

  return (
    <div className="page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          ⭐ Feedback Collector
        </div>

        <div className="navbar-links">
          <a href="#feedback-form">Give Feedback</a>
          <a href="#all-feedback">All Feedbacks</a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="container">

        {/* Header */}
        <section className="hero">
          <h1>Share Your Feedback</h1>
          <p>
            Your opinion helps us improve our service.
          </p>
        </section>

        {/* Feedback Form */}
        <section className="card" id="feedback-form">
          <h2>📝 Submit Feedback</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Write your feedback here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>

          </form>
        </section>

        {/* Feedback List */}
        <section className="feedback-section" id="all-feedback">
          <div className="section-title">
            <h2>💬 All Feedbacks</h2>
            <span>{feedbacks.length} Responses</span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="empty-state">
              <p>No feedback yet.</p>
            </div>
          ) : (
            feedbacks.map((fb) => (
              <div className="feedback-card" key={fb._id}>

                <div className="feedback-top">
                  <div>
                    <h3>{fb.name}</h3>
                    <div className="rating">
                      {renderStars(fb.rating)}
                    </div>
                  </div>

                  <span className="date">
                    {fb.date}
                  </span>
                </div>

                <p className="message">
                  {fb.message}
                </p>

              </div>
            ))
          )}
        </section>

      </main>

      {/* Footer */}
      <footer>
        <p>© 2026 Feedback Collector | MERN Project</p>
      </footer>

    </div>
  );
}

export default App;

