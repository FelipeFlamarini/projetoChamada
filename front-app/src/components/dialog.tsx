"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SendingDialog } from "@/components/dialogs/sending";
import { ConfirmationDialog } from "@/components/dialogs/confirmation";
import { ConfirmedDialog } from "@/components/dialogs/recognized";
import { NotRecognizedDialog } from "@/components/dialogs/notRecognized";
import { useCreateAttendanceApiAttendancesPost } from "@/chamada";

interface SmoothAPICallSimulationProps {
  stage: "idle" | "sending" | "confirmation" | "confirmed" | "notRecognized";
  setStage: (
    value: "idle" | "sending" | "confirmation" | "confirmed" | "notRecognized"
  ) => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
  fadeOut: boolean;
  setFadeOut: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  students: any; // Replace with appropriate type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponse: any; // Replace with appropriate type
}

export function SmoothAPICallSimulation({
  stage,
  setStage,
  dialogOpen,
  setDialogOpen,
  fadeOut,
  setFadeOut,
  students,
  onResponse,
}: SmoothAPICallSimulationProps) {
  const confirmationMutation = useCreateAttendanceApiAttendancesPost();

  const handleConfirm = () => {
    setFadeOut(true);
    confirmationMutation.mutate(students.token);
    if (onResponse) {
      onResponse(); // Resolve a promessa no pai.
    }
    setTimeout(() => {
      setStage("confirmed");
      setFadeOut(false);
    }, 300);
  };

  const handleExit = () => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
    }, 300);
  };

  const handleReset = () => {
    setFadeOut(true);
    setTimeout(() => {
      setStage("idle");
      setDialogOpen(false);
      setFadeOut(false);
    }, 300);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chamada Inteligente</DialogTitle>
        </DialogHeader>

        {stage === "sending" && <SendingDialog fadeOut={fadeOut} />}
        {stage === "confirmation" && (
          <ConfirmationDialog
            fadeOut={fadeOut}
            students={students}
            handleConfirm={handleConfirm}
            handleExit={handleExit}
          />
        )}
        {stage === "confirmed" && (
          <ConfirmedDialog fadeOut={fadeOut} handleReset={handleReset} />
        )}
        {stage === "notRecognized" && (
          <NotRecognizedDialog fadeOut={fadeOut} handleReset={handleReset} />
        )}
      </DialogContent>
    </Dialog>
  );
}
