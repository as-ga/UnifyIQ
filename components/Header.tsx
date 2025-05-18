"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

export default function Header() {
  const nabigationLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <header className="bg-[#F7F9FB] text-[#4B5563]">
      <nav className="flex justify-between items-center px-8 ">
        <div className="h-auto">
          <Image src="/logo.jpeg" alt="UnifyIQ Logo" width={80} height={80} />
        </div>
        <ul className="flex space-x-4">
          {nabigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "hover:underline",
                  pathname === link.href ? "text-blue-500" : "text-[#4B5563]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 pr-0 md:pr-4">
          {session ? (
            <span>
              <Link href="/profile" className="hover:underline">
                Welcome, {session.user?.name}
              </Link>
            </span>
          ) : (
            <>
              <Link href="/signin" className=" hover:underline">
                Log In
              </Link>
              <Link href="/signup" className=" hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
