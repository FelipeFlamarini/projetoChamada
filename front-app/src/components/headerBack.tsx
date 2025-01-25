import { ChevronLeft, CircleHelp, Settings } from "lucide-react";
import { Link } from "react-router";

interface HeaderBackProps {
  title: string;
  cvLeft: string;
}

export const HeaderBack = ({ title,cvLeft }: HeaderBackProps) => {
  return (
    <div className="flex items-center justify-between  py-3 border-b w-full ">
      <Link to={cvLeft}>
        <button className="text-btnGo">
          <ChevronLeft className="h-6 w-6" />
        </button>
      </Link>
      <h1 className="font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        <Link to={"#"}>
          <button className="text-btnGo">
            <CircleHelp className="h-5 w-5" />
          </button>
        </Link>
        <Link to={"#"}>
          <button className="text-btnGo">
            <Settings className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
