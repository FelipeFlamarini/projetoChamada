import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

interface ConfirmedDialogProps {
  fadeOut: boolean;
  handleReset: () => void;
}

export const ConfirmedDialog = ({
  fadeOut,
  handleReset,
}: ConfirmedDialogProps) => (
  <div
    className={`transition-opacity duration-300  ${
      fadeOut ? "opacity-0" : "opacity-100"
    }`}
  >
    <DialogHeader>
      <DialogTitle className="text-center">Presença confirmada!</DialogTitle>
      <DialogDescription className="text-center mb-4">
        Parabéns sua presença foi confirmada!
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="mt-1">
      <Button onClick={handleReset}>Fechar</Button>
    </DialogFooter>
  </div>
);
