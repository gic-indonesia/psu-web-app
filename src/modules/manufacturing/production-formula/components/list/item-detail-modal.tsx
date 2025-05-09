'use client'

import { Modal } from "@src/shared/components/modals";
import { Badge } from "@src/components/ui/badge";
import { Label, MarqueeText } from "@src/shared/components/topography";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { useRef } from "react";
import { toCurrency } from "@src/lib/utils";
import { IItemDetail } from "../../models/production-formula-detail.model";

const ItemDetailModal = (props: { data: IItemDetail, isOpen: boolean, onCancel: () => void }) => {
  const { data, isOpen, onCancel } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);

  return (
    <Modal
      open={isOpen}
      title='Detail Formula Produksi'
      onClose={onCancel}
    >
      <ScrollArea className="h-[500px] w-[380px] mt-3">
        <div className='bg-white pt-5'>
          <div className='sm:flex sm:items-start'>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Nomor</Label>
              </div>
              <Badge
                variant='outline'
                ref={containerRef2}
                className="marquee-container text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                <MarqueeText
                  text={data.number}
                  containerRef={containerRef2 as React.RefObject<HTMLDivElement>}
                  className="text-sm text-white"
                />
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Cabang</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {data.branchName}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Produk Utama</Label>
              </div>
              <Badge
                variant='outline'
                ref={containerRef}
                className="marquee-container text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                <MarqueeText
                  text={data.item.name}
                  containerRef={containerRef as React.RefObject<HTMLDivElement>}
                  className="text-sm text-white"
                />
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Kuantitas</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {data.quantity}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Satuan Barang</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {data.itemUnit.name}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Persetujuan</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {'Tidak'}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Bahan Baku</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {toCurrency(data.totalMaterial)}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Biaya</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {toCurrency(data.totalExpense)}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Total</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {toCurrency(data.totalAmount)}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Produk Utama</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {toCurrency(data.totalFinishGood)}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Produk Lainnya</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {toCurrency(data.totalExtraFinishGood)}
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Keterangan</Label>
              </div>
              <Badge
                variant='outline'
                ref={containerRef3}
                className="marquee-container text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                <MarqueeText
                  text={data.description}
                  containerRef={containerRef3 as React.RefObject<HTMLDivElement>}
                  className="text-sm text-white"
                />
              </Badge>
            </div>
            <div className='flex space-x-1 items-center text-left mt-1'>
              <div className="w-[150px]">
                <Label>Pembuat Data</Label>
              </div>
              <Badge
                variant='outline'
                className="text-sm text-white outline-white border-white bg-amber-500 w-[200px]"
              >
                {'-'}
              </Badge>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className='px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={onCancel}
        >
          Batal
        </button>
      </div>
    </Modal>
  )
}

export default ItemDetailModal;