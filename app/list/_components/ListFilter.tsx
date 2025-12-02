import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ListFilter {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  paymentMethodFilter: string;
  setPaymentMethodFilter: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export default function ListFilter({
  searchTerm,
  setSearchTerm,
  paymentMethodFilter,
  setPaymentMethodFilter,
  statusFilter,
  setStatusFilter,
}: ListFilter) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end ">
      <div className="flex-1">
        <label className="text-sm text-gray-600 mb-2 block">검색</label>
        <div className="relative w-full ">
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="가맹점명 검색 "
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="px-6 py-1 w-full border border-gray-200 focus:border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full md:w-24 ">
        <label className="text-sm text-gray-600 mb-2 block">결제수단</label>
        <Select
          value={paymentMethodFilter}
          onValueChange={(value) => {
            setPaymentMethodFilter(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="DEVICE">단말기</SelectItem>
            <SelectItem value="MOBILE">모바일</SelectItem>
            <SelectItem value="ONLINE">온라인</SelectItem>
            <SelectItem value="BILLING">정기결제</SelectItem>
            <SelectItem value="VACT">가상계좌</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-24">
        <label className="text-sm text-gray-600 mb-2 block">상태</label>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="SUCCESS">결제 완료</SelectItem>
            <SelectItem value="PENDING">결제 대기</SelectItem>
            <SelectItem value="CANCELLED">환불 완료</SelectItem>
            <SelectItem value="FAILED">결제 실패</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
