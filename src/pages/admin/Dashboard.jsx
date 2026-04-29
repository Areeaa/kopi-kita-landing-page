import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-black text-coffee-900">Dashboard</h1>
      <p className="mt-2 text-coffee-900/65">Kelola produk, artikel edukasi kopi, dan profil toko dari satu tempat.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['Produk', 'Tambah varian kopi dan tautan Shopee.', '/admin/products'],
          ['Artikel', 'Tulis blog dan brewing guide.', '/admin/articles'],
          ['Profil Toko', 'Perbarui WhatsApp, alamat, dan profil.', '/admin/settings'],
        ].map(([title, body, to]) => (
          <Link key={to} to={to} className="rounded-lg bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-xl font-bold text-coffee-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-coffee-900/65">{body}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
