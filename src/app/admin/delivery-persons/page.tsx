'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { columns } from './_components/columns';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { Loader2 } from 'lucide-react';
import { DataTable } from '../_components/data-table';
import { useNewDeliveryPersonStore } from '@/store/deliveryperson/deliveryperson-store';
import { getAllDeliveryPerson } from '@/http/api';
import DeliveryPersonSheet from './_components/deliveryPerson-sheet';

const DeliveryPersonsPage = () => {
    const { onOpen } = useNewDeliveryPersonStore();

    const {
        data: deliveryPersons,
        isLoading,
        isError,
    } = useQuery<Product[]>({
        queryKey: ['delivery-persons'],
        queryFn: getAllDeliveryPerson,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Delivery Persons</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Delivery Person
                </Button>
                <DeliveryPersonSheet />
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={deliveryPersons || []} />
            )}
        </>
    );
};

export default DeliveryPersonsPage;