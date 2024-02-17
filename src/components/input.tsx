import * as React from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-14 w-full rounded-xl   border-2 border-system-3  bg-system-3 px-3 py-1 text-sm shadow-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:valid:border-principal transition-colors duration-200 ease-in-out aria-[invalid=true]:border-red-500  focus:aria-[invalid=true]:border-red-500 font-chakra_petch text-white placeholder:text-system-4",
  {
    variants: {
      variant: {
        default: "",
        transparent: "bg-transparent",
        ghost:
          "bg-transparent border-none focus-visible:ring-1 focus-visible:ring-principal  hover:bg-system-3/25 focus:bg-system-3/25 "
      },
      containerHeight: {
        small: "h-10",
        medium: "h-14",
        large: "h-16"
      }
    },
    defaultVariants: {
      containerHeight: "medium",
      variant: "default"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, iconLeft, iconRight, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            inputVariants({ className, variant }),
            iconLeft && "pl-12",
            iconRight && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />

        {iconLeft && (
          <div className="absolute left-3 top-[50%] -translate-y-[50%] text-white">
            {iconLeft}
          </div>
        )}

        {iconRight && (
          <div className="absolute right-3 top-[50%] -translate-y-[50%] text-white">
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
