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
import { TrendingDown, Minus, Tag, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import secretFetch from "@/utils/fetchers/secretFetch";
import toast from "react-hot-toast";
import { ExpenseCategoryGrid } from "./ExpenseCategoryGrid";

export function ExpenseForm() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const onSubmit = async (data) => {
    const amountNum = Number(data.amount);
    if (!amountNum || !data.category) {
      return toast.error("لطفاً مبلغ و دسته‌بندی را انتخاب کنید");
    }

    try {
      const res = await secretFetch.post("/financial/expense", {
        amount: amountNum,
        category: data.category,
      });

      if (res.status > 201) {
        toast.error(res.message || "خطا در ثبت هزینه");
      } else {
        toast.success(res.message || "هزینه با موفقیت ثبت شد");
        reset();
      }
    } catch (error) {
      toast.error("خطا در ثبت هزینه");
    }
  };

  const amount = Number(watch("amount")).toLocaleString("fa-IR");

  return (
    <Card dir="rtl" className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg p-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingDown className="h-6 w-6" />
          ثبت هزینه جدید
        </CardTitle>
        <CardDescription className="text-red-100">
          اطلاعات هزینه خود را با دقت وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid md:grid-cols-2 gap-6 mb-5">
            <div className="space-y-2">
              <Label
                htmlFor="expense-amount"
                className="flex items-center gap-2 text-base font-medium"
              >
                <Tag className="h-4 w-4 text-red-600" />
                مبلغ هزینه (تومان)
              </Label>
              <Input
                {...register("amount")}
                id="expense-amount"
                type="number"
                placeholder="مثال: 2000000"
                className="text-right h-12 text-lg border-2 focus:border-red-500"
              />
              <span className="text-sm text-muted-foreground">
                <span>{amount} تومان</span>
              </span>
            </div>
          </div>

          <div className="w-full space-y-2 mb-6">
            <Label className="flex items-center gap-2 text-base font-medium">
              <FileText className="h-4 w-4 text-red-600" />
              دسته‌بندی هزینه
            </Label>
            <ExpenseCategoryGrid
              selectedCategory={watch("category")}
              onCategorySelect={(value) => setValue("category", value)}
            />
          </div>

          <Button className="w-full flex-1 bg-red-600 hover:bg-red-700 h-12 text-lg text-white">
            <Minus className="h-5 w-5 mr-2" />
            ثبت هزینه
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
