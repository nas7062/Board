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
import { useEffect, useState } from "react";
import { Ipayment } from "../util/type";
import getAllPaymentList from "../_lib/getAllPaymentList";
import { Badge } from "@/components/ui/badge";
export default function ListPage() {
  const [payments, setPayments] = useState<Ipayment[]>([]);
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
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl">거래 내역</h2>
        <p className="text-gray-500">전체 거래 내역을 조회하고 관리합니다.</p>
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
                payments.map((transaction) => (
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
                        className={
                          transaction.status === "SUCCESS"
                            ? "text-red-600"
                            : "text-gray-900"
                        }
                      >
                        {transaction.status === "SUCCESS" && ""}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          transaction.status === "SUCCESS"
                            ? "bg-green-500 text-white py-1"
                            : "text-gray-900 py-1"
                        }
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
