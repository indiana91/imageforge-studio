
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BorderOptions } from "./BorderOptions";
import { BackgroundOptions } from "./BackgroundOptions";
import { Canvas, ICanvas } from "fabric";
import { ResizeOptions } from "./ResizeOptions";

const ImageEditor = () => {
  const [canvas, setCanvas] = useState<ICanvas | null>(null);
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Image Editor</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <Button onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div className="editor-canvas bg-gray-50 rounded-lg overflow-hidden shadow-md">
          <canvas ref={canvasRef} />
        </div>

        <div className="editor-sidebar space-y-6 bg-white p-4 rounded-lg shadow-md">
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
  );
};

export default ImageEditor;
