"use client";

import { DataTable } from '@/components/data-table';
import useWorkerTable from '@/hooks/useWorkerTable';
import { columns } from './columns';


export default function WorkerTableClient() {
    const { data, isLoading, refetch, dataUpdatedAt } = useWorkerTable();
    return (
        <DataTable
            columns={columns}
            data={data || []}
            loading={isLoading}
        />
    )
}
