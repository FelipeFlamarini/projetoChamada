import logo from "/logoCI.svg";

function LogoCI() {
  return (
    <div className="flex items-center">
      <p className="text-center font-purse text-text leading-none text-2xl">Chamada<br className=""/>Inteligente</p>
      <img src={logo} alt="logo" />
    </div>
  );
}

export { LogoCI };