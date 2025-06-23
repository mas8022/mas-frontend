"use client";

import { use, useEffect, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Fetch from "@/utils/axios";
import secretFetch from "@/utils/fetchers/secretFetch";

const TOTAL_TIME = 60;

const initialState = {
  questions: [],
  current: 0,
  selected: null,
  timeLeft: TOTAL_TIME,
  quizEnded: false,
  score: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };

    case "SELECT_OPTION": {
      const isCorrect =
        action.payload === state.questions[state.current]?.correctAnswer;
      return {
        ...state,
        selected: action.payload,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case "NEXT_QUESTION": {
      const hasMore = state.current + 1 < state.questions.length;
      return {
        ...state,
        current: hasMore ? state.current + 1 : state.current,
        selected: null,
        quizEnded: !hasMore,
      };
    }

    case "TICK": {
      if (state.timeLeft <= 1) {
        return { ...state, timeLeft: 0, quizEnded: true };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    }

    default:
      return state;
  }
}

const Page = ({ params }) => {
  const param = use(params);
  const category = decodeURIComponent(param.category);
  const router = useRouter();
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    Fetch.get(`/quiz/${category}`).then((res) => {
      const shuffled = res.data.sort(() => Math.random() - 0.5).slice(0, 4);
      dispatch({ type: "SET_QUESTIONS", payload: shuffled });
    });
  }, [category]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const setUserScore = async () => {
      if (state.quizEnded) {
        await secretFetch.put("/quiz", { score: state.score });

        router.replace(`/quiz/${category}/${state.score}`);
      }
    };
    setUserScore();
  }, [state.quizEnded]);

  if (!state.questions.length) return null;

  const currentQuestion = state.questions[state.current];
  const options = [
    currentQuestion.answerOne,
    currentQuestion.answerTwo,
    currentQuestion.answerThree,
    currentQuestion.answerFour,
  ];

  const handleSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });

    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
    }, 800);
  };

  const percent = (state.timeLeft / TOTAL_TIME) * 100;
  const radius = 45;
  const stroke = 6;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (percent / 100);

  return (
    <div className="h-screen w-full px-4 py-6 pb-20 bg-white dark:bg-black text-gray-800 dark:text-white flex flex-col items-center justify-between overflow-hidden">
      {/* تایمر دایره‌ای */}
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-gray-300 dark:text-neutral-700"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
            className="transition-all duration-300 ease-linear text-primary"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary">
          {state.timeLeft}s
        </div>
      </div>

      {/* سوال */}
      <div className="w-full max-w-md text-center h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentQuestion.question}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            {currentQuestion.question}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* گزینه‌ها */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {options.map((option) => {
          const isCorrect =
            state.selected && option === currentQuestion.correctAnswer;
          const isWrong =
            state.selected &&
            option === state.selected &&
            option !== currentQuestion.correctAnswer;

          return (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={!!state.selected}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
    ${
      state.selected
        ? isCorrect
          ? "bg-green-100 text-green-800 border-green-400 dark:bg-green-600/20 dark:text-green-300 dark:border-green-500"
          : isWrong
          ? "bg-red-100 text-red-800 border-red-400 dark:bg-red-600/20 dark:text-red-300 dark:border-red-500"
          : "bg-gray-100 dark:bg-neutral-800"
        : "bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
    }
  `}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
