import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNewDeliveryPersonStore } from '@/store/deliveryperson/deliveryperson-store';
import CreateDeliveryPersonForm, { FormValues } from './create-deliveryPerson-form';
import { CreateDeliveryPetson } from '@/http/api';
import { DeliveryPerson } from '@/types';

const DeliveryPersonSheet = () => {

    const { isOpen, onClose } = useNewDeliveryPersonStore();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-delivery-person'],
        mutationFn: (data: DeliveryPerson) => CreateDeliveryPetson(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delivery-persons'] });
           toast.success('Delivery person created successfully.')
            onClose();
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values as unknown as DeliveryPerson)
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Delivery Person</SheetTitle>
                    <SheetDescription>Create a new delivery person</SheetDescription>
                </SheetHeader>
                <CreateDeliveryPersonForm onSubmit={onSubmit} disabled={isPending} />
            </SheetContent>
        </Sheet>
    );
};

export default DeliveryPersonSheet;