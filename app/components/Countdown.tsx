import { useState, useEffect } from "react";

import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

type CountdownProps = {
  targetDate: Date;
};

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = formatDistanceToNow(targetDate, { addSuffix: false });
      setTimeLeft(distance);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-lg border border-zinc-200 rounded-lg bg-white">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-zinc-800">
            🎉 Cuenta Regresiva 🎉
          </h1>
          <Separator className="my-2" />
        </CardHeader>
        <CardContent className="text-center">
          <p
            className={clsx(
              "text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r",
              "from-indigo-500 to-purple-500"
            )}
          >
            {timeLeft}
          </p>
        </CardContent>
        <CardFooter className="mt-4 text-center">
          <p className="text-sm text-zinc-600">
            ¡Prepárate para celebrar el Año Nuevo!
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
