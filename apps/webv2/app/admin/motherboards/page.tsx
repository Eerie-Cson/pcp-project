"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "urql"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ComponentTable } from "@/components/admin/component-table"
import { MotherboardForm } from "@/components/admin/motherboard-form"
import { ArrowLeft, Plus, Search } from "lucide-react"
import Link from "next/link"
import { GET_MOTHERBOARDS } from "@/lib/graphql/queries"
import { CREATE_MOTHERBOARD, UPDATE_MOTHERBOARD, DELETE_MOTHERBOARD } from "@/lib/graphql/mutations"
import type { Motherboard, CreateMotherboardInput, UpdateMotherboardInput } from "@/lib/graphql/types"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function MotherboardsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMotherboard, setSelectedMotherboard] = useState<Motherboard | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [motherboardToDelete, setMotherboardToDelete] = useState<Motherboard | null>(null)

  const [{ data, fetching }, refetch] = useQuery({ query: GET_MOTHERBOARDS })
  const [, createMotherboard] = useMutation(CREATE_MOTHERBOARD)
  const [, updateMotherboard] = useMutation(UPDATE_MOTHERBOARD)
  const [, deleteMotherboard] = useMutation(DELETE_MOTHERBOARD)

  useEffect(() => {
    const role = localStorage.getItem("user_role")
    if (role !== "admin") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  const motherboards: Motherboard[] = data?.motherboards || []
  const filteredMotherboards = motherboards.filter(
    (mb) =>
      mb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mb.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mb.socket.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedMotherboard(null)
    setIsFormOpen(true)
  }

  const handleEdit = (motherboard: Motherboard) => {
    setSelectedMotherboard(motherboard)
    setIsFormOpen(true)
  }

  const handleDelete = (motherboard: Motherboard) => {
    setMotherboardToDelete(motherboard)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!motherboardToDelete) return

    const result = await deleteMotherboard({ id: motherboardToDelete.id })

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to delete motherboard",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Motherboard deleted successfully",
      })
      refetch()
    }

    setDeleteDialogOpen(false)
    setMotherboardToDelete(null)
  }

  const handleSubmit = async (formData: CreateMotherboardInput | UpdateMotherboardInput) => {
    if (selectedMotherboard) {
      const result = await updateMotherboard({
        id: selectedMotherboard.id,
        updateMotherboardInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update motherboard",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Motherboard updated successfully",
        })
        refetch()
      }
    } else {
      const result = await createMotherboard({
        createMotherboardInput: formData as CreateMotherboardInput,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to create motherboard",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Motherboard created successfully",
        })
        refetch()
      }
    }
  }

  const columns = [
    { key: "name" as keyof Motherboard, label: "Name" },
    { key: "manufacturer" as keyof Motherboard, label: "Manufacturer" },
    { key: "socket" as keyof Motherboard, label: "Socket" },
    { key: "formFactor" as keyof Motherboard, label: "Form Factor" },
    { key: "chipset" as keyof Motherboard, label: "Chipset" },
    {
      key: "memoryType" as keyof Motherboard,
      label: "Memory",
      render: (value: any, item: Motherboard) => `${item.memoryType} (${item.memorySlots} slots)`,
    },
    {
      key: "price" as keyof Motherboard,
      label: "Price",
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Motherboard Management</h1>
              <p className="text-muted-foreground">Manage motherboard components</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Motherboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search motherboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredMotherboards}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <MotherboardForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          motherboard={selectedMotherboard}
          onSubmit={handleSubmit}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {motherboardToDelete?.name}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}
