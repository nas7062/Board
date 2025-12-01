export interface Ipayment {
  paymentCode: string;
  mchtCode: string;
  amount: number;
  currency: string;
  payType: "DEVICE" | "MOBILE" | "ONLINE" | "BILLING" | "VACT";
  status: "PENDING" | "SUCCESS" | "CANCELLED" | "FAILED";
  paymentAt: string;
}
export interface ImerchantsDetail {
  mchtCode: string;
  mchtName: string;
  status: "READY" | "ACTIVE" | "INACTIVE" | "CLOSED";
  bizType: "CAFE" | "SHOP" | "MART" | "APP" | "TRAVEL" | "EDU" | "TEST";
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}
