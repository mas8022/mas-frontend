"use client";
import secretFetch from "@/utils/fetchers/secretFetch";
import { useQuery } from "@tanstack/react-query";

const useGetMeAnalytics = () => {
  const fetcher = async () => await secretFetch.get("/financial/analytics");

  const { data, isPending } = useQuery({
    queryKey: ["my-financial-analytics"],
    queryFn: fetcher,
  });

  return { data, isPending };
};

export default useGetMeAnalytics;
