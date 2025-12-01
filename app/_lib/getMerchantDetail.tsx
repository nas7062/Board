import { BASE_URL } from "../util/constant";

export default async function getMerchantDetail() {
  try {
    const res = await fetch(`${BASE_URL}/merchants/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`PaymentList Request failed: ${res.status}`);
    }

    const data = await res.json();

    if (data?.status === 200 && data?.message === "success") {
      return data;
    } else {
      throw new Error(`API error: ${data?.message || "PaymentList error"}`);
    }
  } catch (error) {
    console.error("getAllPaymentList Error:", error);
    return null;
  }
}
