import { MERCHANT_STATUS_LABELS, STATUS_LABLES } from "@/app/util/constant";
import { ImerchantsDetail } from "@/app/util/type";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface MerchantTable {
  filteredMerchants: ImerchantsDetail[];
  selectedMerchant: string;
  setSelectedMerchant: Dispatch<SetStateAction<string>>;
}

export default function MerchantTable({
  filteredMerchants,
  selectedMerchant,
  setSelectedMerchant,
}: MerchantTable) {
  return (
    <div className="border rounded-lg overflow-hidden ">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="sm:block hidden">가맹점ID</TableHead>
            <TableHead>가맹점명</TableHead>
            <TableHead>업종</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right m:block hidden">
              이용날짜
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMerchants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                조회된 가맹점이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            filteredMerchants.map((merchant) => (
              <TableRow
                key={merchant.mchtCode}
                className={`hover:bg-gray-50 cursor-pointer  ${
                  selectedMerchant === merchant.mchtCode ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedMerchant(merchant.bizNo)}
              >
                <TableCell className="font-mono text-sm sm:block hidden">
                  {merchant.mchtCode}
                </TableCell>
                <TableCell className="text-gray-900">
                  {merchant.mchtName}
                </TableCell>
                <TableCell className="text-gray-600">
                  {MERCHANT_STATUS_LABELS[merchant.bizType]}
                </TableCell>
                <TableCell>
                  <Badge
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
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-gray-900 sm:block hidden">
                  {merchant.updatedAt.split("T")[0]}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
