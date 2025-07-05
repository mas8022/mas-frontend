"use client";

import { useState } from "react";
import { Home, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Fetch from "@/utils/axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function BottomBar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { status, message } = await Fetch.delete("/auth");

      if (status > 201) {
        toast.error(message);
        return;
      }

      await fetch("/api/auth", {
        method: "DELETE",
        credentials: "include",
      });

      toast.success(message);

      setOpen(false);
      location.pathname = "/auth";
    } catch (error) {
      toast.error("خطا در خروج از حساب");
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-md md:hidden">
        <div className="flex justify-around items-center h-14 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link href={"/"}>
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="text-right bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-border shadow-xl rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base font-bold">
                  آیا مطمئن هستید؟
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-muted-foreground dark:text-zinc-400 mt-1">
                  با خروج، اطلاعات ورود شما حذف خواهد شد
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex-row-reverse gap-2 justify-end mt-4">
                <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80">
                  انصراف
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  خروج
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
