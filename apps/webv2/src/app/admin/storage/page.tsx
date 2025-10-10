'use client';

import { useToast } from '@/hooks/use-toast';
import {
  CREATE_STORAGE,
  DELETE_STORAGE,
  UPDATE_STORAGE,
} from '@/lib/graphql/mutations';
import { GET_STORAGES } from '@/lib/graphql/queries';
import type { Storage } from '@/lib/graphql/types';
import { ComponentTable } from '@/src/components/admin/component-table';
import { GenericComponentForm @/src/lib/graphql/queriesnts/admin/generic-component-form';
import {@/src/lib/graphql/mutations
  AlertDialog,@/src/lib/graphql/types
  AlertDialogAction,@/src/hooks/use-toast
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/src/components/ui/alert-dialog';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';

export default function StoragePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [storageToDelete, setStorageToDelete] = useState<Storage | null>(null);

  const [{ data, fetching }, refetch] = useQuery({ query: GET_STORAGES });
  const [, createStorage] = useMutation(CREATE_STORAGE);
  const [, updateStorage] = useMutation(UPDATE_STORAGE);
  const [, deleteStorage] = useMutation(DELETE_STORAGE);

  useEffect(() => {
    const role = localStorage.getItem('user_role');
    if (role !== 'admin') {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  const storageList: Storage[] = data?.storages || [];
  const filteredStorage = storageList.filter(
    (storage) =>
      storage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      storage.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      storage.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = () => {
    setSelectedStorage(null);
    setIsFormOpen(true);
  };

  const handleEdit = (storage: Storage) => {
    setSelectedStorage(storage);
    setIsFormOpen(true);
  };

  const handleDelete = (storage: Storage) => {
    setStorageToDelete(storage);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!storageToDelete) return;

    const result = await deleteStorage({ id: storageToDelete.id });

    if (result.error) {
      toast({
        title: 'Error',
        description: 'Failed to delete storage',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Storage deleted successfully',
      });
      refetch();
    }

    setDeleteDialogOpen(false);
    setStorageToDelete(null);
  };

  const handleSubmit = async (formData: any) => {
    if (selectedStorage) {
      const result = await updateStorage({
        id: selectedStorage.id,
        updateStorageInput: formData,
      });

      if (result.error) {
        toast({
          title: 'Error',
          description: 'Failed to update storage',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Storage updated successfully',
        });
        refetch();
      }
    } else {
      const result = await createStorage({
        createStorageInput: formData,
      });

      if (result.error) {
        toast({
          title: 'Error',
          description: 'Failed to create storage',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Storage created successfully',
        });
        refetch();
      }
    }
  };

  const columns = [
    { key: 'name' as keyof Storage, label: 'Name' },
    { key: 'manufacturer' as keyof Storage, label: 'Manufacturer' },
    { key: 'type' as keyof Storage, label: 'Type' },
    {
      key: 'capacity' as keyof Storage,
      label: 'Capacity',
      render: (value: any) => `${value}GB`,
    },
    { key: 'interface' as keyof Storage, label: 'Interface' },
    { key: 'formFactor' as keyof Storage, label: 'Form Factor' },
    {
      key: 'price' as keyof Storage,
      label: 'Price',
      render: (value: any) => `$${value.toFixed(2)}`,
    },
  ];

  const formFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    {
      name: 'manufacturer',
      label: 'Manufacturer',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., SSD, HDD, NVMe',
    },
    {
      name: 'capacity',
      label: 'Capacity (GB)',
      type: 'number' as const,
      required: true,
    },
    {
      name: 'interface',
      label: 'Interface',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., SATA, NVMe',
    },
    {
      name: 'formFactor',
      label: 'Form Factor',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., 2.5", M.2',
    },
    {
      name: 'price',
      label: 'Price ($)',
      type: 'number' as const,
      required: true,
      step: '0.01',
    },
    { name: 'imageUrl', label: 'Image URL', type: 'text' as const },
  ];

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
              <h1 className="text-2xl font-bold">Storage Management</h1>
              <p className="text-muted-foreground">Manage storage devices</p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Storage
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search storage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredStorage}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <GenericComponentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          item={selectedStorage}
          onSubmit={handleSubmit}
          title="Storage"
          fields={formFields}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {storageToDelete?.name}. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
