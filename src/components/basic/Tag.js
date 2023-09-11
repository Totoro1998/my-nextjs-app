export default function Tag({ children, className, ...props }) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-xl bg-white-950 
        text-xs font-medium text-primay space-x-2
        border-primary border-1.5
        ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
