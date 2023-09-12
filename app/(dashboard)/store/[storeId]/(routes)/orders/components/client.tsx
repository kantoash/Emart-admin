import React from 'react'
import { OrderColumn, columns } from './columns'
import { DataTable } from '@/components/input/data-table';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/input/heading';

interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return (
        <>
          <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
          <Separator />
          <DataTable searchKey="products" columns={columns} data={data} />
        </>
      );
}

export default OrderClient