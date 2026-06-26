'use client'

export default function MarginWidthWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full min-h-screen flex-col">
      {children}
    </div>
  )
}