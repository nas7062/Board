"use client";

import { ActivitySquare, Store } from "lucide-react";
import BoardCard from "../_components/BoardCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { ImerchantsDetail } from "../util/type";
import { MERCHANT_STATUS_LABELS } from "../util/constant";
import _ from "lodash";
import MerchantFilter from "./_components/MerchantFilter";
import MerchantTable from "./_components/MerchantTable";
import MerchantDetail from "./_components/MerchantDetail";
import { useMerchantDetail } from "../hook/useMerchantDetail";
export default function MerchantPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bizTypeFilter, setBizTypeFilter] = useState<string>("all");
  const [selectedMerchant, setSelectedMerchant] = useState<string>("");
  const { data, isLoading, isError, error } = useMerchantDetail();

  const merchants = data?.data ?? [];
  const filteredMerchants = useMemo(() => {
    if (!merchants) return;
    return merchants.filter((merchant) => {
      const matchesSearch =
        merchant.mchtName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merchant.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        MERCHANT_STATUS_LABELS[merchant.bizType]?.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || merchant.status === statusFilter;
      const matchesBizType =
        bizTypeFilter === "all" || merchant.bizType === bizTypeFilter;

      return matchesSearch && matchesStatus && matchesBizType;
    });
  }, [merchants, searchTerm, statusFilter, bizTypeFilter]);

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

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>에러: {(error as Error).message}</div>;
  if (!filteredMerchants || !merchants || !mostBizType) return;
  return (
    <div className="space-y-6 flex flex-col">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">가맹점</h2>
        <p className="text-sm text-gray-500">
          전체 가맹점을 조회하고 가맹점마다 상세 정보를 제공합니다.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <BoardCard
          title="전체 가맹점"
          Icon={Store}
          value={`${merchants.length}개`}
        />
        <BoardCard
          title="활성 가맹점"
          Icon={ActivitySquare}
          value={`${ActiveMerchantData}개`}
        />
        <BoardCard
          title="최대 업종"
          Icon={Store}
          value={mostBizType.label}
          descript={`전체 ${mostBizType?.count}%`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 ">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>가맹점 목록</CardTitle>
            <CardDescription>
              등록된 가맹점을 조회하고 관리합니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MerchantFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              bizTypeFilter={bizTypeFilter}
              setBizTypeFilter={setBizTypeFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
            {/* 결과 정보 */}
            <div className="text-sm text-gray-600">
              <p>총 {filteredMerchants.length}개의 가맹점</p>
            </div>

            {/* 테이블 */}
            <MerchantTable
              filteredMerchants={filteredMerchants}
              selectedMerchant={selectedMerchant}
              setSelectedMerchant={setSelectedMerchant}
            />
          </CardContent>
        </Card>
        <Card className="lg:max-h-1/2">
          <CardHeader>
            <CardTitle>가맹점 상세</CardTitle>
            <CardDescription>선택한 가맹점의 상세 정보</CardDescription>
            <MerchantDetail
              selectedMerchantData={
                selectedMerchantData ? selectedMerchantData : undefined
              }
            />
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
