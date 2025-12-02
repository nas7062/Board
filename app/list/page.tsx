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
import { useEffect, useMemo, useState } from "react";
import { Ipayment } from "../util/type";
import getAllPaymentList from "../_lib/getAllPaymentList";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
export default function ListPage() {
  const [payments, setPayments] = useState<Ipayment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>("all");

  const filteredTransactions = useMemo(() => {
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPaymentList();
      if (data.status !== 200) {
        console.log("패치 실패");
      }
      setPayments(data.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-semibold">거래 내역</h2>
        <p className="text-gray-500">전체 거래 내역을 조회하고 관리합니다.</p>
      </div>
      {/* 필터 영역 */}
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
      <div>
        <h3>총 100건의 거래 내역</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>거래ID</TableHead>
                <TableHead>가맹점</TableHead>
                <TableHead>결제수단</TableHead>
                <TableHead className="text-right">금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>거래일시</TableHead>
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
                filteredTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.paymentCode}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-mono text-sm">
                      {transaction.paymentCode}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">
                          {MERCHANT_NAME_MAP[transaction.mchtCode]}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.mchtCode}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="text-gray-900">
                          {PAYMENT_METHOD_LABELS[transaction.payType]}
                        </p>
                        {transaction.payType && (
                          <p className="text-xs text-gray-500">
                            {transaction.payType}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={clsx(
                          transaction.status === "SUCCESS" && "text-green-500",
                          transaction.status === "FAILED" && "text-red-500"
                        )}
                      >
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={clsx(
                          transaction.status === "SUCCESS" &&
                            "bg-green-500 text-white",
                          transaction.status === "FAILED" &&
                            "bg-red-500  text-white",
                          "py-1"
                        )}
                        variant="outline"
                      >
                        {PAYMENT_STATUS[transaction.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.paymentAt.split("T")[0]}
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
