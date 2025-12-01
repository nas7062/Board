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
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Ipayment } from "../util/type";

export default function WeekCountChart({ payments }: { payments: Ipayment[] }) {
  const weekChartData = useMemo(() => {
    if (!payments || payments.length === 0) return [];

    const grouped = _.groupBy(
      payments,
      (p: Ipayment) => p.paymentAt.split("T")[0]
    );

    return Object.keys(grouped).map((date) => ({
      date,
      count: grouped[date].length,
    }));
  }, [payments]);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>주간 거래 건수</CardTitle>
        <CardDescription>최근 7일간의 거래 건수</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              formatter={(value: number) => [
                `${value.toLocaleString()}건`,
                "거래 건수",
              ]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
