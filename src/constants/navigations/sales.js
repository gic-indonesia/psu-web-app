import { GiMoneyStack } from 'react-icons/gi'

const SALES = [
  {
    title: 'Penjualan',
    path: '/sales',
    icon: <GiMoneyStack className='w-[23px]'/>,
    submenu: true,
    subMenuItems: [
      { title: 'Pesanan Penjualan', path: '/sales/sales-order' },
    ],
  },
]

export default SALES;