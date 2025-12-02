import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function BoardCard({
  title,
  Icon,
  value,
}: {
  title: string;
  Icon: React.ElementType;
  value: string | number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl text-gray-900">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3 text-green-600" />
          <p className="text-xs text-green-600">전주 대비 +12.5%</p>
        </div>
      </CardContent>
    </Card>
  );
}
