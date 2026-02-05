from moviepy.editor import ImageClip, concatenate_videoclips, AudioFileClip, TextClip, CompositeVideoClip
import os

def create_video():
    print("Initializing Video Generator...")
    
    # Configuration
    fps = 24
    resolution = (1920, 1080)
    
    # Load Assets (Using the files we just synced)
    # Scene 1: Intro (Using pwa icon if available, else dashboard)
    # Note: Using dashboard as fallback for intro if icon missing
    assets = {
        "shield": "scene_1_shield.png" if os.path.exists("scene_1_shield.png") else "scene_2_dashboard.png",
        "dashboard": "scene_2_dashboard.png",
        "chat": "scene_3_chat.png",
        "safety": "scene_3_5_safety.png", 
        "intercept": "scene_4_intercept.png",
        "evidence": "scene_5_evidence.png" # Assuming this maps to one of the mocked files or re-use safety
    }
    
    # Fallback for missing evidence file (use safety as proxy if needed)
    if not os.path.exists(assets["evidence"]):
        assets["evidence"] = assets["safety"]

    input_files = [assets[k] for k in assets]
    print(f"Checking assets: {input_files}")
    
    # Define Clips with Durations (Total 60s)
    # Scene 1: The Shield (0-10s)
    clip1 = ImageClip(assets["shield"]).set_duration(10)
    
    # Scene 2: The Watchtower (10-25s)
    clip2 = ImageClip(assets["dashboard"]).set_duration(15)
    
    # Scene 3: The Intercept (25-40s)
    clip3 = ImageClip(assets["chat"]).set_duration(15)
    
    # Scene 4: Safety (40-45s)
    clip4 = ImageClip(assets["safety"]).set_duration(5)
    
    # Scene 5: Intel (45-50s)
    clip5 = ImageClip(assets["intercept"]).set_duration(5)
    
    # Scene 6: Conclusion (50-60s)
    clip6 = ImageClip(assets["evidence"]).set_duration(10)
    
    # Combine
    print("Concatenating clips...")
    final_clip = concatenate_videoclips([clip1, clip2, clip3, clip4, clip5, clip6], method="compose")
    
    # Resize to 1080p to force consistency
    final_clip = final_clip.resize(resolution)
    
    # Write File
    output_mesh = "demo_draft.mp4"
    print(f"Rendering to {output_mesh}...")
    final_clip.write_videofile(output_mesh, fps=fps)
    print("Done!")

if __name__ == "__main__":
    create_video()
