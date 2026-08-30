import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../../data/site'

type WhatsAppButtonProps = {
  className?: string
  label?: string
}

export default function WhatsAppButton({ className = '', label = 'Talk To Us' }: WhatsAppButtonProps) {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  )
}
