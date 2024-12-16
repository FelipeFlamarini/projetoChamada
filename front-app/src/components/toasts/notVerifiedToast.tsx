import { toast } from "sonner";
import { XCircle, X } from "lucide-react";


const notVerifyToast = () => {
  console.log("notVerifyToast")
  toast.custom(
    (t) => (
      <div className="flex border border-tst-error-foreground bg-tst-error w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <XCircle className="text-tst-error-foreground" />
          </div>
          <div>
            <p className="text-tst-text font-semibold text-sm">
              Aluno não Identificado
            </p>
            <p className="text-tst-text text-sm">
              A presença não foi registrada tente novamente
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
    { duration: 1000 }
  )
}

export { notVerifyToast };