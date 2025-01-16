import { useEffect, useMemo, useState } from "react";

const Countdown = () => {
  const [now, setNow] = useState(() => Date.now());
  const year = useMemo(() => new Date().getFullYear(), []);
  //Targetname debe ajustarse al huso horario desde donde se visita la página
  const targetDate = useMemo(
    () => new Date(`December 31, ${year} 23:59:59`).getTime(),
    [year]
  );

  const timeLeft = useMemo(() => {
    const gap = targetDate - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    return {
      days: Math.max(0, Math.floor(gap / day)),
      hours: Math.max(0, Math.floor((gap % day) / hour)),
      minutes: Math.max(0, Math.floor((gap % hour) / minute)),
      seconds: Math.max(0, Math.floor((gap % minute) / second)),
    };
  }, [now, targetDate]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = useMemo(
    () => ["days", "hours", "minutes", "seconds"] as const,
    []
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 w-full max-w-5xl">
      {timeUnits.map((unit) => (
        <div
          key={unit}
          className="flex flex-col items-center justify-center space-y-3"
        >
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
            {timeLeft[unit].toString().padStart(2, "0")}
          </span>
          <span className="text-lg text-gray-500 dark:text-gray-400">
            {unit.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
