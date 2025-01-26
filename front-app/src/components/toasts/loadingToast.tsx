import { toast } from "sonner";
import { Binoculars } from "lucide-react";

interface DetectingToastProps {
  isDetecting: boolean;
}

const detectingToast = ({ isDetecting }: DetectingToastProps): void => {
  toast.custom(
    () => (
      <div className="flex border border-gray-400 bg-gray-200 w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
        <div className="flex gap-4">
          <div>
            {/* <CircleCheck  */}
            <Binoculars className="text-gray-600" />
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-sm">
              Procurando rosto{" "}
              {/* <span className="text-gray-600">{nome}</span> */}
            </p>
            <p className="text-gray-800 text-sm">
              Aguardando detecção do rosto
            </p>
          </div>
        </div>
        {/* {!isDetecting && toast.dismiss(t)} */}
      </div>
    ),
    { duration: isDetecting ? Infinity : -1 }
  );
};

export { detectingToast };
