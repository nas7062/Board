import { BASE_URL, PAYMENT_LIST } from "../util/constant";
import { Ipayment } from "../util/type";
export type PaymentListResponse = {
  status: number;
  message: string;
  data: Ipayment[];
};

export default async function getAllPaymentList(): Promise<PaymentListResponse> {
  const res = await fetch(`${BASE_URL}${PAYMENT_LIST}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`PaymentList Request failed: ${res.status}`);
  }

  const data: PaymentListResponse = await res.json();

  if (data?.status === 200 && data?.message === "success") {
    return data;
  }

  throw new Error(`API error: ${data?.message || "PaymentList error"}`);
}
