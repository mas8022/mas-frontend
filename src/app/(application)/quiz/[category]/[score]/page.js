"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pizza, Globe, Telescope, Landmark } from "lucide-react";

const categories = [
  { title: "غذا و خوراکی", icon: Pizza },
  { title: "جغرافیا", icon: Globe },
  { title: "نجوم", icon: Telescope },
  { title: "تاریخ", icon: Landmark },
];

const Page = ({ params }) => {
  const { score } = use(params);
  const router = useRouter();

  const handleReplay = () => {
    router.push("/quiz");
  };

  return (
    <div className="h-screen w-full p-4 pb-20 flex flex-col items-center justify-between bg-white dark:bg-black text-gray-800 dark:text-white overflow-hidden">
      {/* بخش امتیاز */}
      <div className="flex flex-col items-center justify-center gap-3">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          امتیاز شما از این بازی
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-36 h-36"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="64"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-300 dark:text-neutral-700"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-primary">
            {score}
          </div>
        </motion.div>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="w-full flex flex-col items-center gap-6 mt-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          برای شروع دوباره یک دسته‌بندی انتخاب کنید
        </motion.p>

        <div className="grid grid-cols-2 gap-4">
          {categories.map(({ title, icon: Icon }, i) => (
            <motion.button
              key={title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.05 * i }}
              className="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-xl border bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 shadow-sm"
              onClick={() => router.push(`/quiz/${title}`)}
            >
              <Icon className="text-primary" size={32} />
              <span className="text-sm font-medium">{title}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
