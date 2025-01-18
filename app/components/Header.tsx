import { CURRENT_YEAR } from "~/data/constants";

const Header = () => {
  return (
    <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tighter dark:text-slate-200 text-slate-800">
      #{CURRENT_YEAR + 1}
      <span className="text-blue-700 animate-pulse">Live</span>
    </h1>
  );
};

export default Header;
