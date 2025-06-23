"use client";
import { useDeferredValue, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import useGetContacts from "@/hooks/fetchers/useGetContacts";
import { Loader2, UserX } from "lucide-react";
import secretFetch from "@/utils/fetchers/secretFetch";

export default function ChatListPage() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [findUsers, setFindUsers] = useState([]);

  const { data, isPending } = useGetContacts();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!deferredSearch.trim()) {
          setFindUsers([]);
          return;
        }
        const data = await secretFetch.get(`/users/${deferredSearch}`);
        setFindUsers(data);
      } catch (err) {
        setFindUsers([]);
      }
    };

    fetchUsers();
  }, [deferredSearch]);

  return (
    <Card className="w-full max-w-95 rounded-2xl shadow-xl border-none mx-auto mt-10 mb-20">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Search Bar */}
        <Input
          placeholder="جستجوی کاربران..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        {/* List */}
        <ScrollArea className="flex-1 pr-2 space-y-6">
          {/* find users */}
          {findUsers.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm text-muted-foreground mb-2">
                کاربران پیدا شده
              </h3>
              <div className="flex flex-col gap-2">
                {findUsers.map((user) => (
                  <Link href={`/chat/${user.phone}`} key={user.id}>
                    <div className="bg-secondary px-4 py-3 rounded-xl flex justify-between items-center">
                      <p className="font-medium">{user.phone}</p>

                      <Button variant="ghost" size="sm">
                        شروع
                      </Button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* contacts with chat */}

          {isPending ? (
            <div className="w-full flex justify-center items-center py-10 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="ml-2 text-sm">در حال بارگذاری...</span>
            </div>
          ) : data?.data.length ? (
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">
                گفتگوهای فعال
              </h3>
              <div className="space-y-2">
                {data?.data.map((user) => (
                  <Link
                    href={`/chat/${user.contactPhone}`}
                    key={user.contactPhone}
                    className="bg-secondary px-4 py-3 rounded-xl flex justify-between items-center"
                  >
                    <p className="font-medium">{user.contactPhone}</p>

                    <Button variant="ghost" size="sm">
                      ادامه
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center py-16 text-center text-muted-foreground">
              <UserX className="w-10 h-10 mb-4" />
              <p className="text-sm">هیچ گفتگویی یافت نشد.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
