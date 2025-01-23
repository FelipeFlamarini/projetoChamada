import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";

interface checkToastProps{
  titulo: string
  descricao: string
}

export function checkToast({titulo,descricao}: checkToastProps) {
  toast.custom(
    (t) => (
      <div className="flex border border-tst-success-foreground bg-tst-success w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <CircleCheck className="text-tst-success-foreground" />
          </div>
          <div>
            <p className="text-tst-text font-semibold text-sm">
              {titulo}
            </p>
            <p className="text-tst-text text-sm">
              {descricao}
            </p>
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
    { duration: 10000 }
  );
}
