import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MerchantFilter {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  bizTypeFilter: string;
  setBizTypeFilter: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export default function MerchantFilter({
  searchTerm,
  setSearchTerm,
  bizTypeFilter,
  setBizTypeFilter,
  statusFilter,
  setStatusFilter,
}: MerchantFilter) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end ">
      <div className="flex-1">
        <label className="text-sm text-gray-600 mb-2 block">검색</label>
        <div className="relative w-full ">
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            placeholder="가맹점명 검색"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="px-6 py-1 w-full border border-gray-200 focus:border-gray-500 rounded-md"
          />
        </div>
      </div>
      <div className="w-full md:w-24">
        <Select value={bizTypeFilter} onValueChange={setBizTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="CAFE">카페</SelectItem>
            <SelectItem value="SHOP">쇼핑몰</SelectItem>
            <SelectItem value="MART">마트</SelectItem>
            <SelectItem value="APP">어플</SelectItem>
            <SelectItem value="TRAVEL">예약</SelectItem>
            <SelectItem value="EDU">강의</SelectItem>
            <SelectItem value="TEST">테스트</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-24">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="ACTIVE">활성</SelectItem>
            <SelectItem value="READY">준비</SelectItem>
            <SelectItem value="INACTIVE">비활성</SelectItem>
            <SelectItem value="CLOSED">폐기</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
