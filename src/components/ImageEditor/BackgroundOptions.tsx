
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Canvas } from "fabric";

interface BackgroundOptionsProps {
  canvas: Canvas | null;
}

export const BackgroundOptions = ({ canvas }: BackgroundOptionsProps) => {
  const { toast } = useToast();

  const handleBackgroundColorChange = (color: string) => {
    if (!canvas) return;
    canvas.backgroundColor = color;
    canvas.renderAll();
  };

  const handleRemoveBackground = () => {
    toast({
      title: "Coming soon",
      description: "Background removal will be implemented in the next update",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Background</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                defaultValue="#ffffff"
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="w-12 h-12 p-1"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleRemoveBackground}
          >
            Remove Background
          </Button>
        </div>
      </div>
    </div>
  );
};
