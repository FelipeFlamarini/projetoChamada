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
}

export const CaledarBtn = ({
  Icon,
  placeholder,
  onDateChange,
  ...rest
}: CaledarBtnProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => setIsCalendarOpen((prev) => !prev);

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
        <div className="fixed top-0 left-0 w-full h-full z-0 bg-black bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                if (date) {
                  onDateChange?.(date);
                  setSelectedDate(date);
                }
                setIsCalendarOpen(false);
              }}
              inline
            />
          </div>
        </div>
      )}
    </div>
  );
};
