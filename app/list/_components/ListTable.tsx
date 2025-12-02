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
} from "@/app/util/constant";
import clsx from "clsx";
import { Ipayment } from "@/app/util/type";
import { Badge } from "@/components/ui/badge";

export default function ListTable({
  payments,
  filteredPayments,
}: {
  payments: Ipayment[];
  filteredPayments: Ipayment[];
}) {
  if (!payments) return;
  return (
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
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
                    <p className="text-xs text-gray-500">{payments.mchtCode}</p>
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
                      payments.status === "FAILED" && "bg-red-500  text-white",
                      "py-1"
                    )}
                    variant="outline"
                  >
                    {PAYMENT_STATUS[payments.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600 sm:block hidden">
                  {payments.paymentAt?.split("T")[0]}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
