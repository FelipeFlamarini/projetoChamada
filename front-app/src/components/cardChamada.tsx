import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { DatePickerForm } from "./calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { calendarSchema } from "@/schemas/calendar";
import { useState, useEffect } from "react";

export const CardChamada = () => {
  const [firstDateState, setFirstDateState] = useState<{ before: Date } | undefined>(undefined);
  const [finalDateState, setFinalDateState] = useState<{ after: Date } | undefined>(undefined);
  const form = useForm<z.infer<typeof calendarSchema>>({
    resolver: zodResolver(calendarSchema),
  });

  function chamadaSubmit(data: z.infer<typeof calendarSchema>) {
    console.log(data);
  }

  const { watch } = form;

  const initialDate = watch("initialDate");
  const finalDate = watch("finalDate")

  useEffect(() => {
    if (initialDate) {
      setFirstDateState({ before: initialDate });
    }
  }, [initialDate]);

  useEffect(() => {
    if (finalDate) {
      setFinalDateState({ after: finalDate });
    }
  }, [finalDate]);

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Exportar Lista de Chamada</CardTitle>
        <CardDescription className="text-center">
          Selecione uma data ou um período de tempo para exportar a(s) lista(s)
          de chamada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <div>
              <DatePickerForm
                form={form}
                name="specificDate"
                label="Data da Chamada"
                placeholder="Selecione uma data"
                disabled={!!initialDate}
              />
            </div>
            <div className="flex gap-2 justify-center">
              <DatePickerForm
                form={form}
                name="initialDate"
                placeholder="Data Inicial"
                disabled={!!watch("specificDate")}
                calendarDisabled={finalDateState}
              />
              <DatePickerForm
                form={form}
                name="finalDate"
                placeholder="DataFinal"
                calendarDisabled={firstDateState}
                disabled={!!watch("specificDate") || !initialDate}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-3xl" variant={"go"}
        onClick={form.handleSubmit(chamadaSubmit)}
        >Exportar Lista(s)</Button>
      </CardFooter>
    </Card>
  );
};
