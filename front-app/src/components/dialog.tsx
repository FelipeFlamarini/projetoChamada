"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useCreateAttendanceApiAttendancesPost } from "@/chamada";

interface SmoothAPICallSimulationProps {
  stage: "idle" | "sending" | "confirmation" | "confirmed" | "notRecognized";
  setStage: (
    value: "idle" | "sending" | "confirmation" | "confirmed" | "notRecognized"
  ) => void;
  dialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  // endResult: 'confirmed' | 'exited' | null
  // setEndResult: (value: 'confirmed' | 'exited' | null) => void
  isConfirmed: boolean;
  setIsConfirmed: (value: boolean) => void;
  fadeOut: boolean;
  setFadeOut: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  students: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResponse: any;
}

export function SmoothAPICallSimulation({
  stage,
  setStage,
  dialogOpen,
  setDialogOpen,
  fadeOut,
  setFadeOut,
  students,
  onResponse
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

  // const handleNotRecognized = () => {
  //   setFadeOut(true);
  //   setTimeout(() => {
  //     setStage("notRecognized");
  //   });
  // };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chamada Inteligente</DialogTitle>
        </DialogHeader>

        <div
          className={`transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {stage === "sending" && (
            <div className="flex flex-col items-center justify-center p-4">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <span>Enviando Rosto...</span>
            </div>
          )}

          {stage === "confirmation" && (
            <>
              <DialogDescription className="text-center mb-4">
                Voce é <span className="font-bold">Kauan</span> ? <br/>  <span className="font-bold">RA:1899982193</span>
              </DialogDescription>
              <DialogFooter className="sm:justify-center sm: gap-6">
                <Button variant={"go"} onClick={handleConfirm}>Sim Sou Eu</Button>
                <Button variant="goOutline" onClick={handleExit} className="mr-2">
                  Não sou eu
                </Button>
              </DialogFooter>
            </>
          )}

          {stage === "confirmed" && (
            <>
              <DialogDescription className="text-center mb-4">
                Presença confirmada!
              </DialogDescription>
              <DialogFooter className="justify-center">
                <Button onClick={handleReset}>Fechar</Button>
              </DialogFooter>
            </>
          )}

          {stage === "notRecognized" && (
            <>
              <DialogDescription className="text-center mb-4">
                tentativa de reconhecimento falhou
              </DialogDescription>
              <DialogFooter className="justify-center">
                <Button onClick={handleReset}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
