import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import SocialShare from "~/components/SocialShare";

export const meta: MetaFunction = () => {
  const year = new Date().getFullYear();
  return [
    { title: `#${year + 1}Live` },
    { name: "description", content: "New Year's Eve Countdown" },
  ];
};

export const TimeProgress = () => {
  const [timeLeft, setTimeLeft] = useState({ progress: 0 });
  const year = new Date().getFullYear();

  useEffect(() => {
    const calculateProgress = () => {
      const startDate = new Date(Date.UTC(year, 0, 1));
      const endDate = new Date(Date.UTC(year + 1, 0, 1));
      const now = Date.now();

      const progress =
        ((now - startDate.getTime()) /
          (endDate.getTime() - startDate.getTime())) *
        100;
      return Math.min(100, Math.max(0, progress));
    };

    const updateProgress = () => {
      setTimeLeft((prev) => {
        const newProgress = calculateProgress();
        if (Math.abs(prev.progress - newProgress) > 0.00001) {
          return { progress: newProgress };
        }
        return prev;
      });
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [year]);

  return (
    <div className="">
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-blue-700 transition-all duration-500"
          style={{ width: `${timeLeft.progress}%` }}
        />
      </div>
      <p className="text-gray-400 mt-2 text-center">
        {year} Progress: {timeLeft.progress.toFixed(5)}%
      </p>
      <div className="mt-4">
        <div className="">
          <SocialShare
            url="https://nye.today"
            title={`The year ${year} is ${timeLeft.progress.toFixed(
              5
            )}% complete!. Check out the progress at`}
          />
        </div>
      </div>
    </div>
  );
};

export default function Index() {
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
    <div className="">
      <div className="text-center space-y-10 sm:space-y-16">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter">
          #{year + 1}
          <span className="text-blue-700">Live</span>
        </h1>

        <div className="w-full max-w-md sm:max-w-lg mx-auto px-4">
          <TimeProgress />
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* <Button
        color="danger"
        variant="shadow"
        size="lg"
        className="text-lg sm:text-xl hover:scale-105 transition-transform"
      >
        <a href="/chao2024">Dec 31, {CURRENT_YEAR} 10:00 UTC</a>
      </Button> */}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {timeUnits.map((unit) => (
          <div key={unit} className="flex flex-col items-center space-y-3">
            <div className="bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 from-zinc-200 to-zinc-100 rounded-2xl p-6 shadow-xl backdrop-blur-sm border dark:border-zinc-800 border-zinc-200 hover:scale-105 transition-all duration-300">
              <span className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                {timeLeft[unit].toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-sm md:text-base uppercase font-medium dark:text-zinc-400 text-zinc-600 tracking-wider">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
