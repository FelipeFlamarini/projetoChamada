import { toast } from "sonner";
import { Loader, X } from "lucide-react";


const SendingToast = () => {
  console.log("notVerifyToast")
  toast.custom(
    (t) => (
      <div className="flex border border-blue-500 bg-blue-100 w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            <Loader className="text-blue-500"/>
          </div>
          <div>
            <p className="text-blue-800 font-semibold text-sm">
              Enviando...
            </p>
            <p className="text-blue-800 text-sm">
              estamos enviando sua imagem
            </p>
          </div>
        </div>
        <div>
          <X
            className="text-blue-800"
            // strokeWidth={1}
            onClick={() => toast.dismiss(t)}
          />
        </div>
      </div>
    ),
    { duration: 900 }
  )
}

export { SendingToast };