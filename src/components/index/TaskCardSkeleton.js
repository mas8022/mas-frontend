"use client";

import { Card } from "@/components/ui/card";

export default function TaskCardSkeleton() {
  return (
    <Card className="p-4 space-y-2 relative overflow-hidden animate-pulse dark:bg-gradient-to-br from-zinc-800 to-zinc-950">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted" />
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
        <div className="h-3 w-20 bg-muted rounded" />
      </div>

      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-5/6 bg-muted rounded" />
      <div className="h-3 w-24 bg-muted rounded" />

      <div className="flex gap-2 mt-2">
        <div className="h-8 w-20 bg-muted rounded-md" />
        <div className="h-8 w-20 bg-muted rounded-md" />
        <div className="h-8 w-20 bg-muted rounded-md" />
      </div>
    </Card>
  );
}
