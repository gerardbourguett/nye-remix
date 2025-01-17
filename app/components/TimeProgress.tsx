import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
import { CURRENT_YEAR } from "~/data/constants";
import SocialShare from "./SocialShare";

const TimeProgress = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const yearStart = new Date(CURRENT_YEAR, 0, 1);
      const yearEnd = new Date(CURRENT_YEAR + 1, 0, 1);
      const totalYearTime = yearEnd.getTime() - yearStart.getTime();
      const elapsedTime = now.getTime() - yearStart.getTime();
      return (elapsedTime / totalYearTime) * 100;
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="w-full">
        <Progress
          value={timeLeft}
          className="h-4 bg-gray-800 rounded-full overflow-hidden"
        />
        <p className="text-gray-400 mt-2 text-center">
          The year {CURRENT_YEAR} is {timeLeft.toFixed(5)}% complete.
        </p>
        <div className="mt-4">
          <div className="">
            <SocialShare
              url="https://nye.today"
              title={`The year ${CURRENT_YEAR} is ${timeLeft.toFixed(
                5
              )}% complete!. Check out the progress at`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeProgress;
