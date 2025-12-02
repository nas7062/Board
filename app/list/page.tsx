"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCurrency,
  MERCHANT_NAME_MAP,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS,
} from "../util/constant";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";

import clsx from "clsx";
import { usePaymentList } from "../hook/usePaymentList";
import ListFilter from "./_components/ListFilter";
export default function ListPage() {
  const { data, isLoading, isError, error } = usePaymentList();

  const payments = data?.data ?? [];
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");

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
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="md:block hidden">거래ID</TableHead>
                <TableHead>가맹점</TableHead>
                <TableHead className="sm:block hidden">결제수단</TableHead>
                <TableHead className="text-right">금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="sm:block hidden">거래일시</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    조회된 거래 내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payments) => (
                  <TableRow
                    key={payments.paymentCode}
                    className="hover:bg-gray-50  "
                  >
                    <TableCell className="font-mono text-sm md:block hidden">
                      {payments.paymentCode}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">
                          {MERCHANT_NAME_MAP[payments.mchtCode]}
                        </p>
                        <p className="text-xs text-gray-500">
                          {payments.mchtCode}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="sm:block hidden">
                      <div>
                        <p className="text-gray-900">
                          {PAYMENT_METHOD_LABELS[payments.payType]}
                        </p>
                        {payments.payType && (
                          <p className="text-xs text-gray-500">
                            {payments.payType}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={clsx(
                          payments.status === "SUCCESS" && "text-green-500",
                          payments.status === "FAILED" && "text-red-500"
                        )}
                      >
                        {formatCurrency(payments.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={clsx(
                          payments.status === "SUCCESS" &&
                            "bg-green-500 text-white",
                          payments.status === "FAILED" &&
                            "bg-red-500  text-white",
                          "py-1"
                        )}
                        variant="outline"
                      >
                        {PAYMENT_STATUS[payments.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 sm:block hidden">
                      {payments.paymentAt.split("T")[0]}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
