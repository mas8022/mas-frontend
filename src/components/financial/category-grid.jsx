"use client";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  TrendingUp,
  Laptop,
  Gift,
  Home,
  Car,
  ShoppingBag,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react";

const categories = [
  { id: "حقوق", name: "حقوق", icon: Briefcase },
  { id: "کسب‌وکار", name: "کسب‌وکار", icon: TrendingUp },
  { id: "کار آزاد", name: "کار آزاد", icon: Laptop },
  { id: "هدیه", name: "هدیه", icon: Gift },
  { id: "اجاره", name: "اجاره", icon: Home },
  { id: "حمل‌ونقل", name: "حمل‌ونقل", icon: Car },
  { id: "فروش", name: "فروش", icon: ShoppingBag },
  { id: "سرمایه‌گذاری", name: "سرمایه‌گذاری", icon: Gamepad2 },
  { id: "سایر", name: "سایر", icon: MoreHorizontal },
];

export function CategoryGrid({ selectedCategory, onCategorySelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <Button
            key={category.id}
            type={"button"}
            variant={isSelected ? "default" : "outline"}
            className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
              isSelected
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105"
                : "hover:bg-green-50 hover:border-green-300"
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <Icon
              className={`h-6 w-6 ${
                isSelected ? "!text-white" : "text-green-600"
              }`}
            />
            <span
              className={`text-sm font-medium dark:text-white/50 ${
                isSelected ? "!text-white" : "text-gray-700"
              }`}
            >
              {category.name}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
