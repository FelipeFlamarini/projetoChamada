import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";

interface NotRecognizedDialogProps {
  fadeOut: boolean;
  handleReset: () => void;
}

export const NotRecognizedDialog = ({ fadeOut, handleReset }: NotRecognizedDialogProps) => (
  <div className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
    <DialogHeader>
      <DialogTitle className="text-center">Não reconhecido</DialogTitle>
    <DialogDescription className="text-center mb-4">
      Tentativa de reconhecimento falhou
    </DialogDescription>
    </DialogHeader>
    <DialogFooter className="mt-1">
      <Button onClick={handleReset}>Fechar</Button>
    </DialogFooter>
  </div>
);