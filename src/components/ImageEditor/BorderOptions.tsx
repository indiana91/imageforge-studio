
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Canvas } from "fabric";
import { Frame } from "lucide-react";

interface BorderOptionsProps {
  canvas: Canvas | null;
}

export const BorderOptions = ({ canvas }: BorderOptionsProps) => {
  const handleBorderWidthChange = (value: number[]) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    activeObject.set('strokeWidth', value[0]);
    canvas.renderAll();
  };

  const handleBorderColorChange = (color: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    activeObject.set('stroke', color);
    canvas.renderAll();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Frame className="w-5 h-5" />
        <h3 className="text-lg font-medium">Border</h3>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-400">Width</Label>
          <Slider
            defaultValue={[0]}
            max={50}
            step={1}
            onValueChange={handleBorderWidthChange}
            className="[&_[role=slider]]:bg-teal-600"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-400">Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              onChange={(e) => handleBorderColorChange(e.target.value)}
              className="w-12 h-12 p-1 bg-transparent border border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
