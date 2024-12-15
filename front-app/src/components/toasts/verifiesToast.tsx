import { toast } from "sonner";
import { CircleCheck, X } from "lucide-react";

interface VerifyToastProps {
  nome: string;
  ra?: string;
}

const verifyToast = ({ nome , ra }: VerifyToastProps):void => {
  toast.custom(
    (t) => (
      <div className="flex border border-tst-success-foreground bg-tst-success w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <CircleCheck className="text-tst-success-foreground" />
          </div>
          <div>
            <p className="text-tst-text font-semibold text-sm">
              Presença Registrada{" "}
              <span className="text-tst-success-foreground">{nome}</span>
            </p>
            <p className="text-tst-text text-sm">
              A Sua presença foi registrada com sucesso
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
    { duration: 1300, }

  );
};

export { verifyToast };
