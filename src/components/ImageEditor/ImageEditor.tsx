
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BorderOptions } from "./BorderOptions";
import { BackgroundOptions } from "./BackgroundOptions";

const ImageEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderColor, setBorderColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!image) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + borderWidth * 2;
      canvas.height = img.height + borderWidth * 2;
      
      if (ctx) {
        // Draw background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw border
        ctx.fillStyle = borderColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw image
        ctx.drawImage(
          img,
          borderWidth,
          borderWidth,
          img.width,
          img.height
        );
        
        // Create download link
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        toast({
          title: "Success!",
          description: "Your image has been downloaded.",
        });
      }
    };
    
    img.src = image;
  };

  return (
    <div className="image-editor-container">
      <div className="editor-header">
        <h1 className="text-2xl font-bold">Image Editor</h1>
        <Button onClick={handleDownload} disabled={!image}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <div className="editor-toolbar">
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <div className="editor-main">
        <div className="editor-canvas">
          {image ? (
            <div
              style={{
                padding: borderWidth,
                backgroundColor: borderColor,
                background: backgroundColor,
              }}
            >
              <img
                src={image}
                alt="Edited"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p>Upload an image to get started</p>
            </div>
          )}
        </div>

        <div className="editor-sidebar">
          <BorderOptions
            borderWidth={borderWidth}
            borderColor={borderColor}
            onWidthChange={setBorderWidth}
            onColorChange={setBorderColor}
          />
          <BackgroundOptions
            backgroundColor={backgroundColor}
            onColorChange={setBackgroundColor}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
