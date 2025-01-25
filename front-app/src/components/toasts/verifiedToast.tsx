import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";

export function verifiedToast(time: string) {
  toast.custom(
    (t) => (
      <div className="flex border border-tst-success-foreground bg-tst-success w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <CircleCheck className="text-tst-success-foreground" />
          </div>
          <div>
            <p className="text-tst-text font-semibold text-sm">
              Presença registrada
            </p>
            <p className="text-tst-text text-sm">
              Sua presença foi registrada no horário {time}
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
