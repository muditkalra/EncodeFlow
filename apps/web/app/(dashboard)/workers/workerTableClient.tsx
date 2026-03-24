"use client";

import { DataTable } from '@/components/DataTable';
import useWorkerTable from '@/hooks/useWorkerTable';
import { columns } from './columns';


export default function WorkerTableClient() {
    const { data, isLoading, dataUpdatedAt } = useWorkerTable();
    return (
        <DataTable
            columns={columns}
            data={data || []}
            loading={isLoading}
            toolBar={{
                refetch: {
                    lastUpdatedAt: dataUpdatedAt
                }
            }}
        />
    )
}
