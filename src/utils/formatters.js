export function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export function createWhatsAppLink(number, productName) {
  const cleanNumber = String(number || '').replace(/\D/g, '')
  const text = productName
    ? `Halo KOPI KITA, saya mau pesan ${productName}. Apakah masih tersedia?`
    : 'Halo KOPI KITA, saya mau tanya produk kopi.'

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
