'use client';

import { useToast } from '@/hooks/use-toast';
import { CREATE_CPU, DELETE_CPU, UPDATE_CPU } from '@/lib/graphql/mutations';
import { GET_CPUS } from '@/lib/graphql/queries';
import type { CPU, CreateCPUInput, UpdateCPUInput } from '@/lib/graphql/types';
import { ComponentTable } from '@/src/components/admin/component-table';
import { CPUForm } from '@/src/components/admin/cpu-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,@/src/lib/graphql/queries
  AlertDialogContent,@/src/lib/graphql/mutations
  AlertDialogDescription,@/src/lib/graphql/types
  AlertDialogFooter,@/src/hooks/use-toast
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

export default function CPUsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCPU, setSelectedCPU] = useState<CPU | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cpuToDelete, setCpuToDelete] = useState<CPU | null>(null);

  const [{ data, fetching }, refetch] = useQuery({ query: GET_CPUS });
  const [, createCPU] = useMutation(CREATE_CPU);
  const [, updateCPU] = useMutation(UPDATE_CPU);
  const [, deleteCPU] = useMutation(DELETE_CPU);

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

  const cpus: CPU[] = data?.CPUs || [];
  const filteredCPUs = cpus.filter(
    (cpu) =>
      cpu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cpu.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cpu.socket.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = () => {
    setSelectedCPU(null);
    setIsFormOpen(true);
  };

  const handleEdit = (cpu: CPU) => {
    setSelectedCPU(cpu);
    setIsFormOpen(true);
  };

  const handleDelete = (cpu: CPU) => {
    setCpuToDelete(cpu);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!cpuToDelete) return;

    const result = await deleteCPU({ id: cpuToDelete.id });

    if (result.error) {
      toast({
        title: 'Error',
        description: 'Failed to delete CPU',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'CPU deleted successfully',
      });
      refetch();
    }

    setDeleteDialogOpen(false);
    setCpuToDelete(null);
  };

  const handleSubmit = async (formData: CreateCPUInput | UpdateCPUInput) => {
    if (selectedCPU) {
      const result = await updateCPU({
        id: selectedCPU.id,
        updateCPUInput: formData,
      });

      if (result.error) {
        toast({
          title: 'Error',
          description: 'Failed to update CPU',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'CPU updated successfully',
        });
        refetch();
      }
    } else {
      const result = await createCPU({
        createCPUInput: formData as CreateCPUInput,
      });

      if (result.error) {
        toast({
          title: 'Error',
          description: 'Failed to create CPU',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'CPU created successfully',
        });
        refetch();
      }
    }
  };

  const columns = [
    { key: 'name' as keyof CPU, label: 'Name' },
    { key: 'manufacturer' as keyof CPU, label: 'Manufacturer' },
    { key: 'socket' as keyof CPU, label: 'Socket' },
    {
      key: 'cores' as keyof CPU,
      label: 'Cores/Threads',
      render: (value: any, item: CPU) => `${item.cores}C / ${item.threads}T`,
    },
    {
      key: 'baseClock' as keyof CPU,
      label: 'Clock Speed',
      render: (value: any, item: CPU) =>
        item.boostClock
          ? `${item.baseClock} - ${item.boostClock} GHz`
          : `${item.baseClock} GHz`,
    },
    {
      key: 'tdp' as keyof CPU,
      label: 'TDP',
      render: (value: any) => `${value}W`,
    },
    {
      key: 'price' as keyof CPU,
      label: 'Price',
      render: (value: any) => `$${value.toFixed(2)}`,
    },
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
              <h1 className="text-2xl font-bold">CPU Management</h1>
              <p className="text-muted-foreground">
                Manage processor components
              </p>
            </div>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              Add CPU
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search CPUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ComponentTable
          data={filteredCPUs}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={fetching}
        />

        <CPUForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          cpu={selectedCPU}
          onSubmit={handleSubmit}
        />

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {cpuToDelete?.name}. This action
                cannot be undone.
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
