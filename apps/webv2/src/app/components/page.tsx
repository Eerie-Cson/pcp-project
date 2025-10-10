```tsx file="app/components/page.tsx"
"use client"

import { useState } from "react"
import { useQuery } from "urql"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import {
  GET_CPUS,
  GET_MOTHERBOARDS,
  GET_MEMORY,
  GET_STORAGES,
  GET_VIDEO_CARDS,
  GET_CASES,
  GET_POWER_SUPPLIES,
} from "@/lib/graphql/queries"
import type { CPU, Motherboard, Memory, Storage, VideoCard, Case, PowerSupply } from "@/lib/graphql/types"
import { ComponentCard } from "@/components/component-card"

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("cpus")

  const [{ data: cpuData, fetching: cpuFetching }] = useQuery({ query: GET_CPUS })
  const [{ data: motherboardData, fetching: motherboardFetching }] = useQuery({ query: GET_MOTHERBOARDS })
  const [{ data: memoryData, fetching: memoryFetching }] = useQuery({ query: GET_MEMORY })
  const [{ data: storageData, fetching: storageFetching }] = useQuery({ query: GET_STORAGES })
  const [{ data: videoCardData, fetching: videoCardFetching }] = useQuery({ query: GET_VIDEO_CARDS })
  const [{ data: caseData, fetching: caseFetching }] = useQuery({ query: GET_CASES })
  const [{ data: powerSupplyData, fetching: powerSupplyFetching }] = useQuery({ query: GET_POWER_SUPPLIES })

  const cpus: CPU[] = cpuData?.CPUs || []
  const motherboards: Motherboard[] = motherboardData?.motherboards || []
  const memory: Memory[] = memoryData?.memorys || []
  const storage: Storage[] = storageData?.storages || []
  const videoCards: VideoCard[] = videoCardData?.videoCards || []
  const cases: Case[] = caseData?.cases || []
  const powerSupplies: PowerSupply[] = powerSupplyData?.powerSupplies || []

  const filterComponents = <T extends { name: string; manufacturer: string }>(components: T[]) => {
    if (!searchQuery) return components
    return components.filter(
      (component) =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const filteredCpus = filterComponents(cpus)
  const filteredMotherboards = filterComponents(motherboards)
  const filteredMemory = filterComponents(memory)
  const filteredStorage = filterComponents(storage)
  const filteredVideoCards = filterComponents(videoCards)
  const filteredCases = filterComponents(cases)
  const filteredPowerSupplies = filterComponents(powerSupplies)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Browse Components</h1>
              <p className="text-muted-foreground">Explore all available PC components</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="cpus">CPUs</TabsTrigger>
            <TabsTrigger value="motherboards">Motherboards</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="video-cards">Video Cards</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="power-supplies">PSUs</TabsTrigger>
          </TabsList>

          <TabsContent value="cpus" className="mt-6">
            {cpuFetching ? (
              <div className="text-center py-12 text-muted-foreground">Loading CPUs...</div>
            ) : filteredCpus.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No CPUs found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCpus.map((cpu) => (
                  <ComponentCard
                    key={cpu.id}
                    name={cpu.name}
                    manufacturer={cpu.manufacturer}
                    price={cpu.price}
                    imageUrl={cpu.imageUrl}
                    specs={[
                      { label: "Socket", value: cpu.socket },
                      { label: "Cores/Threads", value: \`${cpu.cores}/${cpu.threads}\` },
                      { label: "Base Clock", value: \`${cpu.baseClock} GHz\` },
                      { label: "Boost Clock", value: cpu.boostClock ? \`${cpu.boostClock} GHz\` : "N/A" },
                      { label: "TDP", value: \`${cpu.tdp}W\` },
                    ]}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="motherboards" className="mt-6">
            {motherboardFetching ? (
              <div className="text-center py-12 text-muted-foreground">Loading Motherboards...</div>
            ) : filteredMotherboards.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No motherboards found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMotherboards.map((mb) => (
                  <ComponentCard
                    key={mb.id}
                    name={mb.name}
                    manufacturer={mb.manufacturer}
                    price={mb.price}
                    imageUrl={mb.imageUrl}
                    specs={[
                      { label: "Socket", value: mb.socket },
                      { label: "Form Factor", value: mb.formFactor },
                      { label: "Chipset", value: mb.chipset },
                      { label: "Memory", value: \`${mb.memoryType} (${mb.memorySlots} slots)\` },
                      { label: "Max Memory", value: \`${mb.maxMemory}GB\` },
                    ]}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="memory" className="mt-6">
            {memoryFetching ? (
              <div className="text-center py-12 text-muted-foreground">Loading Memory...</div>
            ) : filteredMemory.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No memory found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMemory.map((mem) => (
                  <ComponentCard
                    key={mem.id}
                    name={mem.name}
                    manufacturer={mem.manufacturer}
                    price={mem.price}
                    imageUrl={mem.imageUrl}
                    specs={[
                      { label: "Type", value: mem.type },
                      { label: "Speed", value: \`${mem.speed} MHz\` },
                      { label: "Capacity", value: \`${mem.capacity}GB\` },
                      { label: "Modules", value: \`${mem.modules}x${mem.capacity / mem.modules}GB\` },
                    ]}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            {storageFetching ? (
              <div className="text-center py-12 text-muted-foreground">Loading Storage...</div>
            ) : filteredStorage.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No storage found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStorage.map((stor) => (
                  <ComponentCard
                    key={stor.id}
                    name={stor.name}
                    manufacturer={stor.manufacturer}
                    price={stor.price}
                    imageUrl={stor.imageUrl}
                    specs={[
                      { label: "Type", value: stor.type },
                      { label: "Capacity", value: \`${stor.capacity}GB\` },
                      { label: "Interface", value: stor.interface },
                      { label: "Form Factor", value: stor.formFactor },
                    ]}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="video-cards" className="mt-6">
            {videoCardFetching ? (
              <div className="text-center py-12 text-muted-foreground">Loading Video Cards...</div>
            ) : filteredVideoCards.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No video cards found</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideoCards.map((vc) => (
                  <ComponentCard
                    key={vc.id}
                    name={vc.name}
                    manufacturer={vc.manufacturer}
                    price={vc.price}
                    imageUrl={vc.imageUrl}
                    specs={[
                      { label: "Chipset", value: vc.chipset },
                      { label: "Memory", value: \`${vc.memory}GB\` },
                      {
                        label: "Clock Speed",
                        value: vc.boostClock ? \`${vc.coreClock} - ${vc.boostClock} MHz\` : \`${vc.coreClock} MHz`,
},\
{
  label:
  "Length\", value: `${vc.length}mm` },\
                      { label: \"TDP\", value: `${vc.tdp}W` },
                    ]
}
;/>
))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cases" className="mt-6">
{
  caseFetching ? (
    <div className="text-center py-12 text-muted-foreground">Loading Cases...</div>
  ) : filteredCases.length === 0 ? (
    <div className="text-center py-12 text-muted-foreground">No cases found</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCases.map((c) => (
        <ComponentCard
          key={c.id}
          name={c.name}
          manufacturer={c.manufacturer}
          price={c.price}
          imageUrl={c.imageUrl}
          specs={[
            { label: "Type", value: c.type },
            { label: "Form Factor", value: Array.isArray(c.formFactor) ? c.formFactor.join(", ") : c.formFactor },
            { label: "Max GPU Length", value: `${c.maxGpuLength}mm` },
          ]}
        />
      ))}
    </div>
  )
}
</TabsContent>

          <TabsContent value="power-supplies" className="mt-6">
{
  powerSupplyFetching ? (
    <div className="text-center py-12 text-muted-foreground">Loading Power Supplies...</div>
  ) : filteredPowerSupplies.length === 0 ? (
    <div className="text-center py-12 text-muted-foreground">No power supplies found</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPowerSupplies.map((ps) => (
        <ComponentCard
          key={ps.id}
          name={ps.name}
          manufacturer={ps.manufacturer}
          price={ps.price}
          imageUrl={ps.imageUrl}
          specs={[
            { label: "Wattage", value: `${ps.wattage}W` },
            { label: "Efficiency", value: ps.efficiency },
            { label: "Modular", value: ps.modular },
            { label: "Form Factor", value: ps.formFactor },
          ]}
        />
      ))}
    </div>
  )
}
</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
