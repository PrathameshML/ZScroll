import React, { useRef, useState, useEffect } from 'react'
import './createfood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'  

const CreateFood = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    // clean up preview object URL when component unmounts or file changes
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  function handleVideoChange(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setVideoFile(f)
    const url = URL.createObjectURL(f)
    setPreviewUrl(url)
  }


  function handleSubmit(e) {
    e.preventDefault()
    // For now just log data; replace with API upload call when ready
    const payload = new FormData()
    if (videoFile) payload.append('video', videoFile)
    payload.append('name', name)
    payload.append('description', description)

    axios.post("http://localhost:3000/api/food",
      payload,

      { withCredentials: true }
    )

    // quick feedback (replace with real upload behavior)
    console.log('Submitting food:', { name, description, videoFile })
    alert('Food submitted successfully!')
    navigate('/');

    // reset form
    setName('')
    setDescription('')
    setVideoFile(null)
    setPreviewUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="fp-page">
      <form className="create-food-card" onSubmit={handleSubmit}>
        <div className="header">
          <div>
            <div className="title">Create Food</div>
            <div className="small">Add a short video, a name and a description</div>
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="video">Video</label>
          <div className="file-input">
            <label className="file-label" htmlFor="video">Choose video</label>
            <div className="file-name">{videoFile ? videoFile.name : 'No file selected'}</div>
          </div>
          <input
            id="video"
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ display: 'none' }}
          />
          {previewUrl ? (
            <div className="video-preview">
              <video controls src={previewUrl} />
            </div>
          ) : (
            <div className="video-preview">
              <div className="small">No preview</div>
            </div>
          )}
          <div className="notice">Tip: MP4/WebM files work best. Keep videos short for faster uploads.</div>
        </div>

        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Food name" />
        </div>

        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
        </div>

        <div className="actions">
          <button type="submit" className="btn">Create</button>
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              setName('')
              setDescription('')
              setVideoFile(null)
              setPreviewUrl('')
              if (fileInputRef.current) fileInputRef.current.value = ''
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateFood