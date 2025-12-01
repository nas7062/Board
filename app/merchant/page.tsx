"use client";

import { Badge, CreditCard, DollarSign, Percent, Search } from "lucide-react";
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
import {
  MERCHANT_STATUS_COLORS,
  MERCHANT_STATUS_LABELS,
  STATUS_COLORS,
  STATUS_LABLES,
} from "../util/constant";
import clsx from "clsx";

export default function MerchantPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [merchants, setMerchants] = useState<ImerchantsDetail[]>([]);
  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesSearch =
        merchant.mchtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || merchant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [merchants, searchTerm, statusFilter]);

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
  return (
    <div className="space-y-6 flex flex-col">
      <div className="grid gap-4 md:grid-cols-3">
        <BoardCard title="일주일간 거래액" Icon={DollarSign} value={""} />
        <BoardCard title="총 거래 건수" Icon={CreditCard} value={""} />
        <BoardCard title="승인율" Icon={Percent} value={""} />
      </div>
      <div>
        <div>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>가맹점 목록</CardTitle>
              <CardDescription>
                등록된 가맹점을 조회하고 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 필터 영역 */}
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      placeholder="가맹점ID, 가맹점명, 업종 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="w-full md:w-48">
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
              <div className="border rounded-lg overflow-hidden">
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
                          onClick={() => setSelectedMerchant(merchant.mchtCode)}
                        >
                          <TableCell className="font-mono text-sm">
                            {merchant.mchtCode}
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {merchant.mchtName}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {merchant.bizType}
                          </TableCell>
                          <TableCell>
                            <div
                              className={clsx(
                                STATUS_LABLES[merchant.status] === "활성" &&
                                  "text-green-500",
                                STATUS_LABLES[merchant.status] === "폐기" &&
                                  "text-red-500",
                                STATUS_LABLES[merchant.status] === "중지" &&
                                  "text-red-500"
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
        </div>
      </div>
    </div>
  );
}
