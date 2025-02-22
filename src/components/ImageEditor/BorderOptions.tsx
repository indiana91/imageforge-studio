
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface BorderOptionsProps {
  borderWidth: number;
  borderColor: string;
  onWidthChange: (width: number) => void;
  onColorChange: (color: string) => void;
}

export const BorderOptions = ({
  borderWidth,
  borderColor,
  onWidthChange,
  onColorChange,
}: BorderOptionsProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Border</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Width</Label>
            <Slider
              value={[borderWidth]}
              onValueChange={(value) => onWidthChange(value[0])}
              max={50}
              step={1}
            />
            <div className="text-sm text-gray-500">{borderWidth}px</div>
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={borderColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={borderColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
