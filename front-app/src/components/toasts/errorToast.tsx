import { toast } from "sonner";
import { XCircle, X } from "lucide-react";

interface errorToastProps {
  titulo: string;
  descricao: string;
}

export function errorToast({ titulo, descricao }: errorToastProps) {
  toast.custom(
    (t) => (
      <div className="flex border border-tst-error-foreground bg-tst-error w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <XCircle className="text-tst-error-foreground" />
          </div>
          <div>
            <p className="text-tst-text font-semibold text-sm">{titulo}</p>
            <p className="text-tst-text text-sm">{descricao}</p>
          </div>
        </div>
        <div>
          <X
            className="text-tst-text"
            // strokeWidth={1}
            onClick={() => toast.dismiss(t)}
          />
        </div>
      </div>
    ),
    { duration: 2000 }
  );
}
