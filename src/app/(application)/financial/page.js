import { AnalysisView } from "@/components/financial/analysis-view";
import { ExpenseForm } from "@/components/financial/expense-form";
import { IncomeForm } from "@/components/financial/income-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, TrendingDown, PieChart } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen p-4 pb-20 bg-gray-50 dark:bg-zinc-900 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-white dark:bg-zinc-800 rounded-full p-4 shadow-lg dark:shadow-none">
              <Calculator className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">داشبورد مالی</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              مدیریت کامل درآمد و هزینه‌های شما
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid gap-2 w-full grid-cols-3 h-14 bg-white dark:bg-zinc-800 shadow-lg dark:shadow-none rounded-xl p-1">
            <TabsTrigger
              value="income"
              className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-100 data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-none transition-all duration-200"
            >
              <TrendingUp className="h-5 w-5 sm:block hidden" />
              ورودی مالی
            </TabsTrigger>
            <TabsTrigger
              value="expense"
              className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-100 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-none transition-all duration-200"
            >
              <TrendingDown className="h-5 w-5 sm:block hidden" />
              خروجی مالی
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:data-[state=active]:shadow-none transition-all duration-200"
            >
              <PieChart className="h-5 w-5 sm:block hidden" />
              تحلیل مالی
            </TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="mt-6">
            <IncomeForm />
          </TabsContent>

          <TabsContent value="expense" className="mt-6">
            <ExpenseForm />
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <AnalysisView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
