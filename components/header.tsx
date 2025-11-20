import { Bell, Search } from "lucide-react"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <div className="flex items-center md:hidden">
        <span className="text-lg font-bold text-white">SecureFace</span>
      </div>
      <div className="hidden md:block w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search personnel..."
            className="h-9 w-full rounded-md border border-slate-700 bg-slate-950 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  )
}
