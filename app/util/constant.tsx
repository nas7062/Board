export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const PAYMENT_METHOD_LABELS = {
  DEVICE: "단말기",
  MOBILE: "모바일",
  ONLINE: "온라인",
  BILLING: "정기결제",
  VACT: "가상계좌",
};

export const PAYMENT_TYPE_COLORS = {
  DEVICE: "#3b82f6",
  MOBILE: "#10b981",
  ONLINE: "#8b5cf6",
  BILLING: "#f59e0b",
  VACT: "#c417bb",
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value);
};

export const PAYMENT_STATUS = {
  PENDING: "결제 대기",
  SUCCESS: "결제 완료",
  CANCELLED: "환불 완료",
  FAILED: "결제 실패",
};
