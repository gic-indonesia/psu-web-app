'use client'

import { Fragment, ReactNode, useEffect } from "react";
import { Header, HeaderMobile } from "@layouts/headers";
import { MarginWidthWrapper, PageWrapper } from "@layouts/wrappers";
import { isUserLoggedIn, isTokenExpired } from "@lib/utils";

import { handleLogout } from "@modules/auth/stores/auth.store";
import { useAppDispatch } from "@hooks/redux";
import { usePathname, useRouter } from "next/navigation";

export default function Main(props: { children: ReactNode }) {
  const { children } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const blockAccess = !isUserLoggedIn() && !(pathname === '/auth')

  useEffect(() => {
    if (blockAccess) {
      router.push(`/auth?to=/dashboard/sales`)
    }
  }, [blockAccess, router, pathname])

  if (blockAccess) {
    return null;
  }

  if (isTokenExpired() && !(pathname === '/auth')) {
    dispatch(handleLogout());
    return null;
  }
  return (
    <Fragment>
      {
        !isTokenExpired() && !(pathname === '/auth') ? (
          <main className="flex min-h-screen justify-center bg-zinc-100">
            <div className="relative w-full max-w-[480px] bg-white shadow-sm">
              <MarginWidthWrapper>
                <Header/>
                <HeaderMobile/>
                <PageWrapper>
                  {children}
                </PageWrapper>
              </MarginWidthWrapper>
            </div>
          </main>
        ) : (
          <main className="bg-zinc-100">
            <section className="flex min-h-screen justify-center">
              <div className="relative flex w-full max-w-[480px] flex-col items-center justify-center bg-white px-4 py-12 shadow-sm">
                {children}
              </div>
            </section>
          </main>
        )
      }
    </Fragment>
  )
}