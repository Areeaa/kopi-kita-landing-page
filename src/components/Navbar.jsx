import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  ['Profil', '#profil'],
  ['Produk', '#produk'],
  ['Panduan', '#panduan'],
  ['Artikel', '#artikel'],
  ['Kontak', '#kontak'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-coffee-500/10 bg-coffee-50/90 backdrop-blur">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="/#beranda" className="flex items-center gap-2 font-bold tracking-wide text-coffee-900">
          <span className="grid size-9 place-items-center rounded-md bg-coffee-900 text-white">
            <ShoppingBag size={18} />
          </span>
          KOPI KITA
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm font-medium text-coffee-900/75 hover:text-leaf">
              {label}
            </a>
          ))}
        </div>
        <button className="rounded-md p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="section-shell grid gap-3 pb-4 md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
