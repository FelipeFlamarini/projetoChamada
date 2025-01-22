// import { Input } from "@/components/ui/input";
import { InputLogin } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface SearchWithIconsProps {
  title?: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithEndIcon({
  title = "",
  className,
  placeholder,
  children,
  value,
  onChange,
}: SearchWithIconsProps) {
  const id = useId();
  return (
    <div className="space-y-2">
      {title && <Label htmlFor={id}>{title}</Label>}
      <div className="relative">
        <InputLogin
          id={id}
          className={cn("peer pe-9", className)}
          placeholder={placeholder}
          type="email"
          value={value}
          onChange={onChange}
        />
        {/* trocar classe para o botão ficar mais intuitivo igual comp26*/}
        <button className=" absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          {children}
        </button>
      </div>
    </div>
  );
}
