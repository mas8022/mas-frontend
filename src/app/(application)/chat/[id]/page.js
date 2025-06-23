"use client";
import { useState, useEffect, useRef, use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import Message from "@/components/chat/chat-room/Message";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ChatPage({ params }) {
  const { id: receiverPhone } = use(params);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(null);

  const bottomRef = useRef(null);

  const socket = useSocket("chat");

  useEffect(() => {
    if (!socket) return;

    socket.emit("get-messages", { receiverPhone });
    socket.on("get-messages", (res) => setMessages(res));

    return () => {
      socket.off("get-messages");
    };
  }, [socket]);

  useEffect(() => {
    const el = bottomRef.current;
    if (el) {
      el.scrollIntoView({ behavior: messages.length > 5 ? "smooth" : "auto" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", { message, receiverPhone });
    setMessage("");
  };

  const deleteMessage = async () => {
    socket.emit("delete-message", { id: modal });
    setMessages((prev) => prev.filter((m) => m.id !== modal));
    setModal(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-muted to-background px-4 py-10">
      <Card className="w-full max-w-md h-[80vh] flex flex-col rounded-3xl shadow-2xl border-none">
        <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
          <ScrollArea className="flex-1 overflow-y-auto pr-4 max-h-[calc(100%-60px)]">
            <div className="space-y-2 pb-2">
              {messages.map((msg) =>
                msg.receiver === receiverPhone ? (
                  <Message
                    mode="sender"
                    key={msg.id}
                    data={msg}
                    setModal={setModal}
                  />
                ) : (
                  <Message
                    mode="receiver"
                    key={msg.id}
                    data={msg}
                    setModal={setModal}
                  />
                )
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          {/* فرم ورودی پیام */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              onClick={sendMessage}
              size="icon"
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              <SendHorizonal className="h-4 w-4 dark:stroke-black" />
            </Button>
            <Input
              placeholder="پیام خود را بنویسید..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 rounded-full bg-accent"
            />
          </div>
        </CardContent>
      </Card>
      <Dialog open={!!modal} onOpenChange={() => setModal(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>حذف پیام</DialogTitle>
            <DialogDescription>
              آیا مطمئن هستید که می‌خواهید این پیام را حذف کنید؟ این عملیات قابل
              بازگشت نیست.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setModal(null)}
              className="rounded-full"
            >
              انصراف
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={deleteMessage}
            >
              حذف پیام
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
