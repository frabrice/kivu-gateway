import { Link } from 'react-router-dom'

type LogoProps = {
  variant?: 'light' | 'dark'
}

export default function Logo({ variant = 'light' }: LogoProps) {
  const sub = variant === 'light' ? 'text-navy-100' : 'text-navy-400'
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 font-heading text-lg font-bold text-navy-800">
        KG
      </span>
      <span className="leading-tight text-left">
        <span className="block font-heading text-lg font-bold tracking-wide">
          <span className={variant === 'light' ? 'text-white' : 'text-navy-600'}>KIVU </span>
          <span className="text-gold-500">GATEWAY</span>
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${sub}`}>
          Your Gateway To The Great Lakes
        </span>
      </span>
    </Link>
  )
}
