import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'System Access Key (HF_TOKEN) is not configured in Vercel settings.' }, { status: 500 });
    }

    // Direct routing to the official Hugging Face Serverless LTX-Video Pipeline Engine
    const response = await fetch('https://huggingface.co', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 768,
          height: 432,
          num_frames: 49,
          fps: 24
        }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `AI Processing Node Error: ${errText}` }, { status: response.status });
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    // Encode binary video array stream cleanly to web-ready source layout data
    const base64Video = buffer.toString('base64');
    const dataUrl = `data:video/mp4;base64,${base64Video}`;

    return NextResponse.json({ videoUrl: dataUrl });
  } catch (error) {
    return NextResponse.json({ error: `Internal Engine Error: ${error.message}` }, { status: 500 });
  }
}
