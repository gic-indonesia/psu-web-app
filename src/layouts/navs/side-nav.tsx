"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SIDENAV_ITEMS from "@src/constants/navigations/side-nav-items";
import { SideNavItem } from "@shared/types/side-nav-items";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import NextImage from "@src/shared/components/NextImage";

const SideNav = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    setActiveMenuIndex(prev => (prev === index ? null : index));
  };
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <NextImage
            src='/assets/psu.png'
            className="mx-auto w-auto justify-center items-center"
            width='50'
            height='50'
            alt="PSU Logo"
          />
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} index={idx} item={item} isOpen={activeMenuIndex === idx} onToggle={handleToggle} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item, index, isOpen, onToggle }: { item: SideNavItem, index: number, isOpen: boolean, onToggle: (index: number) => void }) => {
  const pathname = usePathname();

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={() => onToggle(index)}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-sm flex">{item.title}</span>
            </div>

            <div className='flex'>
              {
                isOpen ? (
                  <ChevronDownIcon/>
                ) : (
                  <ChevronRightIcon/>
                )
              }
            </div>
          </button>

          {isOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname ? 'font-bold' : '' }`}
                  >
                    <span className="text-xs">{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};