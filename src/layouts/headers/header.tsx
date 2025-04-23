"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@hooks/use-scroll"
import { useState } from "react";
import { UserDropdown } from "@shared/components/dropdowns";
import NextImage from "@src/shared/components/NextImage";
import { useAppSelector } from "@src/hooks/redux";

import { cn } from '@lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const { userData } = useAppSelector((state) => state.authStore)
  const selectedLayout = useSelectedLayoutSegment();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function getUserAlias() {
    if (!userData) {
      return '';
    }
    const arrayText = userData.fullname.split(' ');
    if (arrayText.length > 0) {
      let alias = Array.from(arrayText[0])[0];

      for (let i = 1; i < arrayText.length; i += 1) {
        if (alias.length === 2) {
          break;
        }
        alias = `${alias}${Array.from(arrayText[i])[0]}`
      }

      return alias;
    } else {
      return '';
    }
  }
  
  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-10 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200 bg-white': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <NextImage
              src='/assets/psu.png'
              className="mx-auto h-10 w-auto justify-center items-center"
              width='40'
              height='40'
              alt="PSU Logo"
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <div
            className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center hover:cursor-pointer hover:bg-gray-400"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="font-semibold text-sm">
              {getUserAlias()}
            </span>
          </div>
          <UserDropdown
            isOpen={showDropdown}
            setIsOpen={setShowDropdown}
          />
        </div>
      </div>
    </div>
  )
}

export default Header;