// 'use client';

// import { Button } from '@/components/ui/button';
// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import {  Warehouse } from '@/types';
// import { Loader2 } from 'lucide-react';
// import { useNewWarehouseStore } from '@/store/warehouse/warehouse-store';
// import { DataTable } from '../_components/data-table';
// import WarehouseSheet from './_components/warehouse-sheet';
// import { columns } from './_components/columns';
// import { getAllWarehouses } from '@/http/api';

// const WarehousesPage = () => {
//     const { onOpen } = useNewWarehouseStore();

//     const {
//         data: warehouses,
//         isLoading,
//         isError,
//     } = useQuery<Warehouse[]>({
//         queryKey: ['warehouses'],
//         queryFn: getAllWarehouses,
//     });

//     return (
//         <>
//             <div className="flex items-center justify-between">
//                 <h3 className="text-2xl font-bold tracking-tight">Warehouses</h3>
//                 <Button size={'sm'} onClick={onOpen}>
//                     Add Warehouse
//                 </Button>
//                 <WarehouseSheet />
//             </div>

//             {isError && <span className="text-red-500">Something went wrong.</span>}

//             {isLoading ? (
//                 <div className="flex items-center justify-center">
//                     <Loader2 className="size-10 animate-spin" />
//                 </div>
//             ) : (
//                 <DataTable columns={columns} data={warehouses || []} />
//             )}
//         </>
//     );
// };

// export default WarehousesPage;





'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product} from '@/types';
import { Loader2 } from 'lucide-react';
import { useNewWarehouseStore } from '@/store/warehouse/warehouse-store';
import { DataTable } from '../_components/data-table';
import WarehouseSheet from './_components/warehouse-sheet';
import { columns } from './_components/columns';
import { getAllWarehouses } from '@/http/api';

const WarehousesPage = () => {
    const { onOpen } = useNewWarehouseStore();

    const {
        data: warehouses,
        isLoading,
        isError,
    } = useQuery<Product[]>({
        queryKey: ['warehouses'],
        queryFn: getAllWarehouses,
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Warehouses</h3>
                <Button size={'sm'} onClick={onOpen}>
                    Add Warehouse
                </Button>
            </div>

            {isError && <span className="text-red-500">Something went wrong.</span>}

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader2 className="size-10 animate-spin" />
                </div>
            ) : (
                <DataTable columns={columns} data={warehouses || []} />
            )}

            <WarehouseSheet />
        </>
    );
};

export default WarehousesPage;