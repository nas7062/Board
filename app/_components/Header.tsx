import { Wallet } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 text-2xl">10012</h1>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-lg">
            <Link href="/" className=" text-gray-500">
              대시보드
            </Link>
            <Link href="/list" className=" text-gray-900">
              거래내역
            </Link>
            <Link href="/" className=" text-gray-900">
              가맹점
            </Link>
            <Link href="/" className=" text-gray-900">
              정산
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
