import type { MetaFunction } from "@remix-run/node";
import Countdown from "~/components/Countdown";
import Footer from "~/components/Footer";
import TimeProgress from "~/components/TimeProgress";
import VideoBackground from "~/components/VideoBackground";

const year = new Date().getFullYear();
export const meta: MetaFunction = () => {
  return [
    { title: `#${year + 1}Live` },
    { name: "description", content: "New Year's Eve Countdown" },
  ];
};

export default function Index() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col items-center justify-center">
      <VideoBackground />
      <div className="flex flex-col items-center justify-center w-full h-full space-y-12 sm:space-y-20">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-medium tracking-tighter dark:text-slate-200 text-slate-800">
          #{year + 1}
          <span className="text-blue-700">Live</span>
        </h1>

        <div className="w-full max-w-lg sm:max-w-xl mx-auto px-6">
          <TimeProgress />
        </div>
        <Countdown />
        <Footer />
      </div>
    </main>
  );
}
