import { HomeIcon } from "@heroicons/react/24/outline";

const HOME = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <HomeIcon className="w-6 h-6"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Produk', path: '/dashboard/product' },
      { title: 'Penjualan', path: '/dashboard/sales' },
    ],
  },
]

export default HOME;