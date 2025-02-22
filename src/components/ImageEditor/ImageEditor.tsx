
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BorderOptions } from "./BorderOptions";
import { BackgroundOptions } from "./BackgroundOptions";
import { Canvas } from "fabric";
import * as fabric from 'fabric';
import { ResizeOptions } from "./ResizeOptions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ImageEditor = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target?.result as string;
      fabric.Image.fromURL(imgData, (img) => {
        canvas.clear();
        
        // Center the image and scale it to fit
        const scaling = Math.min(
          canvas.width! / img.width!,
          canvas.height! / img.height!
        ) * 0.8;
        
        img.scale(scaling);
        img.center();
        canvas.add(img);
        canvas.renderAll();
        
        toast({
          title: "Success!",
          description: "Image uploaded successfully.",
        });
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = dataURL;
    link.click();

    toast({
      title: "Success!",
      description: "Your image has been downloaded.",
    });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span>Image Editor</span>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Edit, resize, and export your images for social media
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <Card className="editor-canvas overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
              <canvas ref={canvasRef} className="max-w-full max-h-full" />
              {!canvas && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon className="w-16 h-16 mb-4" />
                  <p>Upload an image to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="editor-sidebar">
          <CardContent className="space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            
            <ResizeOptions canvas={canvas} />
            <BorderOptions canvas={canvas} />
            <BackgroundOptions canvas={canvas} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageEditor;
