'use client'

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-full flex-col flex-grow space-y-2 overflow-x-hidden bg-white px-4 pt-2 pb-4">
      {children}
    </div>
  )
}

export default PageWrapper;