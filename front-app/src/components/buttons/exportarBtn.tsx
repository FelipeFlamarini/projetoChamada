import { Button } from "../ui/button";

export const ExportarBtn = ({ ...rest }) => {
  return (
    <Button variant={"go"} type="button" {...rest}>
      <span>Exportar</span>
    </Button>
  );
};
