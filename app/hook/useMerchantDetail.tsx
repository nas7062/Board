import { useQuery } from "@tanstack/react-query";
import getMerchantDetail from "../_lib/getMerchantDetail";

export function useMerchantDetail() {
  return useQuery({
    queryKey: ["Merchant"],
    queryFn: getMerchantDetail,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
