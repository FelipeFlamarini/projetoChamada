import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  fadeOut: boolean;
  students: any; // Replace with appropriate type
  handleConfirm: () => void;
  handleExit: () => void;
}

export const ConfirmationDialog = ({
  fadeOut,
  students,
  handleConfirm,
  handleExit,
}: ConfirmationDialogProps) => (
  <div className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
    <DialogDescription className="text-center mb-4">
      Você é <span className="font-bold">{students[0].name}</span>? <br /> <span className="font-bold">RA: {students[0].ra}</span>
    </DialogDescription>
    <DialogFooter className="sm:justify-center sm: gap-6">
      <Button variant={"go"} onClick={handleConfirm}>Sim Sou Eu</Button>
      <Button variant="goOutline" onClick={handleExit} className="mr-2 border-2">Não sou eu</Button>
    </DialogFooter>
  </div>
);