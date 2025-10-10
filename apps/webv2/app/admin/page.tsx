"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, HardDrive, MemoryStick, Monitor, Box, Zap, CircuitBoard, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("user_role")
    if (role !== "admin") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user_role")
    localStorage.removeItem("auth_token")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const componentTypes = [
    {
      title: "CPUs",
      description: "Manage processor components",
      icon: Cpu,
      href: "/admin/cpus",
      color: "text-chart-1",
    },
    {
      title: "Motherboards",
      description: "Manage motherboard components",
      icon: CircuitBoard,
      href: "/admin/motherboards",
      color: "text-chart-2",
    },
    {
      title: "Memory",
      description: "Manage RAM modules",
      icon: MemoryStick,
      href: "/admin/memory",
      color: "text-chart-3",
    },
    {
      title: "Storage",
      description: "Manage storage devices",
      icon: HardDrive,
      href: "/admin/storage",
      color: "text-chart-4",
    },
    {
      title: "Video Cards",
      description: "Manage graphics cards",
      icon: Monitor,
      href: "/admin/video-cards",
      color: "text-chart-5",
    },
    {
      title: "Cases",
      description: "Manage PC cases",
      icon: Box,
      href: "/admin/cases",
      color: "text-chart-1",
    },
    {
      title: "Power Supplies",
      description: "Manage PSU components",
      icon: Zap,
      href: "/admin/power-supplies",
      color: "text-chart-2",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6" />
            <span className="text-xl font-bold">PC Builder Admin</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Component Management</h1>
          <p className="text-muted-foreground">Create, update, and delete PC components</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentTypes.map((component) => (
            <Link key={component.href} href={component.href}>
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-2`}>
                    <component.icon className={`h-6 w-6 ${component.color}`} />
                  </div>
                  <CardTitle>{component.title}</CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
