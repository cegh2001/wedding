import { apiClient } from "@/lib/apiClients";
import useSWR from "swr";
import { WeddingInterfaces } from "../interfaces/weddingInterfaces";
import { useState } from "react";
import { BodyPostWedding } from "@/components/attendance-section";

export const useGetWeddingServices = (filters: Record<string, string> = {}) => {
  const query = new URLSearchParams(filters).toString();
  const { data, error, isLoading,mutate } = useSWR<WeddingInterfaces[]>(
    `/weddings?${query}`,
    (url: string) => apiClient.get<WeddingInterfaces[]>(url).then((res) => res)
  );
  return {
    data,
    isLoading,
    error,
    mutate,
    findByUrl: (url: string) => {
      return Array.isArray(data)
        ? data.find((wedding: any) => wedding.url === url)
        : null;
    },
  };
};

export const usePostWeddingService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const postWedding = async (weddingData: BodyPostWedding) => {
    setIsLoading(true);
    return apiClient.post<WeddingInterfaces>("/weddings", weddingData);
  };

  return {
    postWedding,
    isLoading,
    setIsLoadingPost: setIsLoading,
  };
};
