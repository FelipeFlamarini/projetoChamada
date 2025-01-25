import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LucideProps } from "lucide-react";
import { Button } from "../ui/button";

interface CaledarBtnProps {
  Icon: React.ComponentType<LucideProps>;
  placeholder: string | undefined;
  className?: string;
  onDateChange?: (date: Date) => void;
  dates?: string[];
}

export const CaledarBtn = ({
  Icon,
  placeholder,
  onDateChange,
  dates = [],
  ...rest
}: CaledarBtnProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => setIsCalendarOpen((prev) => !prev);
  const includeDates = dates.map((date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset());
    return adjustedDate;
  });
  
  return (
    <div className="relative">
      <Button
        variant={"goSecondary"}
        type="button"
        onClick={toggleCalendar}
        {...rest}
      >
        <Icon />
        <span>
          {selectedDate
            ? selectedDate.toLocaleDateString("pt-BR")
            : placeholder}
        </span>
      </Button>
      {isCalendarOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black bg-opacity-50" onClick={() => setIsCalendarOpen(false)}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" onClick={(e) => e.stopPropagation()}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                if (selectedDate?.getTime() === date?.getTime()) {
                  setIsCalendarOpen(false);
                  return;

                } else {
                  if (date) {
                    onDateChange?.(date);
                  }
                  setSelectedDate(date);
                  setIsCalendarOpen(false); // Fecha o calendário ao selecionar
                } 
              }}
              includeDates={includeDates}
              inline
            />
          </div>
        </div>
      )}
    </div>
  );
};
