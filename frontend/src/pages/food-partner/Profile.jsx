import React, { useEffect, useState } from "react";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
        if (!mounted) return
        const info = res.data?.foodpartnerinfo
        setProfile(info || null)
        setVideos(info?.videos || [])
      } catch {
        if (!mounted) return
        setProfile(null)
        setVideos([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProfile()
    return () => {
      mounted = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="fp-page">
        <section className="profile-card">Loading…</section>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="fp-page">
        <section className="profile-card">Profile not found</section>
      </main>
    );
  }

  return (
    <main className="fp-page">
      <section className="profile-card">
        {/* TOP */}
        <div className="profile-top">
          <div className="avatar" />
          <div className="info">
            <div className="pill">{profile.name}</div>
            <div className="pill muted">{profile.address}</div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">{profile.totalMeals}</div>
          </div>
          <div className="stat">
            <div className="label">customer served</div>
            <div className="value">15K</div>
          </div>
        </div>

        <hr className="divider" />

        {/* VIDEOS */}
        <div className="videos">
          {videos.map((v) => (
            <div className="video-tile" key={v._id}>
              <video
                src={v.video}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                controls={false}
                controlsList="nodownload nofullscreen noplaybackrate"
                disablePictureInPicture
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
