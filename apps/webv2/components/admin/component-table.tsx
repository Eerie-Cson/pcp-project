"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

interface ComponentTableProps<T> {
  data: T[]
  columns: {
    key: keyof T
    label: string
    render?: (value: any, item: T) => React.ReactNode
  }[]
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  isLoading?: boolean
}

export function ComponentTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  isLoading,
}: ComponentTableProps<T>) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="p-8 text-center text-muted-foreground">Loading components...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card">
        <div className="p-8 text-center text-muted-foreground">No components found. Create your first one!</div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="text-foreground font-semibold">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-border hover:bg-muted/50">
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render ? column.render(item[column.key], item) : String(item[column.key] ?? "-")}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
