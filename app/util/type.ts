export interface Ipayment {
  paymentCode: string;
  mchtCode: string;
  amount: number;
  currency: string;
  payType: "DEVICE" | "MOBILE" | "ONLINE" | "BILLING" | "VACT";
  status: "PENDING" | "SUCCESS" | "CANCELLED" | "FAILED";
  paymentAt: string;
}
