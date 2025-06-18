/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SIDENAV_ITEMS from "@src/constants/navigations/side-nav-items";
import { SideNavItem } from "@shared/types/side-nav-items";
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion, useCycle } from "framer-motion";
import { cn } from "@src/lib/utils";
import { AuthService } from "@src/modules/auth/services";
import { StorageService } from "@src/shared/local-storage";
import { useRouter } from "next/navigation";
import { Label } from "@src/components/ui/label";

type MenuItemWithSubMenuProps = {
  item: SideNavItem;
  toggleOpen: () => void;
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const HeaderMobile = () => {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const router = useRouter();

  const handleLogout = () => {
    AuthService()
      .logout()
      .then(() => {
        const storageService = StorageService()
        storageService.drop();
        router.push('/')
      })
      .catch((e) => {
        console.error(e);
      })
  }

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={`fixed inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      {/* Background Overlay */}
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar}
      />
      {/* Menu Items */}
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-4 px-6 py-16 max-h-screen overflow-y-auto"
      >
        {SIDENAV_ITEMS.map((item: SideNavItem, idx) => {
          const isLastItem = idx === SIDENAV_ITEMS.length - 1;
          const isActive = item.path === pathname;
          return (
            <div key={idx}>
              {item.submenu ? (
                <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
              ) : (
                <MenuItem
                  className={cn(
                    "flex gap-1 items-center px-2 w-full rounded-md",
                    isActive ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  <Link
                    href={item.path}
                    onClick={() => toggleOpen()}
                    className={`p-2 rounded-lg flex w-full text-lg font-medium transition`}
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              )}

              {!isLastItem && (
                <MenuItem className="my-2 h-px w-full bg-gray-300" />
              )}
            </div>
          );
        })}
        <div onClick={() => handleLogout()}>
          <MenuItem className="h-px w-full bg-gray-300" />
          <MenuItem
            className={cn(
              "flex gap-1 items-center px-2 w-full mt-4 rounded-md",
            )}
          >
            <ArrowRightStartOnRectangleIcon className="w-6 h-6"/>
            <Label className='p-2 rounded-lg flex w-full text-lg font-medium transition'>
              Logout
            </Label>
          </MenuItem>
        </div>
      </motion.ul>
      {/* Menu Toggle Button */}
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

export default HeaderMobile;

// Menu Toggle Button
const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-4 top-[14px] z-30"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

// Path Component for Menu Toggle
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// Menu Item Component
const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

// Menu Item with Submenu
const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <MenuItem>
        <button
          className={`p-2 rounded-lg flex w-full text-lg font-medium transition`}
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <div className="flex flex-row justify-between w-full items-center">
            <div className="flex flex-row items-center gap-3">
              {item.icon}
              <span>
                {item.title}
              </span>
            </div>
            <div
              className={`transform transition-transform ${
                subMenuOpen && "rotate-180"
              }`}
            >
              <ChevronDownIcon className="h-5 w-5" />
            </div>
          </div>
        </button>
      </MenuItem>
      <div className={`mt-2 ml-3 flex flex-col rounded-md space-y-2`}>
        {subMenuOpen && (
          <>
            {item.subMenuItems?.map((subItem, subIdx) => {
              const isActive = pathname === subItem.path;
              return (
                <MenuItem
                  key={subIdx}
                  className={cn(
                    "w-full px-4 py-2 rounded-md",
                    isActive ? "bg-gray-100" : "hover:bg-gray-100"
                  )}
                >
                  <Link
                    href={subItem.path}
                    onClick={() => toggleOpen()}
                    className="block w-full text-sm font-medium"
                  >
                    {subItem.title}
                  </Link>
                </MenuItem>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

// Variants for Menu Items
const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

// Variants for the Menu
const variants = {
  open: {
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

// Hook to Get Dimensions
const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};