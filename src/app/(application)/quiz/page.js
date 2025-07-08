"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pizza, Globe, Telescope, Landmark } from "lucide-react";
import useGetMe from "@/hooks/fetchers/useGetMe";
import { MoonLoader } from "react-spinners";
import { useTheme } from "next-themes";

const categories = [
  { title: "غذا و خوراکی", icon: Pizza },
  { title: "جغرافیا", icon: Globe },
  { title: "نجوم", icon: Telescope },
  { title: "تاریخ", icon: Landmark }
];

const Page = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const { data, isPending } = useGetMe();

  const { theme } = useTheme();

  const handleStart = () => {
    if (selected) {
      router.push(`/quiz/${selected}`);
    }
  };

  return (
    <div className="h-screen w-full px-4 py-4 pb-20 bg-white dark:bg-black text-gray-800 dark:text-white overflow-hidden flex flex-col items-center justify-between">
      {/* امتیاز */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-primary flex items-center justify-center text-3xl sm:text-4xl font-bold text-primary shadow-md">
          {isPending ? (
            <MoonLoader size={40} color={theme === "dark" ? "#fff" : "#000"} />
          ) : (
            data? data.score : 0
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          امتیاز فعلی شما
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 max-w-xs leading-relaxed">
          یکی از موضوعات زیر را انتخاب کنید و بازی را شروع کنید.
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {categories.map(({ title, icon: Icon }) => {
            const isActive = selected === title;
            return (
              <button
                key={title}
                onClick={() => setSelected(title)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm text-sm
                  ${
                    isActive
                      ? "bg-primary/10 border-primary dark:bg-primary/20"
                      : "bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }
                `}
              >
                <Icon
                  size={24}
                  className={
                    isActive
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  }
                />
                <span
                  className={`font-medium ${
                    isActive ? "text-primary" : "text-gray-800 dark:text-white"
                  }`}
                >
                  {title}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleStart}
          disabled={!selected}
          className={`w-full max-w-xs px-5 py-2.5 rounded-full font-semibold text-sm transition text-black
            ${
              selected
                ? "bg-primary hover:bg-primary/90 text-white dark:text-black"
                : "bg-background/100 border-2 border-black dark:bg-neutral-700 cursor-not-allowed dark:text-white"
            }
          `}
        >
          شروع بازی
        </button>
      </div>
    </div>
  );
};

export default Page;
