import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ConfirmedDialogProps {
  fadeOut: boolean;
  handleReset: () => void;
}

export const ConfirmedDialog = ({ fadeOut, handleReset }: ConfirmedDialogProps) => (
  <div className={`transition-opacity duration-300  ${fadeOut ? "opacity-0" : "opacity-100"}`}>
    <DialogDescription className="text-center mb-4">
      Presença confirmada!
    </DialogDescription>
    <DialogFooter className="justify-center">
      <Button onClick={handleReset}>Fechar</Button>
    </DialogFooter>
  </div>
);