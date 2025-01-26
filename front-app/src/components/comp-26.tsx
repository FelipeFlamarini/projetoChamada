import { InputLogin } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Search } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/utils"

interface SearchWithIconsProps {
  title: string;
  className?: string;
  placeholder?: string;
}

// tirar o x azul

export function SearchWithIcons({title,className,placeholder}:SearchWithIconsProps ) {
  const id = useId();
  return (
    <div className="space-y-2 w-full">
      <Label htmlFor={id} className="font-semibold">{title}</Label>
      <div className="relative">
        <InputLogin id={id} className={cn("peer pe-9 ps-9",className)} placeholder={placeholder} type="text" />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Delete text"
        >
          <X size={16} strokeWidth={2} aria-hidden="true" className="text-black"/>
        </button>
      </div>
    </div>
  );
}
