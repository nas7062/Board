"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import _ from "lodash";
import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Ipayment } from "../util/type";

import {
  formatCurrency,
  PAYMENT_METHOD_LABELS,
  PAYMENT_TYPE_COLORS,
} from "../util/constant";

export default function PayTypeChart({ payments }: { payments: Ipayment[] }) {
  const paymentMethodChartData = useMemo(() => {
    if (!payments || payments.length === 0) return [];

    const grouped = _.groupBy(payments, "payType");

    return Object.entries(grouped).map(([payType, items]) => {
      const value = _.sumBy(items, (item) => Number(item.amount));
      const count = items.length;

      return {
        name: PAYMENT_METHOD_LABELS[
          payType as keyof typeof PAYMENT_METHOD_LABELS
        ],
        value,
        count,
      };
    });
  }, [payments]);
  const totalAmount = useMemo(
    () =>
      paymentMethodChartData &&
      paymentMethodChartData.reduce((sum, item) => sum + item.value, 0),
    [paymentMethodChartData]
  );

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>결제 수단별 거래액</CardTitle>
        <CardDescription>일주일간 결제 수단별 분포</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentMethodChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => {
                if (!totalAmount) return name;
                const percent = ((value / totalAmount) * 100).toFixed(0);
                return `${name} ${percent}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {paymentMethodChartData &&
                paymentMethodChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      Object.values(PAYMENT_TYPE_COLORS)[
                        index % Object.values(PAYMENT_TYPE_COLORS).length
                      ]
                    }
                  />
                ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "거래액"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
