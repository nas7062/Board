"use client";

import { useMemo, useState } from "react";
import { usePaymentList } from "../hook/usePaymentList";
import ListFilter from "./_components/ListFilter";
import ListTable from "./_components/ListTable";
import { MERCHANT_NAME_MAP } from "../util/constant";
import PageNation from "./_components/PageNation";
export default function ListPage() {
  const { data, isLoading, isError, error } = usePaymentList();

  const payments = data?.data ?? [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const filteredPayments = useMemo(() => {
    return payments.filter((transaction) => {
      const name = MERCHANT_NAME_MAP[transaction.mchtCode];
      const matchesSearch = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesPaymentMethod =
        paymentMethodFilter === "all" ||
        transaction.payType === paymentMethodFilter;

      return matchesSearch && matchesStatus && matchesPaymentMethod;
    });
  }, [payments, searchTerm, statusFilter, paymentMethodFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  if (isLoading) return <div>불러오는 중...</div>;
  if (isError) return <div>에러: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">거래 내역</h2>
        <p className="text-sm text-gray-500">
          전체 거래 내역을 조회하고 관리합니다.
        </p>
      </div>
      <ListFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">
          총 {filteredPayments.length}건의 거래 내역
        </h3>
        <ListTable payments={payments} paginatedPayments={paginatedPayments} />
        {totalPages > 1 && (
          <PageNation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
