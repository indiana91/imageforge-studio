
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Canvas } from "fabric";

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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Border</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Slider
              defaultValue={[0]}
              max={50}
              step={1}
              onValueChange={handleBorderWidthChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                onChange={(e) => handleBorderColorChange(e.target.value)}
                className="w-12 h-12 p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
