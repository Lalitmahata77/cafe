import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateWarehouseForm, { FormValues } from './create-warehouse-form';
import { useNewWarehouseStore } from '@/store/warehouse/warehouse-store';
import { toast } from "sonner"
import { createWarehouse } from '@/http/api';
// import { Warehouse } from '@/types';

const WarehouseSheet = () => {

    const { isOpen, onClose } = useNewWarehouseStore();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-warehouse'],
        mutationFn: (data: FormData) => createWarehouse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['warehouses'] });
            toast.success("Warehouse has been created.")
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        // mutate(values as Warehouse);

        const formData = new FormData()
        formData.append('name', values.name);
        formData.append('pincode', values.pincode);
        mutate(formData)
        // mutate(FormData)
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Warehouse</SheetTitle>
                    <SheetDescription>Create a new warehouse</SheetDescription>
                </SheetHeader>
                <CreateWarehouseForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
    );
};

export default WarehouseSheet;


