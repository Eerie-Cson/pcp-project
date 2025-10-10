"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth/auth-context"
import { Package, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const pathname = usePathname()

  // Don't show navbar on login page
  if (pathname === "/login") {
    return null
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">PC Builder Pro</h1>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" ? (
                  <>
                    <Link href="/admin">
                      <Button variant={pathname.startsWith("/admin") ? "default" : "ghost"}>Admin Dashboard</Button>
                    </Link>
                    <Link href="/components">
                      <Button variant={pathname === "/components" ? "default" : "ghost"}>Components</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/components">
                      <Button variant={pathname === "/components" ? "default" : "ghost"}>Browse</Button>
                    </Link>
                    <Link href="/builds">
                      <Button variant={pathname === "/builds" ? "default" : "ghost"}>Build PC</Button>
                    </Link>
                  </>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-zinc-950 border-zinc-800">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm">{user?.email}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/components">
                  <Button variant="ghost">Browse Components</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
