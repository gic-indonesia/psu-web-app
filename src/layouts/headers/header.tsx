"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@hooks/use-scroll"
import NextImage from "@src/shared/components/NextImage";

import { cn } from '@lib/utils';

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

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
      <div className="flex h-12 items-center justify-between px-4">
        <Link
          href="/"
          className="flex flex-row items-center"
        >
          <NextImage
            src='/assets/psu.png'
            className="h-9 w-auto"
            width='36'
            height='36'
            alt="PSU Logo"
          />
        </Link>
      </div>
    </div>
  )
}

export default Header;
