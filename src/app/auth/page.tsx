import { LoginForm } from "@modules/auth/components"
import { Suspense } from "react"

export default function Auth() {
  return (
    <div className="w-full rounded-2xl bg-white">
      <Suspense>
        <LoginForm/>
      </Suspense>
    </div>
  )
}