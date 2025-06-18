import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const SALES = [
  {
    title: 'Penjualan',
    path: '/sales',
    icon: <CurrencyDollarIcon className='w-6 h-6'/>,
    submenu: true,
    subMenuItems: [
      { title: 'Pesanan Penjualan', path: '/sales/sales-order' },
    ],
  },
]

export default SALES;