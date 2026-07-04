import os
import gradio as gr
from gradio_client import Client

def generate_movie_scene(prompt):
    if not prompt:
        return None, "⚠️ Please type a valid character prompt string."
        
    try:
        # Pushing direct authentication credentials directly into the workspace node layer
        hf_token = os.environ.get("HF_TOKEN", "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")
        
        # Bypassing the broken free text-inference API pipeline completely
        # Connection path mapping straight to the active corporate worker nodes
        client = Client("Lightricks/LTX-Video", hf_token=hf_token)
        
        # Executing the live text-to-video generation calculation in the cloud
        result = client.predict(
            prompt=prompt,
            negative_prompt="low quality, blurry, worst quality, deformed, bad hands",
            frame_rate=24,
            aspect_ratio="16:9",
            api_name="/generate_video"
        )
        
        video_path = result
        return video_path, "🎉 Master scene asset rendered completely free!"
            
    except Exception as e:
        return None, f"⚠️ Server Engine Node Busy. Try clicking generate again in a moment! Error: {str(e)}"

# Building a premium dark-themed minimalist corporate workspace layout
with gr.Blocks(theme=gr.themes.Monochrome()) as demo:
    gr.Markdown("# 👑 KING STUDIO v1.0")
    gr.Markdown("### Your Private, Unrestricted Cloud Video Generator Workspace (No Watermarks / No Limits)")
    
    with gr.Row():
        with gr.Column():
            prompt_input = gr.Textbox(
                label="Character DNA Script Prompt Box", 
                placeholder="Type your scene descriptions here... (e.g., Cinematic 1080p, 16:9 widescreen...)",
                lines=4
            )
            generate_btn = gr.Button("🚀 GENERATE WIDESCREEN CINEMATIC VIDEO", variant="primary")
        
        with gr.Column():
            video_output = gr.Video(label="Generated Master Movie Asset")
            status_output = gr.Textbox(label="System Status Feedback", interactive=False)
            
    generate_btn.click(fn=generate_movie_scene, inputs=prompt_input, outputs=[video_output, status_output])

demo.launch()
