import { MERCHANT_STATUS_LABELS, STATUS_LABLES } from "@/app/util/constant";
import { ImerchantsDetail } from "@/app/util/type";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { Calendar, Mail, Store } from "lucide-react";

export default function MerchantDetail({
  selectedMerchantData,
}: {
  selectedMerchantData?: ImerchantsDetail;
}) {
  return (
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
                {MERCHANT_STATUS_LABELS[selectedMerchantData.bizType]}
              </p>
            </div>
            <Badge
              className={clsx(
                selectedMerchantData.status === "ACTIVE" && "text-green-500",
                selectedMerchantData.status === "INACTIVE" && "text-red-500",
                selectedMerchantData.status === "CLOSED" && "text-red-500",
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
              <div className="text-gray-900">{selectedMerchantData.phone}</div>
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
  );
}
