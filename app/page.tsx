"use client";
import { useEffect, useMemo, useState } from "react";
import BoardCard from "./_components/BoardCard";
import PayTypeChart from "./_components/PayTypeChart";
import WeekCountChart from "./_components/WeekCountChart";
import WeekPriceChart from "./_components/WeekPriceChart";
import { Ipayment } from "./util/type";
import getAllPaymentList from "./_lib/getAllPaymentList";
import _ from "lodash";
import { DollarSign, CreditCard, ShoppingCart, Percent } from "lucide-react";
import { PAYMENT_METHOD_LABELS } from "./util/constant";
export default function Home() {
  const [payments, setPayments] = useState<Ipayment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPaymentList();
      if (data.status === 200) {
        setPayments(data.data);
      } else {
        console.log("패치 실패");
      }
    };
    fetchData();
  }, []);

  const weekAmount = useMemo(() => {
    if (!payments || payments.length === 0) return 0;
    return payments.reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payments]);

  const weekSuccess = useMemo(() => {
    if (!payments || payments.length === 0) return 0;

    const total = payments.length;
    const successCount = payments.filter(
      (p: Ipayment) => p.status === "SUCCESS"
    ).length;

    return (successCount / total) * 100;
  }, [payments]);

  const mostCommonPayType = useMemo(() => {
    if (!payments || payments.length === 0) return null;

    const grouped = _.groupBy(payments, (p: Ipayment) => p.payType);

    const result = Object.entries(grouped).reduce((max, [payType, items]) => {
      const count = items.length;
      if (!max || count > max.count) {
        return { payType, count };
      }
      return max;
    }, null as null | { payType: string; count: number });
    if (!result) return;
    const label =
      PAYMENT_METHOD_LABELS[
        result.payType as keyof typeof PAYMENT_METHOD_LABELS
      ] ?? result.payType;
    return {
      label,
      count: result.count,
    };
  }, [payments]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <BoardCard
          title="일주일간 거래액"
          Icon={DollarSign}
          value={weekAmount}
        />
        <BoardCard
          title="총 거래 건수"
          Icon={CreditCard}
          value={payments.length}
        />
        <BoardCard title="승인율" Icon={Percent} value={weekSuccess} />
        <BoardCard
          title="가장많은 거래 수단"
          Icon={ShoppingCart}
          value={mostCommonPayType?.label as string}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <WeekPriceChart payments={payments} />
        <PayTypeChart payments={payments} />
        <WeekCountChart payments={payments} />
      </div>
    </div>
  );
}
