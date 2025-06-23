"use client";
import { useState } from "react";
import useGetTasks from "@/hooks/fetchers/useGetTasks";
import TaskCard from "@/components/index/TaskCard";
import TaskCardSkeleton from "@/components/index/TaskCardSkeleton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import secretFetch from "@/utils/fetchers/secretFetch";
import { useQueryClient } from "@tanstack/react-query";

const taskSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
  date: z.string().min(1, "تاریخ الزامی است"),
  priority: z.enum(["کم", "متوسط", "زیاد"]),
});

export default function Page() {
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);

  const { data: tasks, isPending } = useGetTasks();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      priority: "متوسط",
    },
  });

  const priority = watch("priority");

  const onSubmit = async (data) => {
    const taskData = { ...data, done: false };

    try {
      if (editId) {
        const { status, message } = await secretFetch.put(
          `/tasks/${editId}`,
          taskData
        );
        status > 201 ? toast.error(message) : toast.success(message);
      } else {
        const { status, message } = await secretFetch.post("/tasks", taskData);
        status > 201 ? toast.error(message) : toast.success(message);
      }

      reset();
      setEditId(null);
      queryClient.refetchQueries(["my-tasks"]);
    } catch (err) {
      toast.error("اینترنت خود را بررسی کنید");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 pb-20 rtl text-right space-y-6">
      <h1 className="text-2xl font-bold">مدیریت وظایف</h1>
      <Card className="p-4 space-y-4 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* عنوان */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">عنوان</Label>
            <Input id="title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* توضیحات */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea id="description" {...register("description")} />
          </div>

          {/* تاریخ */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="date">تاریخ</Label>
            <Input type="date" id="date" {...register("date")} />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
          </div>

          {/* اولویت */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="priority">اولویت</Label>
            <Select
              value={priority}
              onValueChange={(val) => setValue("priority", val)}
            >
              <SelectTrigger id="priority" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="کم">کم</SelectItem>
                <SelectItem value="متوسط">متوسط</SelectItem>
                <SelectItem value="زیاد">زیاد</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-500">{errors.priority.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {editId ? "ویرایش وظیفه" : "افزودن وظیفه"}
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        {isPending ? (
          <TaskCardSkeleton />
        ) : (
          tasks?.data?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              setEditId={setEditId}
              setValue={setValue}
            />
          ))
        )}
      </div>
    </div>
  );
}
