import { MoveLeft } from "lucide-react";
import logo from "/logoCI.svg";
import { Link } from "react-router";

interface HeaderBack2Props {
  link: string;
}


export const HeaderBack2 = ({link}:HeaderBack2Props) => {
  return (
    <div className="flex justify-between items-center">
      <Link to={link}>
        <MoveLeft size={32} />
      </Link>
      <div className="flex items-center">
        <p className="text-center font-purse text-text leading-none text-sm">
          Chamada
          <br className="" />
          Inteligente
        </p>
        <img src={logo} alt="logo" className="w-10" />
      </div>
    </div>
  );
};
