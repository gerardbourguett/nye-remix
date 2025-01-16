import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import TimeProgress from "~/components/TimeProgress";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  const year = new Date().getFullYear();
  return [
    { title: `#${year + 1}Live` },
    { name: "description", content: "New Year's Eve Countdown" },
  ];
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
    <main className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full space-y-12 sm:space-y-20">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tighter dark:text-slate-200 text-slate-800">
          #{year + 1}
          <span className="text-blue-700">Live</span>
        </h1>

        <div className="w-full max-w-lg sm:max-w-xl mx-auto px-6">
          <TimeProgress />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 w-full max-w-5xl">
          {timeUnits.map((unit) => (
            <div
              key={unit}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                {timeLeft[unit].toString().padStart(2, "0")}
              </span>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                {unit}
              </span>
            </div>
          ))}
        </div>
        <footer className="w-full py-6 text-center text-md text-zinc-500">
          © 2024 - {new Date().getFullYear()}. Created by{" "}
          <a
            href="https://gerardabc.tech"
            className="text-zinc-600 hover:underline"
          >
            GerardABC
          </a>
        </footer>
      </div>
    </main>
  );
}
