"use client";

import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// import { cn } from "@/lib/utils";
// import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { CaledarBtn } from "./buttons/calendarBtn";
import { Matcher } from "react-day-picker";
import { calendarSchema } from "@/schemas/calendar";

interface dateI {
  specificDate?: Date;
  initialDate?: Date;
  finalDate?: Date;
}

interface DatePickerFormProps {
  form: UseFormReturn<dateI>;
  name: keyof z.infer<typeof calendarSchema>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  calendarDisabled?: Matcher;
  // onDateChange?: (date: Date | null) => void;
}

export function DatePickerForm({
  form,
  name,
  placeholder = "",
  label,
  disabled = false,
  calendarDisabled = undefined,
}: DatePickerFormProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="text-subText">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl className="w-full">
                <Button
                  variant={"goSecondary"}
                  className="rounded-3xl w-full"
                  disabled={disabled}
                >
                  <CalendarDays />
                  {field.value ? (
                    format(field.value, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
                {/* <CaledarBtn field={field} placeholder={placeholder}/> */}
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={calendarDisabled}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          {/* <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
