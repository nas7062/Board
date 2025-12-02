import { useQuery } from "@tanstack/react-query";
import getAllPaymentList from "@/app/_lib/getAllPaymentList";

export function usePaymentList() {
  return useQuery({
    queryKey: ["paymentList"],
    queryFn: getAllPaymentList,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
