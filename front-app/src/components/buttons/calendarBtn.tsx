import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns"

interface CaledarBtnProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  placeholder: string | undefined;
}

export const CaledarBtn = ({ field,placeholder }:CaledarBtnProps) => {
  return (
    <Button variant={"goSecondary"} type="button">
      <CalendarDays />
      {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
    </Button>
  );
};
