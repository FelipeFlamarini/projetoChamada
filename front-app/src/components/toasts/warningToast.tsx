import { toast } from "sonner";
import { TriangleAlert, X } from "lucide-react";
import { Button } from "../ui/button";


const WarningToast = () => {
  toast.custom(
    (t) => (
      <div className="flex-col border border-tst-warning-foreground bg-tst-warning w-full rounded-lg p-4 sm:w-[354px]">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-4">
            <div>
              <TriangleAlert className="text-tst-warning-foreground" />
            </div>
            <div>
              <p className="text-tst-text font-semibold text-sm">
                Sua aula ainda não Terminou
              </p>
              <p className="text-tst-text text-sm">
                Se sair agora voce ficara com falta
              </p>
            </div>
          </div>
          <div>
            <X
              className="text-tst-text"
              onClick={() => toast.dismiss(t)}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center mt-2">
          <Button
            className="border border-tst-text text-tst-text bg-transparent w-full hover:bg-tst-warning-foreground"
            size={"sm"}
          >
            Ficar Na Aula
          </Button>
          <Button
            className="border border-tst-text text-tst-text bg-transparent w-full hover:bg-tst-warning-foreground"
            size={"sm"}
          >
            {" "}
            Sair Mesmo Assim
          </Button>
        </div>
      </div>
    ),
    { duration: 4000 }
  )
}

export { WarningToast };