
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  Download,
  Image as ImageIcon,
  RotateCcw,
  Frame,
  Layers,
  PenTool,
  Settings,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BorderOptions } from "./BorderOptions";
import { BackgroundOptions } from "./BackgroundOptions";
import { Canvas, loadSVGFromURL } from "fabric";
import * as fabric from 'fabric';
import { ResizeOptions } from "./ResizeOptions";

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
      backgroundColor: "#1a1f2c",
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
      fabric.Image.fromURL(imgData, (img: fabric.Image) => {
        canvas.clear();
        
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
      multiplier: 1,
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
    <div className="min-h-screen bg-[#221F26] text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#1A1F2C]/50 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Image Editor</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="bg-transparent border-gray-700 hover:bg-gray-800"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button onClick={handleDownload} className="bg-teal-600 hover:bg-teal-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Tools Sidebar */}
        <div className="w-16 bg-[#1A1F2C] border-r border-gray-800">
          <div className="flex flex-col items-center gap-4 p-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Frame className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Layers className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <PenTool className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#1A1F2C] relative">
          <canvas ref={canvasRef} className="absolute inset-0 m-auto" />
          {!canvas && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p>Upload an image to get started</p>
            </div>
          )}
        </div>

        {/* Control Sidebar */}
        <div className="w-80 bg-[#1A1F2C] border-l border-gray-800 overflow-y-auto">
          <div className="p-6 space-y-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
