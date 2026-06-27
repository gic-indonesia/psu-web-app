import { HomeIcon } from "@heroicons/react/24/outline";

const HOME = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeIcon className="w-6 h-6"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Produk Jadi', path: '/dashboard/finish-good' },
      { title: 'Produk Feed Block', path: '/dashboard/feed-block' },
      { title: 'Produk SWIP', path: '/dashboard/swip' },
      { title: 'Bahan Baku', path: '/dashboard/raw-material' },
      { title: 'Penjualan', path: '/dashboard/sales' },
    ],
  },
]

export default HOME;