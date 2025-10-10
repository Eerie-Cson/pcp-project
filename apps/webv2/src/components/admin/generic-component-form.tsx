'use client';

import type React from 'react';

import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useEffect, useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number';
  required?: boolean;
  placeholder?: string;
  step?: string;
}

interface GenericComponentFormProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: T | null;
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  title: string;
  fields: FormField[];
}

export function GenericComponentForm<T extends Record<string, any>>({
  open,
  onOpenChange,
  item,
  onSubmit,
  isLoading,
  title,
  fields,
}: GenericComponentFormProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const initialData: Record<string, any> = {};
    fields.forEach((field) => {
      initialData[field.name] =
        item?.[field.name] || (field.type === 'number' ? 0 : '');
    });
    setFormData(initialData);
  }, [item, fields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onOpenChange(false);
  };

  const handleChange = (name: string, value: string, type: string) => {
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number.parseFloat(value) || 0 : value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {item ? `Edit ${title}` : `Create New ${title}`}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={
                  field.name === 'imageUrl' || field.name === 'details'
                    ? 'col-span-2'
                    : ''
                }
              >
                <Label htmlFor={field.name}>
                  {field.label} {field.required && '*'}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  step={field.step}
                  value={formData[field.name] || ''}
                  onChange={(e) =>
                    handleChange(field.name, e.target.value, field.type)
                  }
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            ))}
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
                : item
                  ? `Update ${title}`
                  : `Create ${title}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
