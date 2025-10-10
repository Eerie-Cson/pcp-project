"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { CPU, CreateCPUInput, UpdateCPUInput } from "@/lib/graphql/types"

interface CPUFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cpu?: CPU | null
  onSubmit: (data: CreateCPUInput | UpdateCPUInput) => Promise<void>
  isLoading?: boolean
}

export function CPUForm({ open, onOpenChange, cpu, onSubmit, isLoading }: CPUFormProps) {
  const [formData, setFormData] = useState<CreateCPUInput>({
    name: cpu?.name || "",
    manufacturer: cpu?.manufacturer || "",
    socket: cpu?.socket || "",
    cores: cpu?.cores || 0,
    threads: cpu?.threads || 0,
    baseClock: cpu?.baseClock || 0,
    boostClock: cpu?.boostClock || 0,
    tdp: cpu?.tdp || 0,
    price: cpu?.price || 0,
    imageUrl: cpu?.imageUrl || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cpu ? "Edit CPU" : "Create New CPU"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socket">Socket *</Label>
              <Input
                id="socket"
                value={formData.socket}
                onChange={(e) => setFormData({ ...formData, socket: e.target.value })}
                placeholder="e.g., AM5, LGA1700"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cores">Cores *</Label>
              <Input
                id="cores"
                type="number"
                value={formData.cores}
                onChange={(e) => setFormData({ ...formData, cores: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="threads">Threads *</Label>
              <Input
                id="threads"
                type="number"
                value={formData.threads}
                onChange={(e) => setFormData({ ...formData, threads: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="baseClock">Base Clock (GHz) *</Label>
              <Input
                id="baseClock"
                type="number"
                step="0.1"
                value={formData.baseClock}
                onChange={(e) => setFormData({ ...formData, baseClock: Number.parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boostClock">Boost Clock (GHz)</Label>
              <Input
                id="boostClock"
                type="number"
                step="0.1"
                value={formData.boostClock}
                onChange={(e) => setFormData({ ...formData, boostClock: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tdp">TDP (W) *</Label>
              <Input
                id="tdp"
                type="number"
                value={formData.tdp}
                onChange={(e) => setFormData({ ...formData, tdp: Number.parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : cpu ? "Update CPU" : "Create CPU"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
