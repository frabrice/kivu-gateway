import { Link } from 'react-router-dom'

type LogoProps = {
  variant?: 'light' | 'dark'
}

export default function Logo({ variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light'
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-700 font-heading text-lg font-bold text-white">
        KG
      </span>
      <span className="leading-tight text-left">
        <span className="block font-heading text-lg font-bold tracking-wide">
          <span className={isLight ? 'text-white' : 'text-navy-700'}>KIVU </span>
          <span className={isLight ? 'text-blue-300' : 'text-blue-600'}>GATEWAY</span>
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${isLight ? 'text-navy-100' : 'text-navy-400'}`}>
          Goma &amp; Gisenyi
        </span>
      </span>
    </Link>
  )
}
