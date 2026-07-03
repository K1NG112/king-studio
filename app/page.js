'use client';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px', color: '#e5a93c' }}>👑 KING STUDIO v1.0</h1>
        <p style={{ color: '#aaa', marginBottom: '25px' }}>Your Private, Unrestricted Cloud Video Generator Workspace</p>
        
        {/* Real-time Open Source Cloud Engine Embed Layer */}
        <div style={{ width: '100%', height: '800px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e5a93c', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
          <iframe 
            src="https://hf.space" 
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          />
        </div>
      </div>
    </div>
  );
}
