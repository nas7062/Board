"use client";
import _ from "lodash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Ipayment } from "../util/type";
import { formatCurrency } from "../util/constant";
export default function WeekPriceChart({ payments }: { payments: Ipayment[] }) {
  const grouped = _.groupBy(
    payments,
    (p: Ipayment) => p.paymentAt.split("T")[0]
  );

  const chartData = Object.keys(grouped).map((date) => ({
    date,
    amount: grouped[date].reduce(
      (sum: number, p: Ipayment) => sum + Number(p.amount),
      0
    ),
  }));

  return (
    <Card className="col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>주간 거래액 추이</CardTitle>
        <CardDescription>최근 일주일간 거래액 변화</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}M`}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), "거래액"]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
