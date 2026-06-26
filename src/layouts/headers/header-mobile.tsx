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
import NextImage from "@src/shared/components/NextImage";

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
    clipPath: "circle(0px at calc(100% - 2rem) 2rem)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const isChildActive = (item: SideNavItem, pathname: string) =>
  item.subMenuItems?.some(
    (sub) => pathname === sub.path || pathname.startsWith(`${sub.path}/`)
  ) ?? false;

const HeaderMobile = () => {
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
      className={`fixed inset-0 z-50 mx-auto w-full max-w-[480px] md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      {/* Background Overlay */}
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar}
      />

      {/* Menu Panel */}
      <motion.div
        variants={panelVariants}
        className="absolute inset-0 flex flex-col"
      >
        {/* Branded header */}
        <div className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-100 px-5">
          <NextImage
            src="/assets/psu.png"
            className="h-8 w-auto"
            width="32"
            height="32"
            alt="PSU Logo"
          />
          <span className="text-base font-bold tracking-tight text-gray-800">
            PSU <span className="font-medium text-amber-600">App</span>
          </span>
        </div>

        {/* Items */}
        <motion.ul
          variants={listVariants}
          className="flex-1 space-y-1.5 overflow-y-auto px-4 py-5"
        >
          {SIDENAV_ITEMS.map((item: SideNavItem, idx) => {
            return (
              <MenuItemRow key={idx}>
                {item.submenu ? (
                  <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
                ) : (
                  <SingleLink item={item} toggleOpen={toggleOpen} />
                )}
              </MenuItemRow>
            );
          })}
        </motion.ul>

        {/* Logout footer */}
        <motion.div
          variants={MenuItemVariants}
          className="shrink-0 border-t border-gray-100 px-4 py-4"
        >
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-red-50 active:bg-red-100"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold text-red-600">Logout</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Menu Toggle Button */}
      <MenuToggle isOpen={isOpen} toggle={toggleOpen} />
    </motion.nav>
  );
};

export default HeaderMobile;

// Menu Toggle Button
const MenuToggle = ({ toggle, isOpen }: { toggle: any; isOpen: boolean }) => (
  <button
    onClick={toggle}
    aria-label={isOpen ? "Tutup menu" : "Buka menu"}
    className="pointer-events-auto absolute right-3 top-1.5 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-white/70 backdrop-blur-sm transition-colors hover:bg-amber-50 active:bg-amber-100"
  >
    <svg width="22" height="22" viewBox="0 0 23 23">
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
    strokeWidth="2.2"
    stroke="#d97706"
    strokeLinecap="round"
    {...props}
  />
);

// Animated list-row wrapper
const MenuItemRow = ({ children }: { children?: ReactNode }) => {
  return (
    <motion.li variants={MenuItemVariants}>
      {children}
    </motion.li>
  );
};

// Single (no submenu) link
const SingleLink = ({
  item,
  toggleOpen,
}: {
  item: SideNavItem;
  toggleOpen: () => void;
}) => {
  const pathname = usePathname();
  const isActive = item.path === pathname;
  return (
    <Link
      href={item.path}
      onClick={() => toggleOpen()}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
        isActive ? "bg-amber-50 ring-1 ring-amber-200" : "hover:bg-gray-50"
      )}
    >
      <ItemIcon icon={item.icon} active={isActive} />
      <span
        className={cn(
          "text-base font-semibold",
          isActive ? "text-amber-700" : "text-gray-700"
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};

// Icon chip
const ItemIcon = ({ icon, active }: { icon?: ReactNode; active: boolean }) => (
  <span
    className={cn(
      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors [&>svg]:h-5 [&>svg]:w-5",
      active ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
    )}
  >
    {icon}
  </span>
);

// Menu Item with Submenu
const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
  item,
  toggleOpen,
}) => {
  const pathname = usePathname();
  const parentActive = isChildActive(item, pathname);
  const [subMenuOpen, setSubMenuOpen] = useState(parentActive);

  return (
    <>
      <button
        type="button"
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors",
          parentActive ? "bg-amber-50/60" : "hover:bg-gray-50"
        )}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <ItemIcon icon={item.icon} active={parentActive} />
        <span
          className={cn(
            "flex-1 text-left text-base font-semibold",
            parentActive ? "text-amber-700" : "text-gray-700"
          )}
        >
          {item.title}
        </span>
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 text-gray-400 transition-transform duration-200",
            subMenuOpen && "rotate-180 text-amber-600"
          )}
        />
      </button>

      <motion.div
        initial={false}
        animate={{
          height: subMenuOpen ? "auto" : 0,
          opacity: subMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="my-1 ml-7 flex flex-col gap-0.5 border-l border-gray-200 pl-3">
          {item.subMenuItems?.map((subItem, subIdx) => {
            const isActive = pathname === subItem.path;
            return (
              <Link
                key={subIdx}
                href={subItem.path}
                onClick={() => toggleOpen()}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "font-semibold text-amber-700"
                    : "font-medium text-gray-600 hover:bg-gray-50"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                    isActive ? "bg-amber-600" : "bg-gray-300"
                  )}
                />
                {subItem.title}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

// Variants for individual rows
const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 30,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

// Variants for the list (stagger children)
const listVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

// Variants for the whole panel (hide instantly when closed so it doesn't block taps)
const panelVariants = {
  open: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.2 },
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
