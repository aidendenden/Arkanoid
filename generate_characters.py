
import os
import requests
import json

# 配置
API_TOKEN = "pst-D9XlP0HNguUtdenvNl8dzVBitCgJlmjHtpT0oY3xHjIqvgIq5TmgyfSWUhJLvvDJ"
IMAGE_DIR = "/workspace/Galgame_Asset/image"
BASE_URL = "https://image.novelai.net"

# 角色提示词定义
characters = [
    # 梧桐树下约
    {
        "name": "林阳",
        "prompt": "1 teenage boy, high school student, gentle and kind face, short black hair, dark eyes, holding a camera, casual school uniform, photography enthusiast, warm expression, detailed anime style, masterpiece, best quality",
        "filename": "lanyang.png"
    },
    {
        "name": "苏晓雪",
        "prompt": "1 teenage girl, high school student, gentle and sweet, long brown hair, soft brown eyes, elegant school uniform, holding a bento box, cooking enthusiast, warm smile, detailed anime style, masterpiece, best quality",
        "filename": "suxiaoxue.png"
    },
    {
        "name": "陈雨萱",
        "prompt": "1 teenage girl, high school student, energetic and lively, short black hair, bright eyes, volleyball uniform, sporty build, confident smile, holding volleyball, detailed anime style, masterpiece, best quality",
        "filename": "chenyuxuan.png"
    },
    {
        "name": "林冰儿",
        "prompt": "1 teenage girl, high school student, cool and mysterious, long black hair, pale skin, sharp eyes, school uniform, holding a book by Haruki Murakami, quiet expression, detailed anime style, masterpiece, best quality",
        "filename": "linbinger.png"
    },
    # 樱之丘学园的恋爱狂想曲
    {
        "name": "佐藤悠太",
        "prompt": "1 teenage boy, high school student, gentle and kind face, short black hair, dark eyes, holding a camera, Japanese school uniform, photography enthusiast, warm expression, detailed anime style, masterpiece, best quality",
        "filename": "sato_yuta.png"
    },
    {
        "name": "宫泽雪乃",
        "prompt": "1 teenage girl, high school student, gentle and sweet, long chestnut hair, soft brown eyes, elegant Japanese school uniform, holding a bento box, cooking enthusiast, warm smile, detailed anime style, masterpiece, best quality",
        "filename": "miyazawa_yukino.png"
    },
    {
        "name": "三浦麻衣",
        "prompt": "1 teenage girl, high school student, energetic and lively, short brown hair, bright eyes, Japanese volleyball uniform, sporty build, confident smile, holding volleyball, detailed anime style, masterpiece, best quality",
        "filename": "miura_mai.png"
    },
    {
        "name": "桐山凛",
        "prompt": "1 teenage girl, high school student, cool and mysterious, long silver hair, pale skin, sharp eyes, Japanese school uniform, holding a book by Haruki Murakami, quiet expression, detailed anime style, masterpiece, best quality",
        "filename": "kiriyama_rin.png"
    }
]

# 创建image文件夹
os.makedirs(IMAGE_DIR, exist_ok=True)

def generate_image(prompt, output_path):
    """调用NovelAI API生成图片"""
    headers = {
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # NovelAI V3 API 格式
    payload = {
        "input": prompt,
        "model": "nai-diffusion-3",
        "action": "generate",
        "parameters": {
            "width": 512,
            "height": 768,
            "scale": 11,
            "sampler": "k_euler_ancestral",
            "steps": 28,
            "n_samples": 1,
            "seed": None,
            "sm": True,
            "sm_dyn": True,
            "noise": 0.1,
            "negative_prompt": "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry"
        }
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/ai/generate-image",
            headers=headers,
            json=payload,
            timeout=60
        )
        
        if response.status_code == 200:
            # 保存图片
            with open(output_path, "wb") as f:
                f.write(response.content)
            print(f"成功生成图片: {output_path}")
            return True
        else:
            print(f"生成图片失败，状态码: {response.status_code}")
            print(f"响应内容: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"生成图片时出错: {e}")
        return False

def main():
    print("开始生成角色图片...")
    
    success_count = 0
    for char in characters:
        output_path = os.path.join(IMAGE_DIR, char["filename"])
        print(f"\n正在生成 {char['name']} 的图片...")
        
        if generate_image(char["prompt"], output_path):
            success_count += 1
    
    print(f"\n完成！共生成 {success_count}/{len(characters)} 张图片")

if __name__ == "__main__":
    main()

