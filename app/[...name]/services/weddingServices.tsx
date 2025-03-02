import { apiClient } from "@/lib/apiClients";
import useSWR from "swr";
import { WeddingInterfaces } from "../interfaces/weddingInterfaces";

export const useGetWeddingServices = (filters: Record<string, string> = {}) => {
  const query = new URLSearchParams(filters).toString();
  const { data, error, isLoading } = useSWR<WeddingInterfaces[]>(
    `/weddings?${query}`,
    (url: string) => apiClient.get<WeddingInterfaces[]>(url).then((res) => res)
  );
  return {
    data,
    isLoading,
    error,
    findByUrl: (url: string) => {
      return Array.isArray(data)
        ? data.find((wedding: any) => wedding.url === url)
        : null;
    },
  };
};
