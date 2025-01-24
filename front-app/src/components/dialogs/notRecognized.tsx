import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface NotRecognizedDialogProps {
  fadeOut: boolean;
  handleReset: () => void;
}

export const NotRecognizedDialog = ({ fadeOut, handleReset }: NotRecognizedDialogProps) => (
  <div className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
    <DialogDescription className="text-center mb-4">
      Tentativa de reconhecimento falhou
    </DialogDescription>
    <DialogFooter className="justify-center">
      <Button onClick={handleReset}>Fechar</Button>
    </DialogFooter>
  </div>
);