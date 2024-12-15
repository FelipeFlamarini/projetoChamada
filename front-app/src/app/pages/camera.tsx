// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { X, XCircle, CircleCheck, TriangleAlert } from "lucide-react";
// import WebcamCapture from "@/components/camera";
// import Camera2 from "@/components/camera3";
import FaceDetection from "@/components/camera3";



// para Testar o toast descomente o codigo abaixo 
export function Camera() {
  return (
    <div className="w-full h-dvh flex flex-col gap-12 px-2 pt-8 pb-2 sm:py-2 sm:gap-2">
      <div>
        <p className="text-text text-center">
          Passe pelo reconhecimento facial para registrar sua presença na aula.
        </p>
        <p className="text-subText text-center">
          O registro da presença será automático.
        </p>
      </div>

      <FaceDetection />
      {/* <div className="flex justify-center gap-2">
        <Button
          className="bg-tst-success-foreground hover:bg-tst-success-foreground/85"
          onClick={() =>
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
                        <span className="text-tst-success-foreground">
                          João
                        </span>
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
              { duration: 1300 }
            )
          }
        >
          success
        </Button>
        <Button
          className="bg-tst-warning-foreground hover:bg-tst-warning-foreground/85"
          onClick={() =>
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
                        // strokeWidth={1}
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
        >
          warning
        </Button>

        <Button
          className="bg-tst-error-foreground hover:bg-tst-error-foreground/85"
          onClick={() =>
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
              { duration: 1300 }
            )
          }
        >
          error
        </Button>
      </div> */}
    </div>
  );
}
