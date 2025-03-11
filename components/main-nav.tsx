"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Render Methods" },
  { href: "/debug", label: "Debug Info" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

