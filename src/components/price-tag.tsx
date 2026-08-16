interface PriceTagProps {
  children: React.ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}

// Etiqueta de vidriera: tarjeta de cartón con su perforación de gancho.
// Sin bordes redondeados — la marca es de esquinas vivas.
export function PriceTag({ children, size = 'md', className = '' }: PriceTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 border-2 border-cacao bg-cream px-3 py-1.5 text-cacao ${
        size === 'lg' ? 'px-5 py-2.5' : ''
      } ${className}`}
    >
      <span
        className={`rotate-45 border border-milk ${size === 'lg' ? 'size-2' : 'size-1.5'}`}
        aria-hidden
      />
      <span
        className={`font-display font-medium leading-none tracking-tight ${
          size === 'lg' ? 'text-3xl' : 'text-lg'
        }`}
      >
        {children}
      </span>
    </span>
  );
}
