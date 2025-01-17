import { CURRENT_YEAR } from "~/data/constants";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const Header = () => {
  const count = useMotionValue(2000);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    const controls = animate(count, CURRENT_YEAR + 1, { duration: 4 });
    return () => controls.stop();
  }, []);
  return (
    <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tighter dark:text-slate-200 text-slate-800">
      #<motion.span>{rounded}</motion.span>
      <span className="text-blue-700 animate-pulse">Live</span>
    </h1>
  );
};

export default Header;
