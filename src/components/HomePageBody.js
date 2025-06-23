"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import axios from "axios";

export default function HomePageBody() {
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  const addTask = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_NAME}/tasks`, content, {
      withCredentials: true,
    });
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <main className="w-full">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
        ✨ Modern ToDo App
      </h1>

      <div className="flex gap-3 mb-8">
        <Input
          placeholder="Add a new task..."
          className="flex-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={addTask} className="gap-1">
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="shadow-md hover:shadow-lg transition-all duration-200 border border-muted bg-background/70 backdrop-blur-sm"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <Label
                  className={`text-base ${
                    task.done ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.text}
                </Label>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-muted-foreground italic">
            No tasks yet. Add something 🔥
          </p>
        )}
      </div>
    </main>
  );
}
