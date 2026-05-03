import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const current = useMemo(() => items[index] || items[0], [items, index])

  if (!current) return null

  return (
    <section className="bg-white py-16" id="testimoni">
      <div className="section-shell reveal" data-reveal>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-leaf">Ulasan Pelanggan</p>
          <h2 className="mt-3 text-3xl font-bold text-coffee-900">Dipercaya untuk stok kopi harian.</h2>
        </div>
        <div className="mt-8 grid gap-6 rounded-lg border border-coffee-500/10 bg-coffee-50 p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <div className="flex gap-1 text-crema">
              {Array.from({ length: current.rating || 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={18} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-5 text-2xl font-semibold leading-9 text-coffee-900">“{current.quote}”</blockquote>
            <p className="mt-5 font-bold text-coffee-900">{current.customer_name}</p>
            <p className="text-sm text-coffee-900/60">{current.role}</p>
          </div>
          <div className="flex items-end gap-2">
            <button className="rounded-md border border-coffee-500/20 p-3" onClick={() => setIndex((index - 1 + items.length) % items.length)} aria-label="Testimoni sebelumnya">
              <ChevronLeft />
            </button>
            <button className="rounded-md border border-coffee-500/20 p-3" onClick={() => setIndex((index + 1) % items.length)} aria-label="Testimoni berikutnya">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
