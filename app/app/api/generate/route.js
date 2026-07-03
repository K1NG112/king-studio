import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const token = process.env.HF_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'System Access Key (HF_TOKEN) is missing from Vercel.' }, { status: 500 });
    }

    // Direct background cloud array proxy mapping to the model layer
    const response = await fetch('https://huggingface.co', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 30,
          aspect_ratio: "16:9"
        }
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: `The cloud processing engine is currently warm-loading. Try hitting generate again in a moment! Log: ${errText}` }, { status: response.status });
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const base64Video = buffer.toString('base64');
    const dataUrl = `data:video/mp4;base64,${base64Video}`;

    return NextResponse.json({ videoUrl: dataUrl });
  } catch (error) {
    return NextResponse.json({ error: `Internal Terminal Engine Crash: ${error.message}` }, { status: 500 });
  }
}
