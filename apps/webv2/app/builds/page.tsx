"use client"

import type React from "react"

import { useState } from "react"
import { useBuildStore } from "@/lib/store/build-store"
import { checkCompatibility } from "@/lib/compatibility/checker"
import {
  mockCPUs,
  mockMotherboards,
  mockMemory,
  mockStorage,
  mockVideoCards,
  mockCases,
  mockPowerSupplies,
} from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Plus, Trash2, Save } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function BuildsPage() {
  const {
    buildName,
    setBuildName,
    selectedCPU,
    setSelectedCPU,
    selectedMotherboard,
    setSelectedMotherboard,
    selectedMemory,
    addMemory,
    removeMemory,
    selectedStorage,
    addStorage,
    removeStorage,
    selectedVideoCard,
    setSelectedVideoCard,
    selectedCase,
    setSelectedCase,
    selectedPowerSupply,
    setSelectedPowerSupply,
    getTotalPrice,
    getEstimatedWattage,
    clearBuild,
  } = useBuildStore()

  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const compatibilityIssues = checkCompatibility(
    selectedCPU,
    selectedMotherboard,
    selectedMemory,
    selectedVideoCard,
    selectedCase,
    selectedPowerSupply,
  )

  const errors = compatibilityIssues.filter((i) => i.type === "error")
  const warnings = compatibilityIssues.filter((i) => i.type === "warning")

  const handleSaveBuild = () => {
    alert("Build saved successfully! (Mock implementation)")
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">PC Build Editor</h1>
            <p className="text-muted-foreground">Configure your custom PC build</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearBuild}>
              Clear Build
            </Button>
            <Button onClick={handleSaveBuild} disabled={errors.length > 0}>
              <Save className="w-4 h-4 mr-2" />
              Save Build
            </Button>
          </div>
        </div>

        {/* Build Name */}
        <Card className="p-4 bg-zinc-950 border-zinc-800">
          <label className="text-sm text-muted-foreground mb-2 block">Build Name</label>
          <Input
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            className="bg-black border-zinc-800"
            placeholder="Enter build name..."
          />
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Component Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* CPU */}
            <ComponentSlot
              title="CPU"
              selected={selectedCPU}
              onSelect={() => setOpenDialog("cpu")}
              onRemove={() => setSelectedCPU(null)}
              renderDetails={(cpu) => (
                <>
                  <p className="text-sm text-muted-foreground">{cpu.manufacturer}</p>
                  <p className="text-xs text-muted-foreground">
                    {cpu.cores}C/{cpu.threads}T • {cpu.socket} • {cpu.tdp}W
                  </p>
                </>
              )}
            />

            {/* Motherboard */}
            <ComponentSlot
              title="Motherboard"
              selected={selectedMotherboard}
              onSelect={() => setOpenDialog("motherboard")}
              onRemove={() => setSelectedMotherboard(null)}
              renderDetails={(mb) => (
                <>
                  <p className="text-sm text-muted-foreground">{mb.manufacturer}</p>
                  <p className="text-xs text-muted-foreground">
                    {mb.socket} • {mb.formFactor} • {mb.memoryType}
                  </p>
                </>
              )}
            />

            {/* Memory */}
            <Card className="p-4 bg-zinc-950 border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Memory (RAM)</h3>
                <Button size="sm" variant="outline" onClick={() => setOpenDialog("memory")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              {selectedMemory.length === 0 ? (
                <p className="text-sm text-muted-foreground">No memory selected</p>
              ) : (
                <div className="space-y-2">
                  {selectedMemory.map((mem) => (
                    <div
                      key={mem.id}
                      className="flex items-center justify-between p-2 bg-black rounded border border-zinc-800"
                    >
                      <div>
                        <p className="text-sm font-medium">{mem.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {mem.capacity}GB • {mem.type}-{mem.speed} • ${mem.price}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeMemory(mem.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Storage */}
            <Card className="p-4 bg-zinc-950 border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Storage</h3>
                <Button size="sm" variant="outline" onClick={() => setOpenDialog("storage")}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              {selectedStorage.length === 0 ? (
                <p className="text-sm text-muted-foreground">No storage selected</p>
              ) : (
                <div className="space-y-2">
                  {selectedStorage.map((stor) => (
                    <div
                      key={stor.id}
                      className="flex items-center justify-between p-2 bg-black rounded border border-zinc-800"
                    >
                      <div>
                        <p className="text-sm font-medium">{stor.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {stor.capacity}GB • {stor.type} • ${stor.price}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => removeStorage(stor.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Video Card */}
            <ComponentSlot
              title="Video Card (GPU)"
              selected={selectedVideoCard}
              onSelect={() => setOpenDialog("videocard")}
              onRemove={() => setSelectedVideoCard(null)}
              renderDetails={(gpu) => (
                <>
                  <p className="text-sm text-muted-foreground">{gpu.manufacturer}</p>
                  <p className="text-xs text-muted-foreground">
                    {gpu.memory}GB • {gpu.chipset} • {gpu.tdp}W
                  </p>
                </>
              )}
            />

            {/* Case */}
            <ComponentSlot
              title="Case"
              selected={selectedCase}
              onSelect={() => setOpenDialog("case")}
              onRemove={() => setSelectedCase(null)}
              renderDetails={(c) => (
                <>
                  <p className="text-sm text-muted-foreground">{c.manufacturer}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.type} • Max GPU: {c.maxGpuLength}mm
                  </p>
                </>
              )}
            />

            {/* Power Supply */}
            <ComponentSlot
              title="Power Supply (PSU)"
              selected={selectedPowerSupply}
              onSelect={() => setOpenDialog("psu")}
              onRemove={() => setSelectedPowerSupply(null)}
              renderDetails={(psu) => (
                <>
                  <p className="text-sm text-muted-foreground">{psu.manufacturer}</p>
                  <p className="text-xs text-muted-foreground">
                    {psu.wattage}W • {psu.efficiency} • {psu.modular}
                  </p>
                </>
              )}
            />
          </div>

          {/* Summary & Compatibility */}
          <div className="space-y-4">
            {/* Build Summary */}
            <Card className="p-4 bg-zinc-950 border-zinc-800 sticky top-6">
              <h3 className="font-semibold mb-4">Build Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Price</span>
                  <span className="font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Wattage</span>
                  <span className="font-semibold">{getEstimatedWattage()}W</span>
                </div>
                <div className="pt-3 border-t border-zinc-800">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Components</span>
                    <span className="text-muted-foreground">
                      {[selectedCPU, selectedMotherboard, selectedVideoCard, selectedCase, selectedPowerSupply].filter(
                        Boolean,
                      ).length +
                        selectedMemory.length +
                        selectedStorage.length}{" "}
                      / 7
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Compatibility Status */}
            <Card className="p-4 bg-zinc-950 border-zinc-800">
              <h3 className="font-semibold mb-3">Compatibility</h3>
              {compatibilityIssues.length === 0 ? (
                <Alert className="bg-green-950/20 border-green-900/50">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-400">All components are compatible!</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {errors.map((issue, i) => (
                    <Alert key={i} className="bg-red-950/20 border-red-900/50">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-400 text-xs">
                        <strong>{issue.component}:</strong> {issue.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                  {warnings.map((issue, i) => (
                    <Alert key={i} className="bg-yellow-950/20 border-yellow-900/50">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <AlertDescription className="text-yellow-400 text-xs">
                        <strong>{issue.component}:</strong> {issue.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Selection Dialogs */}
      <SelectionDialog
        open={openDialog === "cpu"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Select CPU"
        items={mockCPUs}
        onSelect={(cpu) => {
          setSelectedCPU(cpu)
          setOpenDialog(null)
        }}
        renderItem={(cpu) => (
          <div>
            <p className="font-medium">{cpu.name}</p>
            <p className="text-sm text-muted-foreground">
              {cpu.cores}C/{cpu.threads}T • {cpu.socket} • {cpu.baseClock}-{cpu.boostClock}GHz
            </p>
            <p className="text-sm font-semibold mt-1">${cpu.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "motherboard"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Select Motherboard"
        items={mockMotherboards}
        onSelect={(mb) => {
          setSelectedMotherboard(mb)
          setOpenDialog(null)
        }}
        renderItem={(mb) => (
          <div>
            <p className="font-medium">{mb.name}</p>
            <p className="text-sm text-muted-foreground">
              {mb.socket} • {mb.formFactor} • {mb.memoryType}
            </p>
            <p className="text-sm font-semibold mt-1">${mb.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "memory"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Add Memory"
        items={mockMemory}
        onSelect={(mem) => {
          addMemory(mem)
          setOpenDialog(null)
        }}
        renderItem={(mem) => (
          <div>
            <p className="font-medium">{mem.name}</p>
            <p className="text-sm text-muted-foreground">
              {mem.capacity}GB ({mem.modules}x{mem.capacity / mem.modules}GB) • {mem.type}-{mem.speed}
            </p>
            <p className="text-sm font-semibold mt-1">${mem.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "storage"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Add Storage"
        items={mockStorage}
        onSelect={(stor) => {
          addStorage(stor)
          setOpenDialog(null)
        }}
        renderItem={(stor) => (
          <div>
            <p className="font-medium">{stor.name}</p>
            <p className="text-sm text-muted-foreground">
              {stor.capacity}GB • {stor.type} • {stor.interface}
            </p>
            <p className="text-sm font-semibold mt-1">${stor.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "videocard"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Select Video Card"
        items={mockVideoCards}
        onSelect={(gpu) => {
          setSelectedVideoCard(gpu)
          setOpenDialog(null)
        }}
        renderItem={(gpu) => (
          <div>
            <p className="font-medium">{gpu.name}</p>
            <p className="text-sm text-muted-foreground">
              {gpu.memory}GB • {gpu.chipset} • {gpu.length}mm • {gpu.tdp}W
            </p>
            <p className="text-sm font-semibold mt-1">${gpu.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "case"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Select Case"
        items={mockCases}
        onSelect={(c) => {
          setSelectedCase(c)
          setOpenDialog(null)
        }}
        renderItem={(c) => (
          <div>
            <p className="font-medium">{c.name}</p>
            <p className="text-sm text-muted-foreground">
              {c.type} • Max GPU: {c.maxGpuLength}mm • {c.formFactor.join(", ")}
            </p>
            <p className="text-sm font-semibold mt-1">${c.price}</p>
          </div>
        )}
      />

      <SelectionDialog
        open={openDialog === "psu"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Select Power Supply"
        items={mockPowerSupplies}
        onSelect={(psu) => {
          setSelectedPowerSupply(psu)
          setOpenDialog(null)
        }}
        renderItem={(psu) => (
          <div>
            <p className="font-medium">{psu.name}</p>
            <p className="text-sm text-muted-foreground">
              {psu.wattage}W • {psu.efficiency} • {psu.modular}
            </p>
            <p className="text-sm font-semibold mt-1">${psu.price}</p>
          </div>
        )}
      />
    </div>
  )
}

// Component Slot Helper
function ComponentSlot<T extends { id: string; name: string; price: number; imageUrl?: string }>({
  title,
  selected,
  onSelect,
  onRemove,
  renderDetails,
}: {
  title: string
  selected: T | null
  onSelect: () => void
  onRemove: () => void
  renderDetails: (item: T) => React.ReactNode
}) {
  return (
    <Card className="p-4 bg-zinc-950 border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        {selected ? (
          <Button size="sm" variant="ghost" onClick={onRemove}>
            <Trash2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button size="sm" variant="outline" onClick={onSelect}>
            <Plus className="w-4 h-4 mr-1" />
            Select
          </Button>
        )}
      </div>
      {selected ? (
        <div className="flex gap-3">
          {selected.imageUrl && (
            <Image
              src={selected.imageUrl || "/placeholder.svg"}
              alt={selected.name}
              width={60}
              height={60}
              className="rounded object-cover"
            />
          )}
          <div className="flex-1">
            <p className="font-medium">{selected.name}</p>
            {renderDetails(selected)}
            <p className="text-sm font-semibold mt-1">${selected.price}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No {title.toLowerCase()} selected</p>
      )}
    </Card>
  )
}

// Selection Dialog Helper
function SelectionDialog<T extends { id: string }>({
  open,
  onOpenChange,
  title,
  items,
  onSelect,
  renderItem,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  items: T[]
  onSelect: (item: T) => void
  renderItem: (item: T) => React.ReactNode
}) {
  const [search, setSearch] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-black border-zinc-800"
        />
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {items
            .filter((item: any) => !search || item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <Card
                key={item.id}
                className="p-3 bg-black border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors"
                onClick={() => onSelect(item)}
              >
                {renderItem(item)}
              </Card>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
