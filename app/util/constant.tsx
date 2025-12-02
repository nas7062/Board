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

export const MERCHANT_NAME_MAP: Record<string, string> = {
  "MCHT-CAFE-001": "브런치커피 강남점",
  "MCHT-CAFE-002": "브런치커피 판교점",
  "MCHT-CAFE-003": "브런치커피 홍대점",
  "MCHT-CAFE-004": "브런치커피 잠실점",
  "MCHT-CAFE-005": "브런치커피 부산서면점",
  "MCHT-CAFE-006": "브런치커피 대구동성로점",

  "MCHT-SHOP-001": "올페이즈 온라인몰",
  "MCHT-SHOP-002": "올페이즈 디지털스토어",
  "MCHT-SHOP-003": "올페이즈 패션몰",
  "MCHT-SHOP-004": "올페이즈 리빙몰",
  "MCHT-SHOP-005": "올페이즈 뷰티몰",

  "MCHT-MART-001": "브런치 마트 서울역점",
  "MCHT-MART-002": "브런치 마트 송파점",
  "MCHT-MART-003": "브런치 마트 일산점",

  "MCHT-APP-001": "올페이즈 구독 앱",
  "MCHT-APP-002": "올페이즈 OTT 서비스",
  "MCHT-APP-003": "올페이즈 음악 서비스",

  "MCHT-TRAVEL-001": "올페이즈 항공 예약",
  "MCHT-TRAVEL-002": "올페이즈 호텔 예약",
  "MCHT-TRAVEL-003": "올페이즈 렌터카 예약",

  "MCHT-EDU-001": "올페이즈 온라인 강의",
  "MCHT-EDU-002": "올페이즈 코딩 캠프",

  "MCHT-TEST-001": "테스트 가맹점 A",
  "MCHT-TEST-002": "테스트 가맹점 B",
};

export const MERCHANT_STATUS_LABELS = {
  CAFE: "카페",
  SHOP: "쇼핑몰",
  MART: "마트",
  APP: "어플",
  TRAVEL: "예약",
  EDU: "강의",
  TEST: "테스트",
};

export const MERCHANT_STATUS_COLORS = {
  CAFE: "#3b82f6",
  SHOP: "#10b981",
  MART: "#8b5cf6",
  APP: "#f59e0b",
  TRAVEL: "#c417bb",
  EDU: "#b6cc3a",
  TEST: "#8317e9",
};

export const STATUS_LABLES = {
  READY: "대기",
  ACTIVE: "활성",
  INACTIVE: "중지",
  CLOSED: "폐기",
};

export const STATUS_COLORS = {
  READY: "#f59e0b",
  ACTIVE: "#c417bb",
  INACTIVE: "#b6cc3a",
  CLOSED: "#8317e9",
};

{
  /*api 주소*/
}

export const PAYMENT_LIST = "/payments/list";
export const MERCHANT_DETAIL = "/merchants/details";
