"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        🗳️ QuickPoll
      </Link>

      <div className="flex gap-4">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:text-blue-500 transition`}
        >
          Home
        </Link>
        <Link
          href="/create"
          className={`${
            pathname === "/create" ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:text-blue-500 transition`}
        >
          Create Poll
        </Link>
      </div>
    </nav>
  );
}
