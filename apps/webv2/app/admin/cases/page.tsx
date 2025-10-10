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
import { GET_CASES } from "@/lib/graphql/queries"
import { CREATE_CASE, UPDATE_CASE, DELETE_CASE } from "@/lib/graphql/mutations"
import type { Case } from "@/lib/graphql/types"
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

export default function CasesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [caseToDelete, setCaseToDelete] = useState<Case | null>(null)

  const [{ data, fetching }, refetch] = useQuery({ query: GET_CASES })
  const [, createCase] = useMutation(CREATE_CASE)
  const [, updateCase] = useMutation(UPDATE_CASE)
  const [, deleteCase] = useMutation(DELETE_CASE)

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

  const cases: Case[] = data?.cases || []
  const filteredCases = cases.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedCase(null)
    setIsFormOpen(true)
  }

  const handleEdit = (pcCase: Case) => {
    setSelectedCase(pcCase)
    setIsFormOpen(true)
  }

  const handleDelete = (pcCase: Case) => {
    setCaseToDelete(pcCase)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!caseToDelete) return

    const result = await deleteCase({ id: caseToDelete.id })

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to delete case",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Case deleted successfully",
      })
      refetch()
    }

    setDeleteDialogOpen(false)
    setCaseToDelete(null)
  }

  const handleSubmit = async (formData: any) => {
    // Convert formFactor string to array
    const processedData = {
      ...formData,
      formFactor:
        typeof formData.formFactor === "string"
          ? formData.formFactor.split(",").map((s: string) => s.trim())
          : formData.formFactor,
    }

    if (selectedCase) {
      const result = await updateCase({
        id: selectedCase.id,
        updateCaseInput: processedData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update case",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Case updated successfully",
        })
        refetch()
      }
    } else {
      const result = await createCase({
        createCaseInput: processedData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to create case",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Case created successfully",
        })
        refetch()
      }
    }
  }

  const columns = [
    { key: "name" as keyof Case, label: "Name" },
    { key: "manufacturer" as keyof Case, label: "Manufacturer" },
    { key: "type" as keyof Case, label: "Type" },
    {
      key: "formFactor" as keyof Case,
      label: "Form Factor",
      render: (value: any) => (Array.isArray(value) ? value.join(", ") : value),
    },
    {
      key: "maxGpuLength" as keyof Case,
      label: "Max GPU Length",
      render: (value: any) => `${value}mm`,
    },
    {
      key: "price" as keyof Case,
      label: "Price",
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ]

  const formFields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "manufacturer", label: "Manufacturer", type: "text" as const, required: true },
    { name: "type", label: "Type", type: "text" as const, required: true, placeholder: "e.g., Mid Tower, Full Tower" },
    {
      name: "formFactor",
      label: "Form Factor",
      type: "text" as const,
      required: true,
      placeholder: "e.g., ATX, Micro-ATX, Mini-ITX (comma separated)",
    },
    { name: "maxGpuLength", label: "Max GPU Length (mm)", type: "number" as const, required: true },
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
              <h1 className="text-2xl font-bold">Case Management</h1>
              <p className="text-muted-foreground">Manage PC cases</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Case
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredCases}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <GenericComponentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          item={selectedCase ? { ...selectedCase, formFactor: selectedCase.formFactor.join(", ") } : null}
          onSubmit={handleSubmit}
          title="Case"
          fields={formFields}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {caseToDelete?.name}. This action cannot be undone.
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
