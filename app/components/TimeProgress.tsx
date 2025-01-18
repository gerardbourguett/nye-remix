import { useEffect, useState, useMemo, useCallback } from "react";
import { Progress } from "~/components/ui/progress";
import { CURRENT_YEAR } from "~/data/constants";
import SocialShare from "./SocialShare";
import NumberFlow from "@number-flow/react";
import { motion, MotionConfig } from "motion/react";

const MotionNumberFlow = motion.create(NumberFlow);

const TimeProgress = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  const yearStart = useMemo(() => new Date(CURRENT_YEAR, 0, 1), []);
  const yearEnd = useMemo(() => new Date(CURRENT_YEAR + 1, 0, 1), []);

  const calculateProgress = useCallback(() => {
    const now = new Date();
    const totalYearTime = yearEnd.getTime() - yearStart.getTime();
    const elapsedTime = now.getTime() - yearStart.getTime();
    return (elapsedTime / totalYearTime) * 100;
  }, [yearStart, yearEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateProgress());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateProgress]);

  return (
    <div>
      <div className="w-full">
        <Progress
          value={timeLeft}
          className="h-4 bg-gray-800 rounded-full overflow-hidden"
        />
        <p className="text-gray-400 mt-4 text-center text-xl">
          <MotionConfig
            transition={{
              layout: { duration: 0.9, bounce: 0, type: "spring" },
            }}
          >
            <motion.span
              className="inline-flex items-center px-[0.3em] text-2xl text-white transition-colors duration-300"
              layout
              style={{ borderRadius: 999 }}
            >
              <MotionNumberFlow
                value={timeLeft}
                format={{
                  minimumFractionDigits: 5,
                  maximumFractionDigits: 5,
                }}
                className="font-semibold"
                style={
                  {
                    "--number-flow-char-height": "0.85em",
                    "--number-flow-mask-height": "0.3em",
                  } as React.CSSProperties
                }
                layout
                layoutRoot
              />
            </motion.span>
          </MotionConfig>
          % of {CURRENT_YEAR} is complete
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
