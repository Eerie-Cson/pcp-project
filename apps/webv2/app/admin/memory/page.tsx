"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "urql"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ComponentTable } from "@/components/admin/component-table"
import { GenericComponentForm } from "@/components/admin/generic-component-form"
import { ArrowLeft, Plus, Search } from "lucide-react"
import Link from "next/link"
import { GET_MEMORY } from "@/lib/graphql/queries"
import { CREATE_MEMORY, UPDATE_MEMORY, DELETE_MEMORY } from "@/lib/graphql/mutations"
import type { Memory } from "@/lib/graphql/types"
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

export default function MemoryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [memoryToDelete, setMemoryToDelete] = useState<Memory | null>(null)

  const [{ data, fetching }, refetch] = useQuery({ query: GET_MEMORY })
  const [, createMemory] = useMutation(CREATE_MEMORY)
  const [, updateMemory] = useMutation(UPDATE_MEMORY)
  const [, deleteMemory] = useMutation(DELETE_MEMORY)

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

  const memoryList: Memory[] = data?.memorys || []
  const filteredMemory = memoryList.filter(
    (mem) =>
      mem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedMemory(null)
    setIsFormOpen(true)
  }

  const handleEdit = (memory: Memory) => {
    setSelectedMemory(memory)
    setIsFormOpen(true)
  }

  const handleDelete = (memory: Memory) => {
    setMemoryToDelete(memory)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!memoryToDelete) return

    const result = await deleteMemory({ id: memoryToDelete.id })

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to delete memory",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Memory deleted successfully",
      })
      refetch()
    }

    setDeleteDialogOpen(false)
    setMemoryToDelete(null)
  }

  const handleSubmit = async (formData: any) => {
    if (selectedMemory) {
      const result = await updateMemory({
        id: selectedMemory.id,
        updateMemoryInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update memory",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Memory updated successfully",
        })
        refetch()
      }
    } else {
      const result = await createMemory({
        createMemoryInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to create memory",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Memory created successfully",
        })
        refetch()
      }
    }
  }

  const columns = [
    { key: "name" as keyof Memory, label: "Name" },
    { key: "manufacturer" as keyof Memory, label: "Manufacturer" },
    { key: "type" as keyof Memory, label: "Type" },
    {
      key: "speed" as keyof Memory,
      label: "Speed",
      render: (value: any) => `${value} MHz`,
    },
    {
      key: "capacity" as keyof Memory,
      label: "Capacity",
      render: (value: any, item: Memory) => `${item.capacity}GB (${item.modules}x${item.capacity / item.modules}GB)`,
    },
    {
      key: "price" as keyof Memory,
      label: "Price",
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ]

  const formFields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "manufacturer", label: "Manufacturer", type: "text" as const, required: true },
    { name: "type", label: "Type", type: "text" as const, required: true, placeholder: "e.g., DDR5, DDR4" },
    { name: "speed", label: "Speed (MHz)", type: "number" as const, required: true },
    { name: "capacity", label: "Total Capacity (GB)", type: "number" as const, required: true },
    { name: "modules", label: "Number of Modules", type: "number" as const, required: true },
    { name: "price", label: "Price ($)", type: "number" as const, required: true, step: "0.01" },
    { name: "imageUrl", label: "Image URL", type: "text" as const },
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
              <h1 className="text-2xl font-bold">Memory Management</h1>
              <p className="text-muted-foreground">Manage RAM modules</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Memory
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search memory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredMemory}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <GenericComponentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          item={selectedMemory}
          onSubmit={handleSubmit}
          title="Memory"
          fields={formFields}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {memoryToDelete?.name}. This action cannot be undone.
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
