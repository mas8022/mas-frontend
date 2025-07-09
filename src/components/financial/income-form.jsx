"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Plus, Tag, FileText } from "lucide-react";
import toast from "react-hot-toast";
import secretFetch from "@/utils/fetchers/secretFetch";
import { useForm, Controller } from "react-hook-form";
import { CategoryGrid } from "./category-grid";

export function IncomeForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      category: "",
    },
  });

  const amount = Number(watch("amount")).toLocaleString("fa-IR");

  const onSubmit = async (data) => {
    const amountNum = Number(data.amount);
    if (!amountNum || !data.category) {
      return toast.error("لطفاً مبلغ و دسته‌بندی را انتخاب کنید");
    }

    try {
      const res = await secretFetch.post("/financial/income", {
        amount: amountNum,
        category: data.category,
      });

      if (res.status > 201) {
        toast.error(res.message || "خطا در ثبت درآمد");
      } else {
        toast.success(res.message || "درآمد با موفقیت ثبت شد");
        reset();
      }
    } catch (error) {
      toast.error("خطا در ثبت درآمد");
    }
  };

  return (
    <Card
      dir="rtl"
      className="shadow-lg border-0 bg-white dark:bg-zinc-900 text-black dark:text-white"
    >
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-700 dark:to-green-800 text-white rounded-t-lg p-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="h-6 w-6" />
          ثبت درآمد جدید
        </CardTitle>
        <CardDescription className="text-green-100 dark:text-green-200">
          اطلاعات درآمد خود را با دقت وارد کنید
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="p-6 space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label
              htmlFor="income-amount"
              className="flex items-center gap-2 text-base font-medium"
            >
              <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
              مبلغ درآمد (تومان)
            </Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="مثال: 5000000"
              {...register("amount", { required: true, min: 1 })}
              className={`text-right h-12 text-lg border-2 ${
                errors.amount
                  ? "border-red-500 focus:border-red-600"
                  : "border-green-300 focus:border-green-500"
              } dark:border-green-700 dark:focus:border-green-400 bg-white dark:bg-zinc-800 text-black dark:text-white`}
            />
            {errors.amount && (
              <p className="text-xs text-red-500">لطفاً مبلغ معتبر وارد کنید</p>
            )}
            <span className="text-sm text-muted-foreground">
              <span>{amount} تومان</span>
            </span>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-medium">
              <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
              دسته‌بندی درآمد
            </Label>
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <CategoryGrid
                  selectedCategory={field.value}
                  onCategorySelect={field.onChange}
                />
              )}
            />
            {errors.category && (
              <p className="text-xs text-red-500">
                لطفاً یک دسته‌بندی انتخاب کنید
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 h-12 text-lg text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            ثبت درآمد
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
