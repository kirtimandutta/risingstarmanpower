export function StarMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 1.2 19.4 12.1 30.6 16 19.4 19.9 16 30.8 12.6 19.9 1.4 16 12.6 12.1Z"
      />
    </svg>
  );
}
