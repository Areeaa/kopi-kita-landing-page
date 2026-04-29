import { Instagram, MapPin, MessageCircle } from 'lucide-react'
import { createWhatsAppLink } from '../utils/formatters'

export default function Footer({ config }) {
  return (
    <footer className="bg-coffee-900 py-10 text-coffee-50">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">KOPI KITA</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-coffee-100/75">
            Kopi lokal, disangrai dekat dengan pelanggan, dikirim dengan cerita yang tetap hangat.
          </p>
        </div>
        <div className="space-y-3 text-sm text-coffee-100/80">
          <p className="flex gap-2"><MapPin size={18} /> {config.address}</p>
          <a className="flex gap-2 hover:text-white" href={createWhatsAppLink(config.whatsapp_number)}>
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a className="flex gap-2 hover:text-white" href={config.instagram_url} target="_blank" rel="noreferrer">
            <Instagram size={18} /> Instagram
          </a>
        </div>
        <div className="text-sm text-coffee-100/70 md:text-right">
          © {new Date().getFullYear()} KOPI KITA. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  )
}
