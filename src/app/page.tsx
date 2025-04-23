export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-lg">This is a simple layout example.</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-sm">Footer content goes here.</p>
      </div>
    </div>
  );
}
