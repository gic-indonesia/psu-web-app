'use client'

import { Modal } from "@src/shared/components/modals";
import { Badge } from "@src/components/ui/badge";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { toCurrency } from "@src/lib/utils";
import { IItemDetail } from "../../models/production-formula-detail.model";

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

const ItemDetailModal = (props: { data: IItemDetail, isOpen: boolean, onCancel: () => void }) => {
  const { data, isOpen, onCancel } = props;

  return (
    <Modal
      open={isOpen}
      title='Detail Formula Produksi'
      onClose={onCancel}
    >
      <ScrollArea className="w-full max-h-[65vh]">
        <div className="w-full pt-2">
          <DetailRow label="Nomor" value={data.number} />
          <DetailRow label="Cabang" value={data.branchName} />
          <DetailRow label="Produk Utama" value={data.item.name} />
          <DetailRow label="Kuantitas" value={String(data.quantity)} />
          <DetailRow label="Satuan Barang" value={data.itemUnit.name} />
          <DetailRow label="Persetujuan" value="Tidak" />
          <DetailRow label="Bahan Baku" value={toCurrency(data.totalMaterial)} />
          <DetailRow label="Biaya" value={toCurrency(data.totalExpense)} />
          <DetailRow label="Total" value={toCurrency(data.totalAmount)} />
          <DetailRow label="Produk Utama (Nilai)" value={toCurrency(data.totalFinishGood)} />
          <DetailRow label="Produk Lainnya" value={toCurrency(data.totalExtraFinishGood)} />
          <DetailRow label="Keterangan" value={data.description} />
          <DetailRow label="Pembuat Data" value="-" />
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
