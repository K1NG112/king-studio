'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateVideo = async () => {
    if (!prompt) return;
    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The model server processing node failed.');
      
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        throw new Error('No video data stream was returned from the cloud provider.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0c0c0c', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#e5a93c', letterSpacing: '1px' }}>👑 KING STUDIO v1.0</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Your Private, Direct Cloud Video Generator Terminal</p>
        
        <div style={{ marginBottom: '25px' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your character-locked script prompt here... (e.g., Cinematic 1080p, 16:9 widescreen...)"
            style={{ width: '100%', height: '140px', backgroundColor: '#141414', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '18px', color: '#fff', fontSize: '16px', resize: 'vertical', outline: 'none', transition: '0.3s' }}
          />
        </div>

        <button
          onClick={generateVideo}
          disabled={loading}
          style={{ width: '100%', padding: '16px', backgroundColor: loading ? '#333' : '#e5a93c', color: '#000', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', transition: '0.2s', boxShadow: '0 4px 15px rgba(229, 169, 60, 0.2)' }}
        >
          {loading ? '🎬 PROCESSING ON INDUSTRIAL CLOUD ENGINE...' : '🚀 GENERATE WIDESCREEN CINEMATIC VIDEO'}
        </button>

        {error && <div style={{ color: '#ff4d4d', marginTop: '25px', padding: '15px', backgroundColor: '#1a0d0d', borderRadius: '10px', border: '1px solid #4a1a1a', fontSize: '15px' }}>⚠️ {error}</div>}

        {videoUrl && (
          <div style={{ marginTop: '45px' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#e5a93c' }}>🎞️ Generated Master Asset (No Watermarks)</h2>
            <video src={videoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: '12px', border: '1px solid #222', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
