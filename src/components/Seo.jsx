import { Helmet } from 'react-helmet-async'

export default function Seo({ title = 'KOPI KITA', description = 'UMKM kopi lokal dengan biji pilihan Indonesia.' }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}
