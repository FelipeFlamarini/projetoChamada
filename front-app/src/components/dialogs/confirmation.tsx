import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { DeepFaceStudentReturn } from "@/model";

interface ConfirmationDialogProps {
  fadeOut: boolean;
  students: DeepFaceStudentReturn[];
  handleConfirm: (student: DeepFaceStudentReturn) => void;
  handleExit: () => void;
}

export function ConfirmationDialog({
  fadeOut,
  students,
  handleConfirm,
  handleExit,
}: ConfirmationDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNo = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleExit();
    }
  };

  return (
    <div
      className={`transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <DialogDescription className="text-center mb-4">
        Você é <span className="font-bold">{students[currentIndex].name}</span>?{" "}
        <br />{" "}
        <span className="font-bold">RA: {students[currentIndex].ra}</span>
      </DialogDescription>
      <DialogFooter className="sm:justify-center sm: gap-6">
        <Button
          variant={"go"}
          onClick={() => handleConfirm(students[currentIndex])}
        >
          Sim, sou eu
        </Button>
        <Button
          variant="goOutline"
          onClick={handleNo}
          className="mr-2 border-2"
        >
          Não sou eu
        </Button>
      </DialogFooter>
    </div>
  );
}
