import { FileText, Home, LogOut, Package, Settings } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { signOutAdmin } from '../../services/authService'

const navItems = [
  ['Dashboard', '/admin', Home],
  ['Produk', '/admin/products', Package],
  ['Artikel', '/admin/articles', FileText],
  ['Profil Toko', '/admin/settings', Settings],
]

export default function AdminLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    await signOutAdmin()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-coffee-50 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-coffee-500/10 bg-white p-4 lg:border-b-0 lg:border-r">
        <div className="text-xl font-black text-coffee-900">KOPI KITA CMS</div>
        <nav className="mt-6 grid gap-2">
          {navItems.map(([label, to, Icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-leaf text-white' : 'text-coffee-900 hover:bg-coffee-50'}`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button className="mt-6 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-coffee-900 hover:bg-coffee-50" onClick={handleLogout}>
          <LogOut size={18} /> Keluar
        </button>
      </aside>
      <main className="p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
