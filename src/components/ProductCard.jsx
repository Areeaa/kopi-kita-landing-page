import { MessageCircle, ShoppingCart } from 'lucide-react'
import { createWhatsAppLink, formatCurrency } from '../utils/formatters'

export default function ProductCard({ product, whatsappNumber }) {
  return (
    <article className="overflow-hidden rounded-lg border border-coffee-500/10 bg-white shadow-sm">
      <img className="h-56 w-full object-cover" src={product.image_url} alt={product.name} />
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">{product.category || 'Kopi'}</p>
          <h3 className="mt-2 text-xl font-bold text-coffee-900">{product.name}</h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-coffee-900/65">{product.description}</p>
        </div>
        <p className="text-lg font-bold text-coffee-900">{formatCurrency(product.price)}</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <a className="btn-primary px-3" href={createWhatsAppLink(whatsappNumber, product.name)} target="_blank" rel="noreferrer">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a className="btn-secondary px-3" href={product.shopee_link || '#'} target="_blank" rel="noreferrer">
            <ShoppingCart size={17} /> Shopee
          </a>
        </div>
      </div>
    </article>
  )
}
