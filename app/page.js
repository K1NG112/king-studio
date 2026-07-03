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
      if (!response.ok) throw new Error(data.error || 'Server processing error.');
      
      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#e5a93c' }}>👑 KING STUDIO v1.0</h1>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>Your Private, Unrestricted Cloud Video Generator Workspace</p>
        
        <div style={{ marginBottom: '20px' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your character-locked script prompt here... (e.g., Cinematic 1080p, 16:9 widescreen...)"
            style={{ width: '100%', height: '120px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '15px', color: '#fff', fontSize: '16px', resize: 'vertical' }}
          />
        </div>

        <button
          onClick={generateVideo}
          disabled={loading}
          style={{ width: '100%', padding: '15px', backgroundColor: loading ? '#555' : '#e5a93c', color: '#000', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: '0.2s' }}
        >
          {loading ? '🎬 PROCESSING ON CLOUD SERVERS...' : '🚀 GENERATE WIDESCREEN CINEMATIC VIDEO'}
        </button>

        {error && <div style={{ color: '#ff4d4d', marginTop: '20px', padding: '15px', backgroundColor: '#2a1a1a', borderRadius: '8px', border: '1px solid #551a1a' }}>⚠️ {error}</div>}

        {videoUrl && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#e5a93c' }}>🎞️ Generated Master Asset</h2>
            <video src={videoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: '8px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
