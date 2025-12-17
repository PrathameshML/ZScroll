import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const updateVideo = (videoId, updater) => {
    setVideos((prev) => prev.map((v) => (v._id === videoId ? updater(v) : v)));
  };

  const handleLike = async (videoId) => {
    let previous = null;
    updateVideo(videoId, (v) => {
      previous = v;
      const nextLiked = !Boolean(v.liked);
      const nextLikeCount = (v.likeCount ?? 0) + (nextLiked ? 1 : -1);
      return { ...v, liked: nextLiked, likeCount: Math.max(0, nextLikeCount) };
    });

    try {
      await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: videoId },
        { withCredentials: true }
      );
    } catch (err) {
      if (previous) updateVideo(videoId, () => previous);
      console.error("Like error:", err);
    }
  };

  const handleSave = async (videoId) => {
    let previous = null;
    updateVideo(videoId, (v) => {
      previous = v;
      const nextSaved = !Boolean(v.saved);
      const nextSaves = (v.saves ?? 0) + (nextSaved ? 1 : -1);
      return { ...v, saved: nextSaved, saves: Math.max(0, nextSaves) };
    });

    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: videoId },
        { withCredentials: true }
      );
    } catch (err) {
      if (previous) updateVideo(videoId, () => previous);
      console.error("Save error:", err);
    }
  };

  const handleComment = async (videoId) => {
    const text = window.prompt("Write a comment");
    if (!text || !text.trim()) return;

    let previous = null;
    updateVideo(videoId, (v) => {
      previous = v;
      const nextComments = (v.comments ?? 0) + 1;
      return { ...v, comments: nextComments };
    });

    try {
      await axios.post(
        "http://localhost:3000/api/food/comment",
        { foodId: videoId, text },
        { withCredentials: true }
      );
    } catch (err) {
      if (previous) updateVideo(videoId, () => previous);
      console.error("Comment error:", err);
    }
  };

  // 1️⃣ Fetch videos from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  // 2️⃣ Play only the visible video
  useEffect(() => {
    const videoElements = document.querySelectorAll(".reel-video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 } // 60% visible
    );

    videoElements.forEach((video) => observer.observe(video));

    return () => {
      videoElements.forEach((video) => observer.unobserve(video));
    };
  }, [videos]);


  function showProfile(id){
    const partnerId = (id && typeof id === 'object') ? (id._id || id.id) : id;
    if (!partnerId || partnerId === 'null' || partnerId === 'undefined') {
      console.error('Missing/invalid food partner id for profile navigation:', id);
      return;
    }
    navigate(`/food-partner/profile/${partnerId}`)
  }

  return (
    <div className="reels-container">
      <div className="reels-list">
        {videos.map((video) => (
          <section key={video._id} className="reel-item">
            <video
              className="reel-video"
              src={video.video}
              muted
              loop
              playsInline
            />

            {/* Right side action icons (likes, save, comments) */}
            <div className="side-actions">
              <button className="action-btn" aria-label="Like" title="Like" onClick={() => handleLike(video._id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`action-count ${(video.likeCount ?? 0) === 0 ? 'zero' : ''}`}>{video.likeCount ?? 0}</span>
              </button>

              <button className="action-btn" aria-label="Save" title="Save" onClick={() => handleSave(video._id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3h12v18l-6-3-6 3V3z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`action-count ${(video.saves ?? 0) === 0 ? 'zero' : ''}`}>{video.saves ?? 0}</span>
              </button>

              <button className="action-btn" aria-label="Comments" title="Comments" onClick={() => handleComment(video._id)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className={`action-count ${(video.comments ?? 0) === 0 ? 'zero' : ''}`}>{video.comments ?? 0}</span>
              </button>
            </div>

            <div className="reel-overlay">
              <p className="reel-description">{video.name}</p>
              <button className="reel-button" onClick={()=>showProfile(video.foodPartner)}>Visit Store</button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
