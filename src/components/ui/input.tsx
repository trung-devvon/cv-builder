import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-[var(--border)] bg-white px-4 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[#92a89a] focus:border-[var(--primary)] focus:ring-4 focus:ring-green-600/10",
        className
      )}
      {...props}
    />
  );
}
