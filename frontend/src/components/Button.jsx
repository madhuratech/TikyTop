function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#FF6B35] to-[#FFA500] text-white hover:shadow-lg hover:shadow-[#FF6B35]/30 hover:scale-105 active:scale-95',
    secondary: 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-[#FF6B35]',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35]',
    ghost: 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  }
  
  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
