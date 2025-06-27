"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Fetch from "@/utils/axios";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);
  const [messages, setMessages] = useLocalStorage("my-ai-chat", []);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await Fetch.post("/ai", { messages: newMessages });
      if (res.status > 201) throw new Error();

      setMessages([...newMessages, { role: "assistant", content: res.data }]);
      setInput("");
    } catch (err) {
      toast.error("خطا در ارسال پیام");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-4 pb-20 flex flex-col items-center gap-4 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-black dark:via-neutral-900 dark:to-black transition-colors">
      <div className="w-full h-full max-w-3xl overflow-y-auto flex flex-col gap-4 px-2 hidden-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 dark:text-gray-500 mt-8">
            هنوز پیامی ارسال نشده است
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full flex ${
                msg.role === "user" ? "justify-start" : "justify-end text-right"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[80%]"
              >
                <Card
                  className={`${
                    msg.role === "user"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : "bg-white/30 dark:bg-white/10 border border-white/20"
                  } shadow-md backdrop-blur-md`}
                >
                  <CardContent
                    dir={msg.role === "user" ? "rtl" : "ltr"}
                    className="p-3 text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100 whitespace-pre-line"
                  >
                    {msg.content}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))
        )}

        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-start"
          >
            <DotLoader size={30} color="#fff" />
          </motion.div>
        )}

        <div ref={endOfMessagesRef} />
      </div>

      <div className="w-full flex flex-col gap-2 items-center max-w-3xl">
        <div className="w-full flex items-center gap-2">
          <Input
            dir="rtl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="سؤال خود را بپرسید..."
            className="text-right dark:bg-neutral-800 dark:text-white shadow-md"
          />
          <Button onClick={handleSend} disabled={loading} className="px-6">
            {loading ? <DotLoader size={20} color="#fff" /> : "ارسال"}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setMessages([])}
          className="w-full text-sm px-4"
        >
          شروع چت جدید
        </Button>
      </div>
    </div>
  );
}
