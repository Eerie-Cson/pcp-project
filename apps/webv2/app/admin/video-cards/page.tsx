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
import { GET_VIDEO_CARDS } from "@/lib/graphql/queries"
import { CREATE_VIDEO_CARD, UPDATE_VIDEO_CARD, DELETE_VIDEO_CARD } from "@/lib/graphql/mutations"
import type { VideoCard } from "@/lib/graphql/types"
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

export default function VideoCardsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedVideoCard, setSelectedVideoCard] = useState<VideoCard | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [videoCardToDelete, setVideoCardToDelete] = useState<VideoCard | null>(null)

  const [{ data, fetching }, refetch] = useQuery({ query: GET_VIDEO_CARDS })
  const [, createVideoCard] = useMutation(CREATE_VIDEO_CARD)
  const [, updateVideoCard] = useMutation(UPDATE_VIDEO_CARD)
  const [, deleteVideoCard] = useMutation(DELETE_VIDEO_CARD)

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

  const videoCards: VideoCard[] = data?.videoCards || []
  const filteredVideoCards = videoCards.filter(
    (vc) =>
      vc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vc.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vc.chipset.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreate = () => {
    setSelectedVideoCard(null)
    setIsFormOpen(true)
  }

  const handleEdit = (videoCard: VideoCard) => {
    setSelectedVideoCard(videoCard)
    setIsFormOpen(true)
  }

  const handleDelete = (videoCard: VideoCard) => {
    setVideoCardToDelete(videoCard)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!videoCardToDelete) return

    const result = await deleteVideoCard({ id: videoCardToDelete.id })

    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to delete video card",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Video card deleted successfully",
      })
      refetch()
    }

    setDeleteDialogOpen(false)
    setVideoCardToDelete(null)
  }

  const handleSubmit = async (formData: any) => {
    if (selectedVideoCard) {
      const result = await updateVideoCard({
        id: selectedVideoCard.id,
        updateVideoCardInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to update video card",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Video card updated successfully",
        })
        refetch()
      }
    } else {
      const result = await createVideoCard({
        createVideoCardInput: formData,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: "Failed to create video card",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Video card created successfully",
        })
        refetch()
      }
    }
  }

  const columns = [
    { key: "name" as keyof VideoCard, label: "Name" },
    { key: "manufacturer" as keyof VideoCard, label: "Manufacturer" },
    { key: "chipset" as keyof VideoCard, label: "Chipset" },
    {
      key: "memory" as keyof VideoCard,
      label: "Memory",
      render: (value: any) => `${value}GB`,
    },
    {
      key: "coreClock" as keyof VideoCard,
      label: "Clock Speed",
      render: (value: any, item: VideoCard) =>
        item.boostClock ? `${item.coreClock} - ${item.boostClock} MHz` : `${item.coreClock} MHz`,
    },
    {
      key: "tdp" as keyof VideoCard,
      label: "TDP",
      render: (value: any) => `${value}W`,
    },
    {
      key: "price" as keyof VideoCard,
      label: "Price",
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ]

  const formFields = [
    { name: "name", label: "Name", type: "text" as const, required: true },
    { name: "manufacturer", label: "Manufacturer", type: "text" as const, required: true },
    {
      name: "chipset",
      label: "Chipset",
      type: "text" as const,
      required: true,
      placeholder: "e.g., RTX 4090, RX 7900",
    },
    { name: "memory", label: "Memory (GB)", type: "number" as const, required: true },
    { name: "coreClock", label: "Core Clock (MHz)", type: "number" as const, required: true },
    { name: "boostClock", label: "Boost Clock (MHz)", type: "number" as const },
    { name: "length", label: "Length (mm)", type: "number" as const, required: true },
    { name: "tdp", label: "TDP (W)", type: "number" as const, required: true },
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
              <h1 className="text-2xl font-bold">Video Card Management</h1>
              <p className="text-muted-foreground">Manage graphics cards</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Video Card
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search video cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredVideoCards}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <GenericComponentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          item={selectedVideoCard}
          onSubmit={handleSubmit}
          title="Video Card"
          fields={formFields}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {videoCardToDelete?.name}. This action cannot be undone.
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
