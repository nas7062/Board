import { BASE_URL } from "../util/constant";
import { ImerchantsDetail } from "../util/type";

export type merchantDetailResponse = {
  status: number;
  message: string;
  data: ImerchantsDetail[];
};

export default async function getMerchantDetail(): Promise<merchantDetailResponse> {
  const res = await fetch(`${BASE_URL}/merchants/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`PaymentList Request failed: ${res.status}`);
  }

  const data = await res.json();

  if (data?.status === 200 && data?.message === "success") {
    return data;
  }

  throw new Error(`API error: ${data?.message || "PaymentList error"}`);
}
