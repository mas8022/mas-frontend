"use client";

import secretFetch from "@/utils/fetchers/secretFetch";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const fetcher = async () => await secretFetch.get("/users/me");

  const { data, isPending } = useQuery({
    queryKey: ["my-data"],
    queryFn: fetcher,
  });

  return { data, isPending };
};

export default useGetMe;
