'use client'

import dynamic from "next/dynamic";
import { Fragment, ReactNode, useEffect } from "react";
import { Header, HeaderMobile } from "@layouts/headers";
import { MarginWidthWrapper, PageWrapper } from "@layouts/wrappers";
import { isUserLoggedIn, isTokenExpired } from "@lib/utils";
const SideNav = dynamic(() => import('@layouts/navs/side-nav'), {
  ssr: false,
})

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
    console.log('blockAccess: ', blockAccess)
    if (blockAccess) {
      router.push(`/auth?to=/`)
    }
  }, [blockAccess, router, pathname])

  if (blockAccess) {
    return null;
  }

  if (isTokenExpired() && !(pathname === '/auth')) {
    console.log('here2')
    dispatch(handleLogout());
    return null;
  }
  return (
    <Fragment>
      {
        !isTokenExpired() && !(pathname === '/auth') ? (
          <Fragment>
            <main className="flex">
              <SideNav/>
              <div className="flex-1">
                <MarginWidthWrapper>
                  <Header/>
                  <HeaderMobile/>
                  <PageWrapper>
                    {children}
                  </PageWrapper>
                </MarginWidthWrapper>
              </div>
            </main>
          </Fragment>
        ) : (
          <main>
            <section className="bg-white">
              <div className="layout relative flex min-h-screen flex-col items-center justify-center bg-gray-400 py-12 align-middle">
                {children}
              </div>
            </section>
          </main>
        )
      }
    </Fragment>
  )
}