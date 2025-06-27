"use client";
import { useEffect, useState } from "react";
import {
  IsRestoringProvider,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const localStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });
    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
      maxAge: 1000 * 60 * 60,
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
