import { toast } from "sonner";
import { CircleAlertIcon } from "lucide-react";

import { Button } from "../ui/button";

import { DeepFaceStudentReturn } from "@/model";

interface iConfirmationToast {
  students: DeepFaceStudentReturn;
  confirmationMutation: () => void;
}

export function confirmationToast({ ...props }: iConfirmationToast) {
  for (const student of props.students) {
    toast.custom(
      (t) => (
        <div className="flex flex-col border border-yellow-500 bg-tst-warning w-full rounded-lg p-4 gap-2 justify-between sm:w-[354px]">
          <div className="flex gap-4">
            <div>
              <CircleAlertIcon className="text-yellow-500" />
            </div>
            <div>
              <p className="text-yellow-800 font-semibold">
                Confirme suas informações
              </p>
              <p className="text-yellow-800">{student.name}</p>
              <p className="text-yellow-800">RA: {student.ra}</p>
            </div>
          </div>
          <div className="flex justify-between mx-10">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                props.confirmationMutation(student.token);
              }}
            >
              Sou eu
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t);
              }}
            >
              Não sou eu
            </Button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
    // await sleep(5000);
  }
}
