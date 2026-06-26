'use client'

import { Modal } from "@src/shared/components/modals";
import { Badge } from "@src/components/ui/badge";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { toCurrency } from "@src/lib/utils";
import { ISalesOrderListDetailModel } from "../../models/sales-order-detail.model";

const DetailRow = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <div className="flex items-start justify-between gap-3 py-1.5 border-b border-gray-100">
      <span className="shrink-0 text-sm font-medium text-gray-600">{label}</span>
      <Badge
        variant="outline"
        className="max-w-[60%] whitespace-normal break-words bg-amber-500 text-right text-sm text-white"
      >
        {value}
      </Badge>
    </div>
  );
};

const ItemDetailModal = (props: { data: ISalesOrderListDetailModel, isOpen: boolean, onCancel: () => void }) => {
  const { data, isOpen, onCancel } = props;

  return (
    <Modal
      open={isOpen}
      title='Detail Pesanan Penjualan'
      onClose={onCancel}
    >
      <ScrollArea className="w-full max-h-[65vh]">
        <div className="w-full pt-2">
          <DetailRow label="Nomor" value={data.number} />
          <DetailRow label="Tanggal" value={data.transDate} />
          <DetailRow label="Pelanggan" value={data.customer.name} />
          <DetailRow label="Mata Uang" value={data.currency.code} />
          <DetailRow label="No. PO" value={data.poNumber ?? '-'} />
          <DetailRow label="Syarat Pembayaran" value={data.paymentTerm.name} />
          <DetailRow label="Tanggal Pengiriman" value={data.shipDate} />
          <DetailRow label="Keterangan" value={data.description} />
          <DetailRow label="Status" value={data.statusName} />
          <DetailRow label="Total" value={toCurrency(data.totalAmount)} />
        </div>
      </ScrollArea>
      <div className='pt-4'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          onClick={onCancel}
        >
          Batal
        </button>
      </div>
    </Modal>
  )
}

export default ItemDetailModal;
