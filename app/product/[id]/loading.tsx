export default function Loading() {
  return (
    <main className="p-8 max-w-screen-2xl mx-auto md:p-16 grid gap-10 md:grid-cols-2 animate-pulse">
      <div className="w-full aspect-4/5 bg-gray-300/50" />
      <div className="flex flex-col gap-4">
        <div className="h-8 w-2/3 bg-gray-300/50" />
        <div className="h-5 w-1/4 bg-gray-300/50" />
        <div className="h-24 w-full bg-gray-300/50" />
      </div>
    </main>
  );
}
