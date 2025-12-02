"use client";

import { Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkBaseClass = "text-base sm:text-lg ";
  const inactiveClass = "text-gray-500";
  const activeClass = "text-blue-500 font-semibold";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900 text-2xl sm:block hidden">10012</h1>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`${linkBaseClass} ${
                isActive("/") ? activeClass : inactiveClass
              }`}
            >
              대시보드
            </Link>
            <Link
              href="/list"
              className={`${linkBaseClass} ${
                isActive("/list") ? activeClass : inactiveClass
              }`}
            >
              거래내역
            </Link>
            <Link
              href="/merchant"
              className={`${linkBaseClass} ${
                isActive("/merchant") ? activeClass : inactiveClass
              }`}
            >
              가맹점
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
