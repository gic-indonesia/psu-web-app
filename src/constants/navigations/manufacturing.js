import { MdOutlineFactory } from 'react-icons/md'

const MANUFACTURING = [
  {
    title: 'Manufaktur',
    path: '/manufacturing',
    icon: <MdOutlineFactory className='w-[23px]'/>,
    submenu: true,
    subMenuItems: [
      { title: 'Formula Produksi', path: '/manufacturing/production-formula' },
    ],
  },
]

export default MANUFACTURING;