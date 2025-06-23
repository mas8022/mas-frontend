import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Card } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import secretFetch from "@/utils/fetchers/secretFetch";
import toast from "react-hot-toast";

const TaskCard = ({ task, setEditId, setValue }) => {
  const queryClient = useQueryClient();

  const editTask = (task) => {
    setEditId(task.id);
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("date", task.date);
    setValue("priority", task.priority);
    scrollTo(0, 0);
  };

  const removeTaskFetcher = async (id) => {
    try {
      const { status, message } = await secretFetch.delete(`/tasks/${id}`);
      status > 201 ? toast.error(message) : toast.success(message);
    } catch (error) {
      toast.error("اینترنت خود را بررسی کنید'");
      throw error;
    }
  };

  const { mutate: removeTask } = useMutation({
    mutationFn: removeTaskFetcher,
    onMutate: async (id) => {
      await queryClient.cancelQueries(["my-tasks"]);
      const perviousData = await queryClient.getQueryData(["my-tasks"]);

      await queryClient.setQueryData(["my-tasks"], (old) => {
        return {
          ...old,
          data: old.data.filter((item) => item.id !== id),
        };
      });

      return { perviousData };
    },
    onError: (error, variable, context) => {
      queryClient.setQueryData(["my-tasks"], context.perviousData);
      toast.error("حذف انجام نشد، دوباره تلاش کنید");
    },
    onSettled: () => {
      queryClient.refetchQueries(["my-tasks"]);
    },
  });

  const toggleDoneFetcher = async (id) => {
    try {
      const { status, message } = await secretFetch.patch(`/tasks/${id}`);

      status > 201 ? toast.error(message) : toast.success(message);
    } catch (error) {
      toast.error("اینترنت خود را بررسی کنید");
      throw error;
    }
  };

  const { mutate: toggleDone } = useMutation({
    mutationFn: toggleDoneFetcher,

    onMutate: async (id, done) => {
      await queryClient.cancelQueries(["my-tasks"]);

      const previousData = queryClient.getQueriesData(["my-tasks"]);

      queryClient.setQueryData(["my-tasks"], (old) => {
        return {
          ...old,
          data: old.data.map((item) =>
            item.id === id ? { ...item, done: !done } : item
          ),
        };
      });

      return { previousData };
    },

    onError: (error, id, context) => {
      queryClient.setQueryData(["my-tasks"], context.previousData);
      toast.error("تغییر وضعیت انجام کار انجام نشد، دوباره تلاش کنید");
    },

    onSettled: () => {
      queryClient.refetchQueries(["my-tasks"]);
    },
  });

  return (
    <Card
      className={`p-4 space-y-2 transition-all duration-300 relative overflow-hidden 
    ${
      task.done
        ? "border-green-500 ring-1 ring-green-400/50 bg-green-50 dark:bg-green-900/20"
        : "dark:!bg-gradient-to-br from-zinc-800 to-zinc-950"
    }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {task.done && (
            <CheckCircle
              className="text-green-600 animate-in fade-in zoom-in-95"
              size={20}
            />
          )}
          <h2
            className={`font-bold ${
              task.done ? "line-through text-green-700 dark:text-green-300" : ""
            }`}
          >
            {task.title}
          </h2>
        </div>
        <span className="text-sm text-gray-500">{task.date}</span>
      </div>

      <p className={task.done ? "line-through opacity-60" : ""}>
        {task.description}
      </p>
      <p className="text-sm">اولویت: {task.priority}</p>

      <div className="flex gap-2 mt-2">
        <Button size="sm" onClick={() => toggleDone(task.id)}>
          {task.done ? "برگرداندن" : "انجام شد"}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => editTask(task)}>
          ویرایش
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => removeTask(task.id)}
        >
          حذف
        </Button>
      </div>
    </Card>
  );
};

export default TaskCard;
