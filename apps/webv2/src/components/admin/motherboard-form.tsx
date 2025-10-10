'use client';

import type React from 'react';

import type {
  CreateMotherboardInput,
  Motherboard,
  UpdateMotherboardInput,
} from '@/lib/graphql/types';
import { Button } from '@/src/components/ui/button';@/src/lib/graphql/types
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useState } from 'react';

interface MotherboardFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  motherboard?: Motherboard | null;
  onSubmit: (
    data: CreateMotherboardInput | UpdateMotherboardInput,
  ) => Promise<void>;
  isLoading?: boolean;
}

export function MotherboardForm({
  open,
  onOpenChange,
  motherboard,
  onSubmit,
  isLoading,
}: MotherboardFormProps) {
  const [formData, setFormData] = useState<CreateMotherboardInput>({
    name: motherboard?.name || '',
    manufacturer: motherboard?.manufacturer || '',
    socket: motherboard?.socket || '',
    formFactor: motherboard?.formFactor || '',
    chipset: motherboard?.chipset || '',
    memoryType: motherboard?.memoryType || '',
    memorySlots: motherboard?.memorySlots || 0,
    maxMemory: motherboard?.maxMemory || 0,
    price: motherboard?.price || 0,
    imageUrl: motherboard?.imageUrl || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {motherboard ? 'Edit Motherboard' : 'Create New Motherboard'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socket">Socket *</Label>
              <Input
                id="socket"
                value={formData.socket}
                onChange={(e) =>
                  setFormData({ ...formData, socket: e.target.value })
                }
                placeholder="e.g., AM5, LGA1700"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formFactor">Form Factor *</Label>
              <Input
                id="formFactor"
                value={formData.formFactor}
                onChange={(e) =>
                  setFormData({ ...formData, formFactor: e.target.value })
                }
                placeholder="e.g., ATX, Micro-ATX"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chipset">Chipset *</Label>
              <Input
                id="chipset"
                value={formData.chipset}
                onChange={(e) =>
                  setFormData({ ...formData, chipset: e.target.value })
                }
                placeholder="e.g., X670, Z790"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memoryType">Memory Type *</Label>
              <Input
                id="memoryType"
                value={formData.memoryType}
                onChange={(e) =>
                  setFormData({ ...formData, memoryType: e.target.value })
                }
                placeholder="e.g., DDR5, DDR4"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memorySlots">Memory Slots *</Label>
              <Input
                id="memorySlots"
                type="number"
                value={formData.memorySlots}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    memorySlots: Number.parseInt(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMemory">Max Memory (GB) *</Label>
              <Input
                id="maxMemory"
                type="number"
                value={formData.maxMemory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxMemory: Number.parseInt(e.target.value),
                  })
                }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: Number.parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : motherboard
                  ? 'Update Motherboard'
                  : 'Create Motherboard'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
