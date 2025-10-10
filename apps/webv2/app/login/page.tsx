"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (role: "admin" | "user", email: string, password: string) => {
    setIsLoading(true)

    setTimeout(() => {
      login(email, role)

      toast({
        title: "Login successful",
        description: `Welcome back! Redirecting to ${role} dashboard...`,
      })

      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin")
        } else {
          router.push("/builds")
        }
      }, 500)

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Package className="h-8 w-8" />
        <span className="text-2xl font-bold">PC Builder Pro</span>
      </Link>

      <Card className="w-full max-w-md bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your role and sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleLogin("user", formData.get("email") as string, formData.get("password") as string)
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                    className="bg-black border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    name="password"
                    type="password"
                    required
                    className="bg-black border-zinc-800"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in as User"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleLogin("admin", formData.get("email") as string, formData.get("password") as string)
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="bg-black border-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    required
                    className="bg-black border-zinc-800"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in as Admin"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">Demo: Use any email/password to sign in</p>
    </div>
  )
}
