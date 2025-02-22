
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Canvas } from "fabric";
import { useToast } from "@/components/ui/use-toast";

interface ResizeOptionsProps {
  canvas: Canvas | null;
}

export const ResizeOptions = ({ canvas }: ResizeOptionsProps) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const { toast } = useToast();

  const handleResize = () => {
    if (!canvas) return;
    
    const newWidth = parseInt(width);
    const newHeight = parseInt(height);

    if (isNaN(newWidth) || isNaN(newHeight)) {
      toast({
        title: "Error",
        description: "Please enter valid dimensions",
        variant: "destructive",
      });
      return;
    }

    const activeObject = canvas.getActiveObject();
    if (!activeObject) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    activeObject.set({
      scaleX: newWidth / activeObject.width!,
      scaleY: newHeight / activeObject.height!,
    });

    canvas.renderAll();
    
    toast({
      title: "Success",
      description: "Image resized successfully",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Resize</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Width (px)</Label>
          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Width"
          />
        </div>
        <div className="space-y-2">
          <Label>Height (px)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height"
          />
        </div>
      </div>
      <Button onClick={handleResize} className="w-full">
        Resize Image
      </Button>
    </div>
  );
};
