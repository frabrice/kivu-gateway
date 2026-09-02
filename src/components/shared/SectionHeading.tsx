type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <div className={`flex max-w-2xl flex-col ${alignClass}`}>
      {eyebrow && (
        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-blue-500' : 'text-blue-600'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 font-heading text-2xl font-bold sm:text-3xl ${light ? 'text-white' : 'text-navy-700'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-sm sm:text-base ${light ? 'text-navy-100' : 'text-navy-400'}`}>{description}</p>
      )}
    </div>
  )
}
