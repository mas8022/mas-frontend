"use client";
import { Button } from "@/components/ui/button";

const Page = () => {
  const fetcher = () => {
    // socket.emit("createQuiz");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button onClick={fetcher}>click</Button>
    </div>
  );
};

export default Page;
