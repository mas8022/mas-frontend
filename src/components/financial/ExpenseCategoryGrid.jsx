"use client";
import {
  Utensils,
  Truck,
  Home,
  Droplet,
  Smile,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";

const expenseCategories = [
  { id: "خوراک", name: "خوراک", icon: Utensils },
  { id: "حمل‌ و نقل", name: "حمل‌ و نقل", icon: Truck },
  { id: "مسکن", name: "مسکن", icon: Home },
  { id: "آب، برق، گاز", name: "آب، برق، گاز", icon: Droplet },
  { id: "تفریح", name: "تفریح", icon: Smile },
  { id: "بهداشت و درمان", name: "بهداشت", icon: HeartPulse },
  { id: "آموزش", name: "آموزش", icon: GraduationCap },
  { id: "سایر", name: "سایر", icon: MoreHorizontal },
];

export function ExpenseCategoryGrid({ selectedCategory, onCategorySelect }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {expenseCategories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <>
            <Button
              key={category.id}
              type={"button"}
              variant={isSelected ? "default" : "outline"}
              className={`h-20 flex flex-col gap-2 transition-all duration-200 ${
                isSelected
                  ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg scale-105"
                  : "hover:bg-rose-50 hover:border-rose-300"
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <Icon
                className={`h-6 w-6 ${
                  isSelected ? "text-white" : "text-rose-600"
                }`}
              />
              <span
                className={`text-sm font-medium text-white/50 ${
                  isSelected ? "!text-white" : "text-gray-700"
                }`}
              >
                {category.name}
              </span>
            </Button>
          </>
        );
      })}
    </div>
  );
}
