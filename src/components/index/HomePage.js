"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { FaHtml5, FaCss3Alt, FaReact, FaJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiSocketdotio,
  SiRedis,
  SiPrisma,
  SiMongodb,
} from "react-icons/si";

const skillItems = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-400" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" />,
  },
  { name: "Nest.js", icon: <SiNestjs className="text-red-600" /> },
  {
    name: "Socket.io",
    icon: <SiSocketdotio className="text-gray-700 dark:text-white" />,
  },
  { name: "MongoDB", icon: <SiMongodb className="text-emerald-700" /> },
  { name: "Prisma", icon: <SiPrisma className="text-black dark:text-white" /> },
];

const projects = [
  {
    title: "سیستم مدیریت مالی",
    link: "/financial",
  },
  {
    title: "چت‌اپ ریل‌تایم",
    link: "/chat",
  },
  {
    title: "سیستم مدیریت تسک",
    link: "/task",
  },
  {
    title: "بازیه پرسش و پاسخ",
    link: "/quiz",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-10 text-center max-w-screen-lg mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/images/my-photo.jpg"
          width={100}
          height={100}
          alt="avatar"
          className="w-24 h-24 rounded-full border shadow-lg object-cover"
        />
        <h1 className="text-2xl md:text-3xl font-bold mt-4">
          محمدرضا عباس‌زاده
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          توسعه‌دهنده فول‌استک
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 z-40 bg-background border-y py-2 mb-6">
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="w-full justify-center gap-2 p-2">
            <Link href="#specs" className="w-full">
              <TabsTrigger value="specs" className="text-sm w-full">
                اطلاعات من
              </TabsTrigger>
            </Link>
            <Link href="#projects" className="w-full">
              <TabsTrigger value="projects" className="text-sm w-full">
                نمونه‌کارها
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </div>

      {/* Section: About */}
      <section id="specs" className="text-right mb-10">
        <h2 className="font-bold mb-4 text-lg md:text-xl">🧾 درباره من</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          من یک توسعه‌دهنده فول‌استک با حدود ۳ سال تجربه در توسعه وب هستم.
          تمرکزم روی ساخت اپلیکیشن‌ها با استفاده از ابزارهای مدرن مانند Next.js،
          Nest.js و Socket.io است. به کدنویسی تمیز و طراحی تجربه کاربری اهمیت
          زیادی می‌دهم و علاقه‌مند به یادگیری تکنولوژی‌های جدید هستم.
        </p>
      </section>

      {/* Section: Skills */}
      <section className="text-right mb-10">
        <h2 className="font-bold mb-4 text-lg md:text-xl">
          💡 مهارت‌ها و تکنولوژی‌ها
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
          {skillItems.map(({ name, icon }) => (
            <li key={name} className="flex items-center gap-2">
              {icon}
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Contact */}
      <section className="text-right mb-10">
        <h2 className="font-bold mb-4 text-lg md:text-xl">📞 اطلاعات تماس</h2>
        <ul className="text-sm md:text-base text-muted-foreground space-y-2">
          <li>
            <strong>شماره تماس:</strong> ۰۹۱۱۳۱۸۵۱۳۷
          </li>
          <li>
            <strong>گیت‌هاب:</strong>{" "}
            <a
              href="https://github.com/mas8022"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              github.com/mas8022
            </a>
          </li>
        </ul>
      </section>

      <section id="projects" className="text-right">
        <h2 className="font-bold mb-4 text-lg">🧩 نمونه‌کارها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              dir="rtl"
              key={project.title}
              href={project.link}
              className="rounded-2xl border p-4 shadow-sm hover:shadow-lg transition duration-200 bg-card text-left flex flex-col"
            >
              <h3 className="font-semibold text-base self-start">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-2">مشاهده پروژه</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
