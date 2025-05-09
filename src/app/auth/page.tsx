import { LoginForm } from "@modules/auth/components"
import { Suspense } from "react"

export default function Auth() {
  return (
    <div className=" w-[300px] md:w-1/3 lg:w-1/3 rounded-2xl bg-white">
      <Suspense>
        <LoginForm/>
      </Suspense>
    </div>
  )
}