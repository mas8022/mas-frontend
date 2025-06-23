import Fetch from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

const useGetQuestions = (category) => {
  const fetcher = async () => await Fetch.get(`/quiz/${category}`);

  const { data } = useQuery({
    queryKey: ["my-offline-questions"],
    queryFn: fetcher,
  });

  return { data };
};

export default useGetQuestions;
