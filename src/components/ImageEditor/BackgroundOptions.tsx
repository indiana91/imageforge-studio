
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BackgroundOptionsProps {
  backgroundColor: string;
  onColorChange: (color: string) => void;
}

export const BackgroundOptions = ({
  backgroundColor,
  onColorChange,
}: BackgroundOptionsProps) => {
  const { toast } = useToast();

  const handleRemoveBackground = () => {
    toast({
      title: "Coming soon",
      description: "Background removal will be implemented in the next update",
    });
  };

  return (
    <div className="space-y-6 mt-6 pt-6 border-t">
      <div>
        <h3 className="text-lg font-medium mb-4">Background</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-12 h-12 p-1"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="flex-1"
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
