"use client";

import {
  Calendar,
  CreditCard,
  DollarSign,
  Mail,
  Percent,
  Search,
  Store,
} from "lucide-react";
import BoardCard from "../_components/BoardCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import getMerchantDetail from "../_lib/getMerchantDetail";
import { ImerchantsDetail } from "../util/type";
import { MERCHANT_STATUS_LABELS, STATUS_LABLES } from "../util/constant";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import _ from "lodash";
export default function MerchantPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bizTypeFilter, setBizTypeFilter] = useState<string>("all");
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [merchants, setMerchants] = useState<ImerchantsDetail[]>([]);
  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesSearch =
        merchant.mchtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        MERCHANT_STATUS_LABELS[merchant.bizType].includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || merchant.status === statusFilter;
      const matchesBizType =
        bizTypeFilter === "all" || merchant.bizType === bizTypeFilter;

      return matchesSearch && matchesStatus && matchesBizType;
    });
  }, [merchants, searchTerm, statusFilter, bizTypeFilter]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMerchantDetail();
      if (data.status !== 200) {
        console.log("패치 실패");
      }
      setMerchants(data.data);
    };
    fetchData();
  }, []);
  const selectedMerchantData = selectedMerchant
    ? merchants.find((m) => m.bizNo === selectedMerchant)
    : null;

  const ActiveMerchantData = merchants
    ? merchants.filter((m) => m.status === "ACTIVE").length
    : null;
  const mostBizType = useMemo(() => {
    if (!merchants || merchants.length === 0) return null;

    const grouped = _.groupBy(merchants, (p: ImerchantsDetail) => p.bizType);

    const result = Object.entries(grouped).reduce((max, [bizType, items]) => {
      const count = items.length;
      if (!max || count > max.count) {
        return { bizType, count };
      }
      return max;
    }, null as null | { bizType: string; count: number });
    if (!result) return;
    const label =
      MERCHANT_STATUS_LABELS[
        result.bizType as keyof typeof MERCHANT_STATUS_LABELS
      ] ?? result.bizType;
    return {
      label,
      count: result.count,
    };
  }, [merchants]);
  return (
    <div className="space-y-6 flex flex-col">
      <div className="grid gap-4 md:grid-cols-3">
        <BoardCard
          title="전체 가맹점"
          Icon={DollarSign}
          value={`${merchants.length}개`}
        />
        <BoardCard
          title="활성 가맹점"
          Icon={CreditCard}
          value={`${ActiveMerchantData}개`}
        />
        <BoardCard
          title="최대 업종"
          Icon={Percent}
          value={mostBizType?.label}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 ">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>가맹점 목록</CardTitle>
            <CardDescription>
              등록된 가맹점을 조회하고 관리합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 필터 영역 */}
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

            {/* 결과 정보 */}
            <div className="text-sm text-gray-600">
              <p>총 {filteredMerchants.length}개의 가맹점</p>
            </div>

            {/* 테이블 */}
            <div className="border rounded-lg overflow-hidden ">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>가맹점ID</TableHead>
                    <TableHead>가맹점명</TableHead>
                    <TableHead>업종</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">이용날짜</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMerchants.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-8 text-gray-500"
                      >
                        조회된 가맹점이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMerchants.map((merchant) => (
                      <TableRow
                        key={merchant.mchtCode}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedMerchant === merchant.mchtCode
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => setSelectedMerchant(merchant.bizNo)}
                      >
                        <TableCell className="font-mono text-sm">
                          {merchant.mchtCode}
                        </TableCell>
                        <TableCell className="text-gray-900">
                          {merchant.mchtName}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {MERCHANT_STATUS_LABELS[merchant.bizType]}
                        </TableCell>
                        <TableCell>
                          <div
                            className={clsx(
                              STATUS_LABLES[merchant.status] === "활성" &&
                                "text-green-500",
                              STATUS_LABLES[merchant.status] === "폐기" &&
                                "text-red-500",
                              STATUS_LABLES[merchant.status] === "중지" &&
                                "text-red-500",
                              "font-semibold"
                            )}
                          >
                            {STATUS_LABLES[merchant.status]}
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-gray-900">
                          {merchant.updatedAt.split("T")[0]}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card className="max-h-1/2">
          <CardHeader>
            <CardTitle>가맹점 상세</CardTitle>
            <CardDescription>선택한 가맹점의 상세 정보</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMerchantData ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Store className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 truncate">
                      {selectedMerchantData.mchtName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedMerchantData.bizType}
                    </p>
                  </div>
                  <Badge
                    className={clsx(
                      selectedMerchantData.status === "ACTIVE" &&
                        "text-green-500",
                      selectedMerchantData.status === "INACTIVE" &&
                        "text-red-500",
                      selectedMerchantData.status === "CLOSED" &&
                        "text-red-500",
                      "py-1 px-3 border-gray-300 font-semibold"
                    )}
                    variant="outline"
                  >
                    {STATUS_LABLES[selectedMerchantData.status]}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="text-gray-600 w-24 shrink-0">가맹점 ID</div>
                    <div className="text-gray-900 font-mono">
                      {selectedMerchantData.mchtCode}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="text-gray-600 w-24 shrink-0">등록일</div>
                    <div className="text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedMerchantData.registeredAt.split("T")[0]}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="text-gray-600 w-24 shrink-0">연락처</div>
                    <div className="text-gray-900 flex items-center gap-2 break-all">
                      <Mail className="w-4 h-4 shrink-0" />
                      {selectedMerchantData.email}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm">
                    <div className="text-gray-600 w-24 shrink-0">번호</div>
                    <div className="text-gray-900">
                      {selectedMerchantData.phone}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">주소</span>
                      <span className="text-gray-900">
                        {selectedMerchantData.address}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">최근 거래일</span>
                      <span className="text-gray-900">
                        {selectedMerchantData.updatedAt.split("T")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Store className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500">가맹점을 선택하세요</p>
                <p className="text-sm text-gray-400 mt-1">
                  목록에서 가맹점을 클릭하면
                </p>
                <p className="text-sm text-gray-400">상세 정보가 표시됩니다</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
