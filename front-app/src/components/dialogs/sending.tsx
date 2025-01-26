import { Loader2 } from "lucide-react";

interface SendingDialogProps {
  fadeOut: boolean;
}

export const SendingDialog = ({ fadeOut }: SendingDialogProps) => (
  <div className={`transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
    <div className="flex flex-col items-center justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin mb-2" />
      <span>Enviando Rosto...</span>
    </div>
  </div>
);