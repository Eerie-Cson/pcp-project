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
import { GET_POWER_SUPPLIES } from "@/lib/graphql/queries"
import { CREATE_POWER_SUPPLY, UPDATE_POWER_SUPPLY, DELETE_POWER_SUPPLY } from "@/lib/graphql/mutations"
import type { PowerSupply } from "@/lib/graphql/types"
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

export default function PowerSuppliesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPowerSupply, setSelectedPowerSupply] = useState<PowerSupply | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [powerSupplyToDelete, setPowerSupplyToDelete] = useState<PowerSupply | null>(null)

  const [{ data, fetching }, refetch] = useQuery({ query: GET_POWER_SUPPLIES })
  const [, createPowerSupply] = useMutation(CREATE_POWER_SUPPLY)
  const [, updatePowerSupply] = useMutation(UPDATE_POWER_SUPPLY)
  const [, deletePowerSupply] = useMutation(DELETE_POWER_SUPPLY)

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

  const powerSupplies: PowerSupply[] = data?.powerSupplies || []
  const filteredPowerSupplies = powerSupplies.filter(
    (ps) =>
      ps.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.efficiency.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedPowerSupply(null)
    setIsFormOpen(true)
  }

  const handleEdit = (powerSupply: PowerSupply) => {
    setSelectedPowerSupply(powerSupply)
    setIsFormOpen(true)
  }

  const handleDelete = (powerSupply: PowerSupply) => {
    setPowerSupplyToDelete(powerSupply)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!powerSupplyToDelete) return

    const result = await deletePowerSupply({ id: powerSupplyToDelete.id })

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to delete power supply",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Power supply deleted successfully",
      })
      refetch()
    }

    setDeleteDialogOpen(false)
    setPowerSupplyToDelete(null)
  }

  const handleSubmit = async (formData: any) => {
    if (selectedPowerSupply) {
      const result = await updatePowerSupply({
        id: selectedPowerSupply.id,
        updatePowerSupplyInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update power supply",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Power supply updated successfully",
        })
        refetch()
      }
    } else {
      const result = await createPowerSupply({
        createPowerSupplyInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to create power supply",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Power supply created successfully",
        })
        refetch()
      }
    }
  }

  const columns = [
    { key: "name" as keyof PowerSupply, label: "Name" },
    { key: "manufacturer" as keyof PowerSupply, label: "Manufacturer" },
    {
      key: "wattage" as keyof PowerSupply,
      label: "Wattage",
      render: (value: any) => `${value}W`,
    },
    { key: "efficiency" as keyof PowerSupply, label: "Efficiency" },
    { key: "modular" as keyof PowerSupply, label: "Modular" },
    { key: "formFactor" as keyof PowerSupply, label: "Form Factor" },
    {
      key: "price" as keyof PowerSupply,
      label: "Price",
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ]

  const formFields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "manufacturer", label: "Manufacturer", type: "text" as const, required: true },
    { name: "wattage", label: "Wattage (W)", type: "number" as const, required: true },
    {
      name: "efficiency",
      label: "Efficiency",
      type: "text" as const,
      required: true,
      placeholder: "e.g., 80+ Gold, 80+ Platinum",
    },
    {
      name: "modular",
      label: "Modular",
      type: "text" as const,
      required: true,
      placeholder: "e.g., Full, Semi, Non-Modular",
    },
    { name: "formFactor", label: "Form Factor", type: "text" as const, required: true, placeholder: "e.g., ATX, SFX" },
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
              <h1 className="text-2xl font-bold">Power Supply Management</h1>
              <p className="text-muted-foreground">Manage PSU components</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Power Supply
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search power supplies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredPowerSupplies}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <GenericComponentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          item={selectedPowerSupply}
          onSubmit={handleSubmit}
          title="Power Supply"
          fields={formFields}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {powerSupplyToDelete?.name}. This action cannot be undone.
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
