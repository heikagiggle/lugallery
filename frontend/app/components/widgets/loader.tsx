import { twMerge } from 'tailwind-merge';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={twMerge('relative mx-auto w-[100px] aspect-square', className)}>
      <svg
        className="absolute inset-0 h-full w-full animate-spinner-rotate"
        viewBox="25 25 50 50"
      >
        <circle
          className="animate-spinner-dash stroke-[3] stroke-current fill-none"
          cx="50"
          cy="50"
          r="20"
        />
      </svg>
    </div>
  );
}
