import { LucideProps } from "lucide-react";
import { Button } from "../ui/button";

interface CaledarBtnProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<LucideProps>;
  placeholder: string | undefined;
  className?: string;
}

export const CaledarBtn = ({ Icon, placeholder, ...rest }: CaledarBtnProps) => {
  return (
    <Button variant={"goSecondary"} type="button" {...rest}>
      <Icon />
      <span>{placeholder}</span>
    </Button>
  );
};
