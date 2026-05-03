import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 520)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full bg-leaf text-white shadow-lg transition duration-300 hover:bg-coffee-700 focus:outline-none focus:ring-4 focus:ring-leaf/25 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      onClick={scrollUp}
      aria-label="Kembali ke atas"
    >
      <ChevronUp size={24} />
    </button>
  )
}
