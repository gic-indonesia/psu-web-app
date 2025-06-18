import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

const MANUFACTURING = [
  {
    title: 'Manufaktur',
    path: '/manufacturing',
    icon: <BuildingOffice2Icon className="w-6 h-6"/>,
    submenu: true,
    subMenuItems: [
      { title: 'Formula Produksi', path: '/manufacturing/production-formula' },
    ],
  },
]

export default MANUFACTURING;